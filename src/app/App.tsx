/**
 * @summary used for ui.html
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { ConnectedHomePage } from "./components/pages/Home/ConnectedHomePage";
import { GlobalStyles } from "./components/styles/GlobalStyles";

function main() {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const app = document.querySelector("#app")!;

  createRoot(app).render(
    <React.StrictMode>
      <div className={GlobalStyles}>
        <ConnectedHomePage />
      </div>
    </React.StrictMode>,
  );
}
main();
