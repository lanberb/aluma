/**
 * @summary used as main thread worker. (≠ not for ui.html)
 */

import { api } from "../app/domain/apis";
import { createImageIds } from "../app/domain/feature/image";
import {
  type ImportMapMode,
  createImportMapComposition,
} from "../app/domain/feature/importMap";
import { createZipComposition } from "../app/domain/feature/zip";
import { APP_UI_OPTIONS } from "../libs/constants/app";
import { messageTypes } from "../libs/constants/messageTypes";
import { MessageParentClient } from "../libs/message";

const message = new MessageParentClient();

const handleOnMessageImageUrls = async (
  token: string,
  format: "png" | "svg",
  scale: 1 | 2 | 4,
) => {
  const { currentPage, fileKey } = figma;
  const selectedElement = currentPage.selection[0];

  if (!fileKey) {
    return;
  }

  if (
    selectedElement.type !== "FRAME" &&
    selectedElement.type !== "GROUP" &&
    selectedElement.type !== "COMPONENT"
  ) {
    return;
  }
  if (!selectedElement.children) {
    return;
  }

  const ids = createImageIds(selectedElement.children.concat());
  const res = await api.getImages({
    token: token,
    options: {
      ids,
      fileKey,
      format,
      scale,
    },
  });
  const urlMap = await res.json();
  const composition = createZipComposition(selectedElement.children.concat());

  message.responseGetImageUrls({ urlMap: urlMap.images, composition });
};

const handleOnMessageImportMapComposition = (mode: ImportMapMode) => {
  const { currentPage } = figma;
  const selectedElement = currentPage.selection[0];

  if (!selectedElement) {
    message.responseGetImportMapComposition([]);
    return;
  }
  if (
    selectedElement.type === "FRAME" ||
    selectedElement.type === "GROUP" ||
    selectedElement.type === "COMPONENT"
  ) {
    message.responseGetImportMapComposition(
      createImportMapComposition(
        selectedElement.children.concat(),
        selectedElement.name,
        mode,
      ),
    );
  }
};

const handleOnMessageGetFigmaPAT = async (key: string) => {
  const token = await figma.clientStorage.getAsync(key);
  message.responseGetFigmaPAT({ token });
};

const handleOnMessagePutFigmaPAT = async (key: string, value: string) => {
  await figma.clientStorage.setAsync(key, value);
  const token = await figma.clientStorage.getAsync(key);
  console.log(token);
};

figma.ui.on("message", async (message) => {
  switch (message.type) {
    case messageTypes.imageUrls:
      await handleOnMessageImageUrls(
        message.token,
        message.format,
        message.scale,
      );
      return;
    case messageTypes.getFigmaPAT:
      handleOnMessageGetFigmaPAT(message.key);
      return;
    case messageTypes.putFigmaPAT:
      await handleOnMessagePutFigmaPAT(message.key, message.value);
      await handleOnMessageGetFigmaPAT(message.key);
      return;
    default:
      return;
  }
});
figma.on("selectionchange", () =>
  handleOnMessageImportMapComposition("normal"),
);
figma.showUI(__html__, APP_UI_OPTIONS);
