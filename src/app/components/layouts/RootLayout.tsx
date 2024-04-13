import React from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Index } from "../pages";
import { GlobalStyles } from "../../assets/styles/GlobalStyles";

export const RootLayout: React.FC = () => {
  return (
    <div className={GlobalStyles}>
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: "/",
              element: <Index />,
            },
          ],
          {
            initialEntries: ["/"],
          }
        )}
      />
    </div>
  );
};
