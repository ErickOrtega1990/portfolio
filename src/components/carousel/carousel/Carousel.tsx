import style from "./Carousel.module.css";
import "./conf.css";
import content from "./NodesContent";
import { tags } from "./NodesContent";
import arrow from "/public/carouselImg/arrow.png";
import playImg from "/public/carouselImg/play.webp";
import pauseImg from "/public/carouselImg/pause.webp";
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
        {content.map((node) => {
          return node;
        })}
      </ul>

      <div className={style.controls}>
        <button onClick={playHandler} className={style.play}>
          <img src={play ? pauseImg : playImg} />
        </button>
        {tags.map((tag, index) => (
          <p
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
          activeIndex > 0 && activeIndexHandler(activeIndex - 1);
        }}
      >
        <img src={arrow} />
      </button>

      <button
        className={style.nextButton}
        onClick={() => {
          activeIndex < content.length - 1 &&
            activeIndexHandler(activeIndex + 1);
        }}
      >
        <img src={arrow} />
      </button>
    </div>
  );
}

export default Carousel;
