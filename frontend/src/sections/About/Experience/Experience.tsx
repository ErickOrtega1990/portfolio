import { useContext } from "react";
import ExperienceCard1 from "../../../components/cards/cardContent/ExperienceCard1";
import ExperienceCard2 from "../../../components/cards/cardContent/ExperienceCard2";
import Infocard from "../../../components/cards/infocards/Infocard";
import style from "./Experience.module.css";
import lenguagesContext from "../../../contexts/lenguages/lenguagesContext";

type Props = {};

function Experience({}: Props) {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <>
      <div className={style.experience}>
        <h1 className={style.h1}>{lenguage.About2.txt1}</h1>
        <div className={style.container}>
          <Infocard>
            <ExperienceCard1 />
          </Infocard>
          <Infocard>
            <ExperienceCard2 />
          </Infocard>
        </div>
      </div>
    </>
  );
}

export default Experience;
