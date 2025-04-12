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

// ![
//   "SLICE",
//   "FRAME",
//   "GROUP",
//   "COMPONENT_SET",
//   "COMPONENT",
//   "INSTANCE",
//   "BOOLEAN_OPERATION",
//   "VECTOR",
//   "STAR",
//   "LINE",
//   "ELLIPSE",
//   "POLYGON",
//   "RECTANGLE",
//   "TEXT",
//   "STICKY",
//   "CONNECTOR",
//   "SHAPEWITHTEXT",
//   "CODEBLOCK",
//   "STAMP",
//   "WIDGET",
//   "EMBED",
//   "LINKUNFURL",
//   "MEDIA",
//   "SECTION",
//   "HIGHLIGHT",z
//   "WASHITAPE",
//   "TABLE",
// ].includes(selectedElement.type)

const message = new MessageParentClient();

const getSelectedElement = (node: SceneNode | null) => {
  if (node == null) {
    return null;
  }
  if (
    node.type === "FRAME" ||
    node.type === "GROUP" ||
    node.type === "COMPONENT" ||
    node.type === "SECTION"
  ) {
    return node;
  }

  return null;
};

const handleOnMessageImageUrls = async (
  token: string,
  format: "png" | "svg",
  scale: 1 | 2 | 4,
) => {
  const { currentPage, fileKey } = figma;
  const selectedElement = getSelectedElement(currentPage.selection[0]);

  if (!fileKey || selectedElement == null) {
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
  message.responseGetImageUrls({
    urlMap: urlMap.images,
    composition,
    selectedElementType: selectedElement.type,
  });
};

const handleOnMessageImportMapComposition = (mode: ImportMapMode) => {
  const { currentPage } = figma;
  const selectedElement = getSelectedElement(currentPage.selection[0]);

  if (selectedElement == null) {
    message.responseGetImportMapComposition([]);
    return;
  }

  message.responseGetImportMapComposition(
    createImportMapComposition(
      selectedElement.children.concat(),
      selectedElement.name,
      mode,
    ),
  );
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
    default:
      return;
  }
});
figma.on("selectionchange", () =>
  handleOnMessageImportMapComposition("normal"),
);
figma.once("run", () => handleOnMessageImportMapComposition("normal"));
figma.showUI(__html__, APP_UI_OPTIONS);
