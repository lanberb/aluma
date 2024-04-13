import { css } from "@linaria/core";

export const GlobalStyles = css`
  :global() {
    :root {
      /* Color styles */
      --bg-base: #1e1e1e;
      --figma-color-text: #ffffff;
      --figma-color-border: #444444;
      --figma-color-border-success-strong: #79d297;
      --figma-color-border-ondanger: #c4381c;
      --figma-color-border-onsuccess: #078348;
      --figma-color-bg-brand: #0c8ce9;
      --figma-color-bg-brand-hover: #0a6dc2;
      --figma-color-bg-component: #8a38f5;
      --figma-color-bg-onselected: #667799;
      --figma-color-bg-disabled: #757575;
      --figma-color-bg-success: #198f51;
      --figma-color-icon-tertiary: #ffffff;
      --figma-color-icon-danger: #e03e1a;
      --figma-color-text-tertiary: #787878;
      --figma-color-text-success: #79d297;
      --figma-color-text-danger: #fca397;
      --figma-color-text-disabled: #ffffff;
    }
    * {
      margin: 0;
      padding: 0;
      color: var(--figma-color-text);
      font-family: Inter;
    }

    body {
      background-color: var(--bg-base);
    }

    button {
      appearance: none;
      border: none;
    }

    #app,
    #app > div,
    #app > section {
      height: 100%;
    }
  }
`;
