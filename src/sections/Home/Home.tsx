import style from "./Home.module.css";
import yo from "../../../public/yo.webp";
import cv from "../../../public/PDF/Boleta cama.pdf";
import { useContext, useState } from "react";
import LoadingPage from "../../LoadingPage/LoadingPage";
import lenguagesContext from "../../contexts/lenguages/lenguagesContext";

type Props = {};

function Home({}: Props) {
  const [ready, setReady] = useState<boolean>(false);
  const { lenguage } = useContext(lenguagesContext);

  return (
    <section id="inicio" className={style.sectionContainer}>
      {ready ? null : <LoadingPage />}
      <img className={style.img} src={yo} onLoad={() => setReady(true)} />
      {ready && (
        <div className={style.container}>
          <div className={style.animatedDiv}></div>
          <h1 className={style.h1}>{lenguage.Home.txt1}</h1>
          <h2 className={style.h2}>{lenguage.Home.txt2}</h2>
          <p className={style.p}>{lenguage.Home.txt3}</p>
          <a href={cv} download className={style.button}>
            {lenguage.Home.txt4}
          </a>
        </div>
      )}
    </section>
  );
}

export default Home;
