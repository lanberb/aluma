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
  const importScale = useRef<1 | 2 | 4>(2);
  const [isFetching, setIsFetching] = useState(false);
  const [importMapComposition, setImportMapComposition] =
    useState<ImportMapComposition>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const disabledSubmitButton = importMapComposition.length === 0;

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
    setIsFetching(true);

    client?.requestGetImageUrls({
      token: accessToken ?? "",
      format: importFormat.current,
      scale: importScale.current,
    });
  }, [client, accessToken]);
  const handleOnChangeImageFormat = useCallback(
    (imageFormat: "svg" | "png") => (importFormat.current = imageFormat),
    [],
  );
  const handleOnChangeImageScale = useCallback(
    (imageScale: 1 | 2 | 4) => (importScale.current = imageScale),
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

      try {
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
        console.log("ok1");

        const zip = await createZipAsync(
          blobs,
          composition,
          importFormat.current,
        );
        downloadBlob(zip, selectedElementName.current);
      } finally {
        setIsFetching(false);
      }
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

  return (
    <HomePage
      accessTokenStatus={accessTokenStatus}
      defaultAccessToken={accessToken ?? ""}
      defaultImportFormat={importFormat.current}
      disabledSubmitButton={disabledSubmitButton}
      composition={importMapComposition}
      showLoading={isFetching}
      onChangeImportFormat={handleOnChangeImageFormat}
      onChangeImportScale={handleOnChangeImageScale}
      onClickSubmitButton={handleOnClickButton}
      onInputAccessToken={handleOnInputAccessToken}
    />
  );
};
