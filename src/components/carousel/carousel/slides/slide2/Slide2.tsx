import img1 from "/public/carouselImg/2.webp";
import style from "./Slide2.module.css";
import lentes from "/public/carouselImg/lentes.webp";
type Props = {};

function slide2({}: Props) {
  return (
    <div className={style.slide2}>
      <img src={img1} className={style.BackgroundImg} />
      <img src={lentes} alt="" className={style.product_1} />
      <h1 className={style.h1}>¡Vive la experiencia!</h1>
      <div className={style.textContainer}>
        <h2 className={style.h2}>wenas!</h2>
        <h3 className={style.h3}>
          T<span>e</span>nd<span>e</span>nc<span>e</span>
          <span className={style.wea}></span>
        </h3>
        <p className={style.p}>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T.
          persona que se dedica a la imprenta)
        </p>
        <h4 className={style.h4}>$74.990</h4>
      </div>
    </div>
  );
}

export default slide2;
