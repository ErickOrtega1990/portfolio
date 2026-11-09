import style from "./Skils.module.css";

import Bubble from "../../../components/skillsGroup/bubble/Bubble";

import mongoLogo from "../../../assets/skills/mongo.webp";
import expressImg from "../../../assets/skills/express.webp";
import reactoImg from "../../../assets/skills/react.webp";

import html from "../../../assets/skills/html.webp";
import css from "../../../assets/skills/css.webp";
import js from "../../../assets/skills/js.webp";
import ts from "../../../assets/skills/ts.webp";

import git from "../../../assets/skills/git.webp";
import docker from "../../../assets/skills/docker.webp";
import github from "../../../assets/skills/github.webp";
import opencode from "../../../assets/skills/opencode.webp";

import nodeImg from "../../../assets/skills/node.webp";
import chile from "../../../assets/skills/chile.webp";
import ingles from "../../../assets/skills/ingles.webp";
import italiano from "../../../assets/skills/italiano.webp";
import SkillsGroup from "../../../components/skillsGroup/SkillsGroup";
import { useContext } from "react";
import lenguagesContext from "../../../contexts/lenguages/lenguagesContext";

type Props = {};

function Skills({}: Props) {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <>
      <h1 className={style.h1}>{lenguage.About3.txt0}</h1>
      <div className={style.skills}>
        <div className={style.container}>
          <SkillsGroup title={lenguage.About3.txt1}>
            <Bubble imgUrl={html} title="HTML"></Bubble>
            <Bubble imgUrl={css} title="CSS"></Bubble>
            <Bubble imgUrl={js} title="JavaScript"></Bubble>
            <Bubble imgUrl={ts} title="TypeScript"></Bubble>
          </SkillsGroup>

          <SkillsGroup title={lenguage.About3.txt2}>
            <Bubble imgUrl={mongoLogo} title="MongoDB"></Bubble>
            <Bubble imgUrl={expressImg} title="Express"></Bubble>
            <Bubble imgUrl={reactoImg} title="React"></Bubble>
            <Bubble imgUrl={nodeImg} title="Node"></Bubble>
          </SkillsGroup>
        </div>

        <div className={style.container}>
          <SkillsGroup title={lenguage.About3.txt3}>
            <Bubble imgUrl={git} title="Git"></Bubble>
            <Bubble imgUrl={github} title="GitHub"></Bubble>
            <Bubble imgUrl={docker} title="Docker"></Bubble>
            <Bubble imgUrl={opencode} title="Opencode"></Bubble>
          </SkillsGroup>

          <SkillsGroup title={lenguage.About3.txt4}>
            <Bubble imgUrl={chile} title={lenguage.About3.txt41}></Bubble>
            <Bubble imgUrl={ingles} title={lenguage.About3.txt42}></Bubble>
            <Bubble imgUrl={italiano} title={lenguage.About3.txt43}></Bubble>
          </SkillsGroup>
        </div>
      </div>
    </>
  );
}

export default Skills;
