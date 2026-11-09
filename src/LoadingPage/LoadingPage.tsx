import LoadingBar from "../components/miscellaneous/LoadingBar/LoadingBar";
import style from "./LoadingPage.module.css";

type Props = {};

function LoadingPage({}: Props) {
  return (
    <div className={style.loadingPage}>
      <LoadingBar />
    </div>
  );
}

export default LoadingPage;
