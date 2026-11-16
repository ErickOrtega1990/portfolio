import type { ReactNode } from "react";
import style from "./Infocard.module.css";

type Props = {
  children: ReactNode;
};

const Infocard = ({ children }: Props) => {
  return <div className={style.infoCard}>{children}</div>;
};

export default Infocard;
