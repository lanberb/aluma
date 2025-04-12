import type { ImportMapComposition } from "../../app/domain/feature/importMap";
import type {
  ImportFormat,
  ZipComposition,
} from "../../app/domain/feature/zip";
import { messageTypes } from "../constants/messageTypes";

export class MessageChildClient {
  public requestGetImageUrls(options: {
    token: string;
    format: ImportFormat;
    scale: 1 | 2 | 4;
  }) {
    const { token, format, scale } = options;
    parent.postMessage(
      {
        pluginMessage: { type: messageTypes.imageUrls, token, format, scale },
      },
      "*",
    );
  }

  public requestGetImportMapComposition(options: {
    mode: "normal" | "flat";
  }): void {
    const { mode } = options;
    parent.postMessage(
      {
        pluginMessage: {
          type: messageTypes.importMapComposition,
          mode,
        },
      },
      "*",
    );
  }
}

export class MessageParentClient {
  public responseGetImageUrls(data: {
    urlMap: Record<string, string>;
    composition: ZipComposition;
    selectedElementType: string;
  }) {
    figma.ui.postMessage({
      type: messageTypes.imageUrls,
      data,
    });
  }

  public responseGetImportMapComposition(data: ImportMapComposition) {
    figma.ui.postMessage({
      type: messageTypes.importMapComposition,
      data,
    });
  }

  public responseLogger(data: unknown) {
    figma.ui.postMessage({
      type: messageTypes.test,
      data,
    });
  }
}
