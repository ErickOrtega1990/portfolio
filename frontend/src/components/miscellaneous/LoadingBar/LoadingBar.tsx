import style from "./LoadingBar.module.css";

type Props = {};

function LoadingBar({}: Props) {
  return (
    <>
      <div className={style.loadingBar}>
        <div className={style.bar1}></div>
        <div className={style.bar2}></div>
        <div className={style.bar3}></div>
      </div>
      <h1 className={style.h1}>Cargando contenido...</h1>
    </>
  );
}

export default LoadingBar;
