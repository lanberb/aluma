import {ImportMapComposition} from "../feature/importMap";
import {ZipComposition} from "../feature/zip";
import {Message, PostFn} from "./fn";
export * from "./fn";

const response = <Data>(m: Message<Data>) => {
  const fn: PostFn<Data> = (m) => figma.ui.postMessage(m);
  fn(m);
};

export interface ResponseGetImageUrls {
  urlMap: {[id: string]: string};
  composition: ZipComposition;
}
export interface ResponseGetImportMapComposition {
  composition: ImportMapComposition;
}

export const createParentMessages = () => ({
  resGetImageUrls: (data: ResponseGetImageUrls) => response<ResponseGetImageUrls>({type: "imageUrls", data}),
  resGetImportMapComposition: (data: ResponseGetImportMapComposition) => response<ResponseGetImportMapComposition>({type: "importMapComposition", data}),
});
