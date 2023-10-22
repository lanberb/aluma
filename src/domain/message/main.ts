import { messageTypes } from "../../libs/constants/message";
import { ImportMapComposition } from "../feature/importMap";
import { ZipComposition } from "../feature/zip";

export interface ResponseGetImageUrls {
  urlMap: { [id: string]: string };
  composition: ZipComposition;
}
export const responseGetImageUrls = (data: ResponseGetImageUrls) => {
  return figma.ui.postMessage({
    type: messageTypes.imageUrls,
    data,
  });
};

export const responseGetImportMapComposition = (data: ImportMapComposition) => {
  return figma.ui.postMessage({
    type: messageTypes.importMapComposition,
    data,
  });
};
