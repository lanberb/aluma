/**
 * @summary used for ui.html
 */
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components/ui/Button";
import { Form } from "./components/ui/Form";
import { ImportMap } from "./components/ui/ImportMap";
import { Spacer } from "./components/ui/Spacer";
import { Message, messageTypes } from "../libs/constants/message";
import { ImportFormat, ZipBinaryImagesComposition, ZipComposition, createZipAsync } from "../domain/feature/zip";
import { ImportMapComposition } from "../domain/feature/importMap";
import { message } from "../domain/message";
import { ResponseGetImageUrls } from "../domain/message/main";
import { downloadBlob } from "../libs/utils/client";
import { css } from "@linaria/core";
import { Index } from "./components/pages";

css`
  :global() {
    * {
      margin: 0;
      padding: 0;
      color: var(--figma-color-text);
    }

    button {
      appearance: none;
      border: none;
    }

    #app {
      display: flex;
      width: 100%;
      height: 100%;
    }
    #app:only-child {
      flex-grow: 1;
      flex-shrink: 0;
      width: 50%;
    }
    .flexbox {
      width: 50%;
      flex-shrink: 0;
      flex-grow: 1;
      overflow: scroll;
    }
    .flexbox:first-of-type {
      border-right: solid 2px var(--figma-color-border);
    }
  }
`;

function main() {
  const App: React.FC = () => {
    return (
      <>
        <Index />
      </>
    );
  };

  const app = document.querySelector("#app")!; // たぶん#appあるだろうという
  createRoot(app).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
main();
