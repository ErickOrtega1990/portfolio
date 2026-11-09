import type { ReactNode } from "react";
import style from "./Header.module.css";

type Props = { children: ReactNode };

function Header({ children }: Props) {
  return <div className={style.header}>{children}</div>;
}

export default Header;
