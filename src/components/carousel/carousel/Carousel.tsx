import style from "./Carousel.module.css";
import "./conf.css";
import content from "./NodesContent";
import { tags } from "./NodesContent";
import arrow from "../../../assets/carouselImg/arrow.png";
import playImg from "../../../assets/carouselImg/play.webp";
import pauseImg from "../../../assets/carouselImg/pause.webp";
import { useSlider } from "../hooks/useSlider";

type Props = {};

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

function Carousel({}: Props) {
  const { activeIndex, play, activeIndexHandler, playHandler } = useSlider(
    content,
    3000,
  );

  return (
    <div className={style.carouselContainer}>
      <ul className={style.carousel} style={{ "--index--": activeIndex }}>
        {content}
      </ul>

      <div className={style.controls}>
        <button
          onClick={playHandler}
          className={style.play}
          aria-label={play ? "Pausar carrusel" : "Reproducir carrusel"}
        >
          <img src={play ? pauseImg : playImg} alt="" loading="lazy" />
        </button>
        {tags.map((tag, index) => (
          <p
            key={tag}
            className={activeIndex == index ? style.activeControl : undefined}
            onClick={() => activeIndexHandler(index)}
          >
            {tag}
          </p>
        ))}
      </div>

      <button
        className={style.prevButton}
        onClick={() => {
          if (activeIndex > 0) activeIndexHandler(activeIndex - 1);
        }}
        aria-label="Anterior"
      >
        <img src={arrow} alt="" loading="lazy" />
      </button>

      <button
        className={style.nextButton}
        onClick={() => {
          if (activeIndex < content.length - 1)
            activeIndexHandler(activeIndex + 1);
        }}
        aria-label="Siguiente"
      >
        <img src={arrow} alt="" loading="lazy" />
      </button>
    </div>
  );
}

export default Carousel;
