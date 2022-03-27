import { Connection as HassConnection } from "home-assistant-js-websocket";
import { createContext } from "react";

export const HassConnectionContext = createContext<HassConnection | undefined>(
  undefined
);
