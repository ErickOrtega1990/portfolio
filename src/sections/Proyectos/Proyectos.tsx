import { useContext } from "react";
import Carousel from "../../components/carousel/carousel/Carousel";
import style from "./Proyectos.module.css";
import lenguagesContext from "../../contexts/lenguages/lenguagesContext";

type Props = {};

function Proyectos({}: Props) {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <section id="proyectos" className={style.projects}>
      <h1 className={style.h1}>{lenguage.Projects.txt0}</h1>
      <Carousel></Carousel>
    </section>
  );
}

export default Proyectos;
