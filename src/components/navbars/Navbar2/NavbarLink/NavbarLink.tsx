import type { ReactNode } from "react";
import style from "./NavbarLink.module.css";

type Props = { href: string; children: ReactNode };

function Link({ href, children }: Props) {
  return (
    <a className={style.link} href={href}>
      {children}
    </a>
  );
}

export default Link;
