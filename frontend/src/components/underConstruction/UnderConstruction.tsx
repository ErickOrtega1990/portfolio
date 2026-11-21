import { useContext } from "react";
import style from "./UnderConstruction.module.css";
import lenguagesContext from "../../contexts/lenguages/lenguagesContext";

type Props = {};

function UnderConstruction({}: Props) {
  const { lenguage } = useContext(lenguagesContext);
  const texts = lenguage.underConstruction;

  return (
    <section className={style.page} aria-labelledby="under-construction-title">
      <div className={style.overlay} aria-hidden="true" />
      <div className={style.glow} aria-hidden="true" />

      <div className={style.card}>
        <p className={style.kicker}>{texts.kicker}</p>

        <div className={style.titleGroup}>
          <h1 id="under-construction-title" className={style.title}>
            {texts.title}
          </h1>
          <span className={style.accent}>{texts.accent}</span>
        </div>

        <div className={style.indicator} aria-hidden="true">
          <span className={style.indicatorBar} />
        </div>

        <p className={style.description}>{texts.description}</p>
      </div>
    </section>
  );
}

export default UnderConstruction;
