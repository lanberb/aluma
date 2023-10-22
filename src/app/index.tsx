/**
 * @summary used for ui.html
 */
import { ChangeEvent, FC, FormEvent, Fragment, StrictMode, useCallback, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components/Button";
import { Form } from "./components/Form";
import { ImportMap } from "./components/ImportMap";
import { Spacer } from "./components/Spacer";
import { Message, messageTypes } from "../libs/constants/message";
import { ImportFormat, ZipBinaryImagesComposition, ZipComposition, createZipAsync } from "../domain/feature/zip";
import { ImportMapComposition } from "../domain/feature/importMap";
import { message } from "../domain/message";
import { ResponseGetImageUrls } from "../domain/message/main";

const app = document.querySelector("#app")!; // たぶん#appあるだろうという

const TEST_ACCESS_TOKEN = "figd_JVQokt_2MVsq3RhULvhdsnulDbP7UZ3Q26PDCXp_";

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

const App: FC = () => {
  const selectedElementName = useRef("");
  const accessToken = useRef(TEST_ACCESS_TOKEN);
  const isFlat = useRef(false);
  const importFormat = useRef<ImportFormat>("svg");
  const [importMapComposition, setImportMapComposition] = useState<ImportMapComposition>([]);

  const handleOnClickButton = useCallback(() => {
    message.requestGetImageUrls({ token: accessToken.current });
  }, []);
  const handleOnChangeSelectSvg = useCallback(() => (importFormat.current = "svg"), []);
  const handleOnChangeSelectPng = useCallback(() => (importFormat.current = "png"), []);
  const handleOnChangeEnableFlat = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    isFlat.current = e.target.checked;
    message.requestGetImportMapComposition({ mode: e.target.checked ? "flat" : "normal" });
  }, []);
  const handleOnInputAccessToken = useCallback((e: FormEvent<HTMLInputElement>) => {
    accessToken.current = e.currentTarget.value;
  }, []);
  const handleOnRun = useCallback(() => {
    message.requestGetImportMapComposition({ mode: isFlat.current ? "flat" : "normal" });
  }, []);
  const handleOnMessageImportMapComposition = useCallback((data: ImportMapComposition) => {
    setImportMapComposition(data);
    selectedElementName.current = data[0]?.[0]?.text || "";
    isFlat.current = false;
  }, []);
  const handleOnMessageImageUrls = useCallback(async (data: ResponseGetImageUrls) => {
    const { urlMap, composition } = data;
    const ids = Object.keys(urlMap);

    const blobs = await ids.reduce<Promise<ZipBinaryImagesComposition>>(async (obj, id) => {
      const fetchImg = async () => {
        const url = urlMap[id];
        const res = await fetch(url);
        const img = await res.blob();
        return img;
      };
      (await obj)[id] = await fetchImg();
      return obj;
    }, Promise.resolve({}));

    const zip = await createZipAsync(blobs, composition, "svg");

    downloadBlob(zip, selectedElementName.current);
  }, []);

  const handleOnMessage = useCallback((event: MessageEvent) => {
    const { data, type } = event.data.pluginMessage as Message;
    switch (type) {
      case messageTypes.imageUrls:
        handleOnMessageImageUrls(data);
        return;
      case messageTypes.importMapComposition:
        handleOnMessageImportMapComposition(data);
        return;
      default:
        break;
    }
  }, []);

  useLayoutEffect(() => {
    handleOnRun();

    window.addEventListener("message", handleOnMessage);
    return () => window.removeEventListener("message", handleOnMessage);
  }, []);

  return (
    <Fragment>
      <div className="flexbox">
        <ImportMap composition={importMapComposition} />
      </div>
      <div className="flexbox">
        <p>インポート形式</p>
        <Spacer size={[0, 12]} />
        <Form.Frame>
          <Form.TextField id="accessToken" label="Figma Access Token" placeholder="Figma Personal Access Tokenを入力" defaultValue={TEST_ACCESS_TOKEN} onInput={handleOnInputAccessToken} />
          <Spacer size={[0, 12]} />
          <Form.Checkbox id="selectSvg" label="svg" onChange={handleOnChangeSelectSvg} />
          <Form.Checkbox id="selectPng" label="png" onChange={handleOnChangeSelectPng} />
          <Form.Checkbox id="enableFlat" label="フラットにする" onChange={handleOnChangeEnableFlat} />
          <Form.Checkbox id="enableManifest" label="manifest.jsonを作成する" defaultChecked />

          <Spacer size={[0, 20]} />
          <Button type="button" onClick={handleOnClickButton}>
            選択したアセットを保存する
          </Button>
        </Form.Frame>
      </div>
    </Fragment>
  );
};

createRoot(app).render(
  <StrictMode>
    <App />
  </StrictMode>
);
