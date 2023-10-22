import { messageTypes } from "../../libs/constants/message";

export const requestGetImageUrls = (options: { token: string }) => {
  const { token } = options;
  return parent.postMessage({ pluginMessage: { type: messageTypes.imageUrls, token } }, "*");
};
export const requestGetImportMapComposition = (options: { mode: "normal" | "flat" }) => {
  const { mode } = options;
  return parent.postMessage({ pluginMessage: { type: messageTypes.importMapComposition, mode } }, "*");
};
