import React from "react";
import {createClientMessages} from "../../domain/message/client";

const messages = createClientMessages();

export const MessageContext = React.createContext(messages);
