/**
 * @summary used for ui.html
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { GlobalStyles } from "./assets/styles/GlobalStyles";
import { ConnectedHomePage } from "./components/pages/Home/ConnectedHomePage";

function main() {
  const app = document.querySelector("#app")!; // たぶん#appあるだろうという
  createRoot(app).render(
    <React.StrictMode>
      <div className={GlobalStyles}>
        <RouterProvider
          router={createMemoryRouter(
            [
              {
                path: "/",
                element: <ConnectedHomePage />,
              },
            ],
            {
              initialEntries: ["/"],
            }
          )}
        />
      </div>
    </React.StrictMode>
  );
}
main();
