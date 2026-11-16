import { type ReactNode } from "react";
import style from "./SkillsGroup.module.css";

type Props = {
  children: ReactNode;
  title: string;
};

function SkillsGroup({ children, title }: Props) {
  return (
    <div className={style.group}>
      <h1 className={style.h1}>{title}</h1>
      {children}
    </div>
  );
}

export default SkillsGroup;
