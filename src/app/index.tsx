/**
 * @summary used for ui.html
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { RootLayout } from "./components/layouts/RootLayout";

function main() {
  const app = document.querySelector("#app")!; // たぶん#appあるだろうという
  createRoot(app).render(
    <React.StrictMode>
      <RootLayout />
    </React.StrictMode>
  );
}
main();
