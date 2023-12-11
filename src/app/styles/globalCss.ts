import { css } from "@linaria/core";

export const createGlobalCSS = () => css`
  :global() {
    * {
      margin: 0;
      padding: 0;
      color: var(--figma-color-text);
    }

    :root {
      --app-width: 640px;
      --app-height: 320px;
      --radius-full: 9999px;
    }

    * {
      color: var(--figma-color-text);
      appearance: none;
      border: none;
      box-sizing: border-box;
      outline: none;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--figma-color-bg);
      width: var(--app-width);
      height: var(--app-height);
    }

    a,
    button,
    input[type="radio"],
    input[type="checkbox"] {
      cursor: pointer;
    }

    button {
      appearance: none;
      border: none;
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
