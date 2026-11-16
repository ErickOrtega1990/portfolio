import { useContext } from "react";
import style from "./Home.module.css";
import lenguagesContext from "../../contexts/lenguages/lenguagesContext";
import { lenguages } from "../../lenguages/lenguages";
import yo from "../../assets/yo.webp";
import cvEs from "../../assets/PDF/ErickOrtega_CV_ES.pdf";
import cvEn from "../../assets/PDF/ErickOrtega_CV_EN.pdf";

function Home() {
  const { lenguage } = useContext(lenguagesContext);
  const isEs = lenguage === lenguages.ES;
  const cvHref = isEs ? cvEs : cvEn;

  return (
    <section id="inicio" className={style.hero}>
      <div className={style.overlay} aria-hidden="true" />
      <div className={style.glow} aria-hidden="true" />

      <div className={style.content}>
        <div className={style.copy}>
          <p className={style.kicker}>{lenguage.Home.txt3}</p>
          <div className={style.titleContainer}>
            <h1 className={style.title}>
              {lenguage.Home.txt1}
              <h1 className={style.title2}>{lenguage.Home.txt1}</h1>
            </h1>
          </div>
          <h2 className={style.subtitle}>{lenguage.Home.txt2}</h2>
          <p className={style.description}>
            {isEs
              ? "Construyo experiencias web y soluciones conectadas, combinando desarrollo fullstack con enfoque en IoT y automatización."
              : "I build web experiences and connected solutions, combining fullstack development with a focus on IoT and automation."}
          </p>

          <div className={style.actions}>
            <a
              className={style.primaryBtn}
              href={cvHref}
              download
              target="_blank"
              rel="noreferrer"
            >
              {lenguage.Home.txt4}
            </a>
            <a className={style.secondaryBtn} href="#proyectos">
              {isEs ? "Ver proyectos" : "View projects"}
            </a>
          </div>
        </div>

        <div className={style.visual}>
          <div className={style.photoFrame}>
            <img
              src={yo}
              alt={lenguage.Home.txt1}
              className={style.photo}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
