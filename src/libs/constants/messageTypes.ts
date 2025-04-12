export interface Message {
  type: keyof typeof messageTypes;
  data?: unknown;
}

export const messageTypes = {
  // Plugin全体に関わるmessageType
  run: "run",

  // Figma <--> UIのmessageType
  imageUrls: "imageUrls",
  importMapComposition: "importMapComposition",

  getFigmaPAT: "getFigmaPAT",
  putFigmaPAT: "putFigmaPAT",

  // 検証用のmessageType
  test: "test",
} as const;
