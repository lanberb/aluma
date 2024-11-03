// biome-ignore lint/style/useImportType: <explanation>
import React, { KeyboardEvent, useMemo } from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { messageTypes } from "../../../../libs/constants/messageTypes";
import { MessageChildClient } from "../../../../libs/message";
import type { Status } from "../../../../libs/type";
import { downloadBlob } from "../../../../libs/utils/client";
import type { ImportMapComposition } from "../../../domain/feature/importMap";
import {
  type ImportFormat,
  type ZipBinaryImagesComposition,
  type ZipComposition,
  createZipAsync,
} from "../../../domain/feature/zip";
import { HomePage } from "./HomePage";

export const ConnectedHomePage: React.FC = () => {
  const client = new MessageChildClient();
  const selectedElementName = useRef("");
  const importFormat = useRef<ImportFormat>("svg");
  const [importMapComposition, setImportMapComposition] =
    useState<ImportMapComposition>([]);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const accessTokenStatus = useMemo<Status>(() => {
    const isEmpty = accessToken === "";
    const isInvalidFormat = accessToken?.substring(0, 5) !== "figd_";

    if (accessToken == null) {
      return "pending";
    }

    if (isEmpty || isInvalidFormat) {
      return "invalid";
    }

    return "success";
  }, [accessToken]);

  const handleOnInputAccessToken = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      setAccessToken(e.currentTarget.value);
    },
    [],
  );

  const handleOnClickButton = useCallback(() => {
    client?.requestGetImageUrls({ token: accessToken ?? "" });
  }, [client, accessToken]);
  const handleOnChangeImageType = useCallback(
    (imageType: "svg" | "png") => (importFormat.current = imageType),
    [],
  );
  const handleOnRun = useCallback(() => {
    client?.requestGetImportMapComposition({
      mode: "normal",
    });
  }, [client]);
  const handleOnMessageImportMapComposition = useCallback(
    (data: ImportMapComposition) => {
      setImportMapComposition(data);
      selectedElementName.current = data[0]?.[0]?.text || "";
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
        case messageTypes.getFigmaPAT:
          console.log(data);
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

  console.log(accessTokenStatus);

  return (
    <HomePage
      accessTokenStatus={accessTokenStatus}
      defaultAccessToken={accessToken ?? ""}
      composition={importMapComposition}
      onChangeImportType={handleOnChangeImageType}
      onClickSubmitButton={handleOnClickButton}
      onInputAccessToken={handleOnInputAccessToken}
    />
  );
};
