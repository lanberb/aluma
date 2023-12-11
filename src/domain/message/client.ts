import {Message, PostFn} from "./fn";

export * from "./fn";

const request = <Data>(pluginMessage: Message<Data>) => {
  const fn: PostFn<Data> = (message) => parent.postMessage(message);
  fn(pluginMessage);
};

export interface RequestGetImageUrls {
  token: string;
}
export interface RequestGetImportMapComposition {
  mode: "normal" | "flat";
}

export const createClientMessages = () => ({
  reqGetImageUrls: (data: RequestGetImageUrls) => request<RequestGetImageUrls>({type: "imageUrls", data}),
  reqGetImportMapComposition: (data: RequestGetImportMapComposition) => request<RequestGetImportMapComposition>({type: "importMapComposition", data}),
});
