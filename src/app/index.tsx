/**
 * @summary used for ui.html
 */
import React from "react";
import {createRoot} from "react-dom/client";
import {Index} from "./components/pages";
import {createGlobalCSS} from "./styles/globalCss";
import {MessageContext} from "./hooks/MessageContext";
import {createClientMessages} from "../domain/message/client";

const app = document.querySelector("#app")!; // たぶん#appあるだろうという
const messages = createClientMessages();

createGlobalCSS();
createRoot(app).render(
  <React.StrictMode>
    <MessageContext.Provider value={messages}>
      <Index />
    </MessageContext.Provider>
  </React.StrictMode>
);
