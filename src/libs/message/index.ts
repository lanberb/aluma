import type { ImportMapComposition } from "../../app/domain/feature/importMap";
import type { ZipComposition } from "../../app/domain/feature/zip";
import { messageTypes } from "../constants/messageTypes";

export class MessageChildClient {
  public requestGetImageUrls(options: {
    token: string;
    format: "svg" | "png";
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

  public requestGetFigmaPAT = (options: { key: string }) => {
    const { key } = options;
    parent.postMessage(
      {
        pluginMessage: { type: messageTypes.getFigmaPAT, key },
      },
      "*",
    );
  };

  public requestPutFigmaPAT = (options: { key: string; value: string }) => {
    const { value } = options;
    parent.postMessage(
      {
        pluginMessage: {
          type: messageTypes.putFigmaPAT,
          value,
        },
      },
      "*",
    );
  };
}

export class MessageParentClient {
  public responseGetImageUrls(data: {
    urlMap: Record<string, string>;
    composition: ZipComposition;
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

  public responseGetFigmaPAT(data: { token: string }) {
    figma.ui.postMessage({
      type: messageTypes.getFigmaPAT,
      data,
    });
  }
}
