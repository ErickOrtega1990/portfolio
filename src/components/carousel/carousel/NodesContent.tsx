import style from "./NodesContent.module.css";
import Slide1 from "./slides/slide1/Slide1";
import Slide2 from "./slides/slide2/Slide2";
import Slide3 from "./slides/slide3/Slide3";

export const tags = ["Foto 1", "Foto 2", "Foto 3"];

export const content = [
  <li className={style.li} key="1">
    <Slide1 />
  </li>,
  <li className={style.li} key="2">
    <Slide2 />
  </li>,
  <li className={style.li} key="3">
    <Slide3 />
  </li>,
];

export default content;
