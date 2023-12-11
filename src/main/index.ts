/**
 * @summary used as main thread worker. (≠ not for ui.html)
 */

import {api} from "../domain/apis";
import {createImageIds} from "../domain/feature/image";
import {ImportMapMode, createImportMapComposition} from "../domain/feature/importMap";
import {createZipComposition} from "../domain/feature/zip";
import {Message, createParentMessages} from "../domain/message/parent";

const message = createParentMessages();

const handleOnMessageImageUrls = async (token: string) => {
  const {currentPage, fileKey} = figma;
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

  message.resGetImageUrls({urlMap: urlMap.images, composition});
};

const handleOnMessageImportMapComposition = (mode: ImportMapMode) => {
  const {currentPage} = figma;
  const selectedElement = currentPage.selection[0];

  if (!selectedElement) {
    message.resGetImportMapComposition({composition: []});
    return;
  }
  if (selectedElement.type === "FRAME" || selectedElement.type === "GROUP" || selectedElement.type === "COMPONENT") {
    message.resGetImportMapComposition({composition: createImportMapComposition(selectedElement.children.concat(), selectedElement.name, mode)});
  }
};

figma.ui.on("message", async (message: Message<any>) => {
  switch (message.type) {
    case "run":
      await handleOnMessageImageUrls(message.data.token);
      return;
    case "imageUrls":
      await handleOnMessageImageUrls(message.data.token);
      return;
    case "importMapComposition":
      handleOnMessageImportMapComposition(message.data.mode);
      return;
    default:
      return;
  }
});
figma.on("selectionchange", () => handleOnMessageImportMapComposition("normal"));
figma.showUI(__html__, {width: 640, height: 320, themeColors: true});
