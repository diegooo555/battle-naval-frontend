// useWebSocket.js
import { useContext } from "react";
import StompClientContext from "./webSocket.js";

export const useWebSocket = () => useContext(StompClientContext);
