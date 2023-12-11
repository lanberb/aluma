export interface Message<Data> {
  type: MessageTypes;
  data?: Data;
}
type MessageTypes = (typeof messageTypeMap)[keyof typeof messageTypeMap];
const messageTypeMap = {
  /**
   * Plugin全体に関わるmessageType
   */
  run: "run",

  /**
   * Figma <--> UIのmessageType
   */
  imageUrls: "imageUrls",
  importMapComposition: "importMapComposition",
} as const;

export type PostFn<Data> = (m: Message<Data>) => void;
