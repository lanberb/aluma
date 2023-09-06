/**
 * @summary used as main thread worker. (≠ not for ui.html)
 */

import { api } from "./libs/apis";

figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
  const { currentPage, fileKey } = figma;
  const selctedElement = currentPage.selection[0];

  if (selctedElement.type !== "FRAME") {
    return;
  }

  const ids = selctedElement.children.map((child) => child.id).join(",");
  const token = "";
  const res = await api.getImages(token, {
    ids,
    fileKey: fileKey || "",
    format: "svg",
  });

  const json = await res.json();

  console.log(json);
};
