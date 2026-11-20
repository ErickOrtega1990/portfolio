import style from "./StatusFlag.module.css";
import lenguagesContext from "../../../contexts/lenguages/lenguagesContext";
import { useContext } from "react";

type Props = { message: "done" | "error" | "pending" | "" };

function StatusFlag({ message }: Props) {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <div className={message == "pending" ? style.inProgress : style.done}>
      {message !== "" && (
        <p className={style.message}>{lenguage.Contact.Response[message]}</p>
      )}
    </div>
  );
}

export default StatusFlag;
