import style from "./Bubble.module.css";

type Props = {
  imgUrl: string;
  title: string;
};

function Bubble({ imgUrl, title }: Props) {
  return (
    <>
      <div className={style.bubble}>
        <div className={style.background}>
          <div className={style.logo}>
            <img src={imgUrl} className={style.img} />
          </div>
          <h1 className={style.h1}>{title}</h1>
        </div>
      </div>
    </>
  );
}

export default Bubble;
