/**
 * @summary used as main thread worker. (≠ not for ui.html)
 */

import { api } from "../domain/apis";
import { createImageIds } from "../domain/feature/image";
import { ImportMapMode, createImportMapComposition } from "../domain/feature/importMap";
import { createZipComposition } from "../domain/feature/zip";
import { message } from "../domain/message";
import { messageTypes } from "../libs/constants/message";

const handleOnMessageImageUrls = async (token: string) => {
  const { currentPage, fileKey } = figma;
  const selectedElement = currentPage.selection[0];

  if (!fileKey) {
    return;
  }
  if (selectedElement.type !== "FRAME" && selectedElement.type !== "GROUP" && selectedElement.type !== "COMPONENT") {
    return;
  }
  if (!selectedElement.children) {
    return;
  }

  const ids = createImageIds(selectedElement.children.concat());
  const res = await api.getImages({
    token,
    options: {
      ids,
      fileKey,
      format: "svg",
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
  if (selectedElement.type === "FRAME" || selectedElement.type === "GROUP" || selectedElement.type === "COMPONENT") {
    message.responseGetImportMapComposition(createImportMapComposition(selectedElement.children.concat(), selectedElement.name, mode));
  }
};

figma.ui.on("message", async (message) => {
  switch (message.type) {
    case messageTypes.imageUrls:
      await handleOnMessageImageUrls(message.token);
      return;
    case messageTypes.importMapComposition:
      handleOnMessageImportMapComposition(message.mode);
      return;
    default:
      return;
  }
});
figma.on("selectionchange", () => handleOnMessageImportMapComposition("normal"));
figma.showUI(__html__, { width: 640, height: 320, themeColors: true });
