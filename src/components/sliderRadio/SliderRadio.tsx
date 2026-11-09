import style from "./SliderRadio.module.css";
import esp from "../../assets/skills/chile.webp";
import en from "../../assets/skills/ingles.webp";
import { useContext } from "react";
import type { KeyboardEvent } from "react";
import lenguagesContext from "../../contexts/lenguages/lenguagesContext";
import { lenguages } from "../../lenguages/lenguages";

type Props = {};

function SliderRadio({}: Props) {
  const { lenguage, changeLenguage } = useContext(lenguagesContext);
  const isSpanish = lenguage === lenguages.ES;

  const clickHandle = () => changeLenguage(lenguage);

  const keyHandle = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      clickHandle();
    }
  };

  return (
    <div
      className={style.radioSlider}
      onClick={clickHandle}
      onKeyDown={keyHandle}
      role="button"
      tabIndex={0}
      aria-label={isSpanish ? "Cambiar a inglés" : "Cambiar a español"}
    >
      <img
        src={isSpanish ? esp : en}
        alt=""
        className={isSpanish ? style.radioPos1 : style.radioPos2}
        loading="lazy"
      />
    </div>
  );
}

export default SliderRadio;
