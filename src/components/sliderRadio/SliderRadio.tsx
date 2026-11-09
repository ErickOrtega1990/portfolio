import style from "./SliderRadio.module.css";
import esp from "../../../public/skills/chile.webp";
import en from "../../../public/skills/ingles.webp";
import { useContext, useState } from "react";
import lenguagesContext from "../../contexts/lenguages/lenguagesContext";
import { lenguages } from "../../lenguages/lenguages";

type Props = {};

function SliderRadio({}: Props) {
  const [pos, setPos] = useState<number>(0);
  const { changeLenguage } = useContext(lenguagesContext);

  const clickHandle = () => {
    pos === 0 ? setPos(1) : setPos(0);
    pos === 0 ? changeLenguage(lenguages.ES) : changeLenguage(lenguages.EN);
  };

  return (
    <div className={style.radioSlider} onClick={clickHandle}>
      <img
        src={pos === 0 ? esp : en}
        className={pos === 0 ? style.radioPos1 : style.radioPos2}
      />
    </div>
  );
}

export default SliderRadio;
