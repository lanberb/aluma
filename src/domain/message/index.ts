import { requestGetImageUrls, requestGetImportMapComposition } from "./app";
import { responseGetImageUrls, responseGetImportMapComposition } from "./main";

// app側で使うmessage
export const message = {
  requestGetImageUrls,
  responseGetImageUrls,

  requestGetImportMapComposition,
  responseGetImportMapComposition,
};
