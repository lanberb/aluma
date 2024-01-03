/**
 * @summary used for ui.html
 */
import React from "react";
import { createRoot } from "react-dom/client";
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
  const App: React.FC = () => {
    return (
      <>
        <Index />
      </>
    );
  };

function main() {

  const app = document.querySelector("#app")!; // たぶん#appあるだろうという
  createRoot(app).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
main();
