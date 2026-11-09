import { createContext } from "react";
import type { Texts } from "./lenguagesType.ts";

type LenguajeContextType = {
  lenguage: Texts;
  changeLenguage: (current: Texts) => void;
};

export default createContext<LenguajeContextType>({} as LenguajeContextType);
