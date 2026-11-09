import style from "./StatusFlag.module.css";

type Props = { message: string };

function StatusFlag({ message }: Props) {
  return (
    <div className={message == "Enviando..." ? style.inProgress : style.done}>
      <p className={style.message}>{message}</p>
    </div>
  );
}

export default StatusFlag;
