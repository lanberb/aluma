/**
 * @summary used for ui.html
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { GlobalStyles } from "./assets/styles/GlobalStyles";
import { ConnectedHomePage } from "./components/pages/Home/ConnectedHomePage";

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
