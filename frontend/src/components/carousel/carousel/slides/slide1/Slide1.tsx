import img1 from "../../../../../assets/carouselImg/1.webp";
import style from "./Slide1.module.css";
import botas from "../../../../../assets/carouselImg/botas.webp";
type Props = {};

function slide1({}: Props) {
  return (
    <div className={style.slide1}>
      <img src={img1} className={style.BackgroundImg} loading="lazy" />
      <img src={botas} alt="" className={style.product_1} loading="lazy" />
      <h1 className={style.h1}>¡Vive la experiencia!</h1>
      <div className={style.textContainer}>
        <h2 className={style.h2}>wenas!</h2>
        <h3 className={style.h3}>
          T<span className={style.s}>e</span>nd
          <span className={style.s}>e</span>nc<span className={style.s}>e</span>
        </h3>
        <p className={style.p}>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T.
          persona que se dedica a la imprenta)
        </p>
        <h4 className={style.h4}>$74.990!</h4>
      </div>
    </div>
  );
}

export default slide1;
