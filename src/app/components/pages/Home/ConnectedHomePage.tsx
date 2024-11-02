import type React from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { ImportMapComposition } from "../../../domain/feature/importMap";
import {
  type ImportFormat,
  type ZipBinaryImagesComposition,
  type ZipComposition,
  createZipAsync,
} from "../../../domain/feature/zip";
import { messageTypes } from "../../../../libs/constants/messageTypes";
import { MessageChildClient } from "../../../../libs/message";
import { downloadBlob } from "../../../../libs/utils/client";
import { HomePage } from "./HomePage";

export const ConnectedHomePage: React.FC = () => {
  const client = new MessageChildClient();
  const selectedElementName = useRef("");
  const accessToken = useRef("");
  const isFlat = useRef(false);
  const importFormat = useRef<ImportFormat>("svg");
  const [importMapComposition, setImportMapComposition] =
    useState<ImportMapComposition>([]);

  const handleOnClickButton = useCallback(() => {
    client?.requestGetImageUrls({ token: accessToken.current ?? "" });
  }, [client]);
  const handleOnChangeImageType = useCallback(
    (imageType: "svg" | "png") => (importFormat.current = imageType),
    [],
  );
  const handleOnChangeEnableFlat = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      isFlat.current = e.target.checked;
      client?.requestGetImportMapComposition({
        mode: e.target.checked ? "flat" : "normal",
      });
    },
    [client],
  );
  const handleOnRun = useCallback(() => {
    client?.requestGetImportMapComposition({
      mode: isFlat.current ? "flat" : "normal",
    });
  }, [client]);
  const handleOnMessageImportMapComposition = useCallback(
    (data: ImportMapComposition) => {
      setImportMapComposition(data);
      selectedElementName.current = data[0]?.[0]?.text || "";
      isFlat.current = false;
    },
    [],
  );
  const handleOnMessageImageUrls = useCallback(
    async (data: {
      urlMap: { [id: string]: string };
      composition: ZipComposition;
    }) => {
      const { urlMap, composition } = data;
      const ids = Object.keys(urlMap);

      const blobs = await ids.reduce<Promise<ZipBinaryImagesComposition>>(
        async (obj, id) => {
          const fetchImg = async () => {
            const url = urlMap[id];
            const res = await fetch(url);
            const img = await res.blob();
            return img;
          };
          (await obj)[id] = await fetchImg();
          return obj;
        },
        Promise.resolve({}),
      );

      const zip = await createZipAsync(blobs, composition, "svg");

      downloadBlob(zip, selectedElementName.current);
    },
    [],
  );

  const handleOnMessage = useCallback(
    (event: MessageEvent) => {
      const { data, type } = event.data.pluginMessage;
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
    },
    [handleOnMessageImageUrls, handleOnMessageImportMapComposition],
  );

  useLayoutEffect(() => {
    handleOnRun();

    window.addEventListener("message", handleOnMessage);
    return () => window.removeEventListener("message", handleOnMessage);
  }, [handleOnRun, handleOnMessage]);

  return (
    <HomePage
      composition={importMapComposition}
      onChangeImportType={handleOnChangeImageType}
      onChangeEnableFlat={handleOnChangeEnableFlat}
      onClickSubmitButton={handleOnClickButton}
    />
  );
};
