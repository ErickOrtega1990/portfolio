import style from "./Home.module.css";
import yo from "../../assets/yo.webp";
import cv from "../../assets/PDF/Boleta cama.pdf";
import { useContext, useEffect, useRef, useState } from "react";
import LoadingPage from "../../LoadingPage/LoadingPage";
import lenguagesContext from "../../contexts/lenguages/lenguagesContext";

type Props = {};

function Home({}: Props) {
  const [ready, setReady] = useState<boolean>(false);
  const heroRef = useRef<HTMLImageElement>(null);
  const { lenguage } = useContext(lenguagesContext);

  useEffect(() => {
    // Si la imagen ya estaba en caché, el evento onLoad no se dispara.
    if (heroRef.current?.complete) setReady(true);
  }, []);

  return (
    <section id="inicio" className={style.sectionContainer}>
      {ready ? null : <LoadingPage />}
      <img
        ref={heroRef}
        className={style.img}
        src={yo}
        alt="Erick Ortega"
        decoding="async"
        onLoad={() => setReady(true)}
        loading="lazy"
      />
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
