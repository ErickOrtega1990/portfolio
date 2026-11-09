import { useContext } from "react";
import style from "./ExperienceCard1.module.css";
import lenguagesContext from "../../../contexts/lenguages/lenguagesContext";

type Props = {};

function ExperienceCard1({}: Props) {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <>
      <div className={style.timeLineItem}>
        <div className={style.circle}></div>
        <h2 className={style.h2}>2015 - 2017 </h2>
        <p className={style.p}>{lenguage.About2.TimeLine.txt1}</p>
      </div>
      <div className={style.timeLineItem}>
        <div className={style.circle}></div>
        <h2 className={style.h2}>2018 - 2019 </h2>
        <p className={style.p}>{lenguage.About2.TimeLine.txt2}</p>
      </div>
      <div className={style.timeLineItem}>
        <div className={style.circle}></div>
        <h2 className={style.h2}>2019 - 2025 </h2>
        <p className={style.p}>{lenguage.About2.TimeLine.txt3}</p>
      </div>
    </>
  );
}

export default ExperienceCard1;
