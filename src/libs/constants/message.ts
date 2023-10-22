export interface Message {
  type: keyof typeof messageTypes;
  data?: any;
}

export const messageTypes = {
  // Plugin全体に関わるmessageType
  run: "run",

  // Figma <--> UIのmessageType
  imageUrls: "imageUrls",
  importMapComposition: "importMapComposition",
} as const;
