import { useRef, useState } from "react";
import { connect, disconnect, sendMessage, disconnectGame } from "../lib/websocket.js";

import StompClientContext from "./webSocket.js";

export const WebSockerProvider = ({ children }) => {
  const [resultServer, setResultServer] = useState("Waiting");
  const stompClient = useRef(null);
  return (
    <StompClientContext.Provider
      value={{ stompClient, connect, disconnect, sendMessage, resultServer, setResultServer, disconnectGame}}
    >
      {children}
    </StompClientContext.Provider>
  );
};