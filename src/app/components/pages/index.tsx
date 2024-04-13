import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Form } from "../ui/Form";
import { ImportMap } from "../ui/ImportMap";
import { Spacer } from "../ui/Spacer";
import { ImportFormat, ZipBinaryImagesComposition, ZipComposition, createZipAsync } from "../../../domain/feature/zip";
import { ImportMapComposition } from "../../../domain/feature/importMap";
import { Message, messageTypes } from "../../../libs/constants/messageTypes";
import { downloadBlob } from "../../../libs/utils/client";
import { MessageChildClient } from "../../../libs/message";
import { HorizontalLayout } from "../layouts/HorizontalLayout";

const TEST_ACCESS_TOKEN = "figd_JVQokt_2MVsq3RhULvhdsnulDbP7UZ3Q26PDCXp_";

export const Index: React.FC = () => {
  const client = new MessageChildClient();
  const selectedElementName = useRef("");
  const accessToken = useRef(TEST_ACCESS_TOKEN);
  const isFlat = useRef(false);
  const importFormat = useRef<ImportFormat>("svg");
  const [importMapComposition, setImportMapComposition] = useState<ImportMapComposition>([]);

  const handleOnClickButton = useCallback(() => {
    client?.requestGetImageUrls({ token: accessToken.current });
  }, [client]);
  const handleOnChangeSelectSvg = useCallback(() => (importFormat.current = "svg"), []);
  const handleOnChangeSelectPng = useCallback(() => (importFormat.current = "png"), []);
  const handleOnChangeEnableFlat = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      isFlat.current = e.target.checked;
      client?.requestGetImportMapComposition({
        mode: e.target.checked ? "flat" : "normal",
      });
    },
    [client]
  );
  const handleOnRun = useCallback(() => {
    client?.requestGetImportMapComposition({
      mode: isFlat.current ? "flat" : "normal",
    });
  }, [client]);
  const handleOnMessageImportMapComposition = useCallback((data: ImportMapComposition) => {
    setImportMapComposition(data);
    selectedElementName.current = data[0]?.[0]?.text || "";
    isFlat.current = false;
  }, []);
  const handleOnMessageImageUrls = useCallback(
    async (data: { urlMap: { [id: string]: string }; composition: ZipComposition }) => {
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
    },
    []
  );

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
    <HorizontalLayout>
      <ImportMap composition={importMapComposition} />
      <div>
        <p>インポート形式</p>
        <Spacer size={[0, 12]} />
        <Form.Frame>
          {/* <Form.TextField id="accessToken" placeholder="Figma Personal Access Tokenを入力" defaultValue="" onInput={handleOnInputAccessToken} /> */}
          <Spacer size={[0, 12]} />
          <Form.Checkbox id="selectSvg" onChange={handleOnChangeSelectSvg} />
          svg
          <Form.Checkbox id="selectPng" onChange={handleOnChangeSelectPng} />
          png
          <Form.Checkbox id="enableFlat" onChange={handleOnChangeEnableFlat} />
          flat
          <Form.Checkbox id="enableManifest" defaultChecked />
          manifest
          <Spacer size={[0, 20]} />
          <Button type="button" onClick={handleOnClickButton}>
            選択したアセットを保存する
          </Button>
        </Form.Frame>
      </div>
    </HorizontalLayout>
  );
};
