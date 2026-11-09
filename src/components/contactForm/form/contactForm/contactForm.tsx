import style from "./contactForm.module.css";
import TextInput from "../../inputs/textInput/TextInput";
import { useForm } from "react-hook-form";
import { useMailjs } from "./hooks/useMailjs";
import StatusFlag from "../../statusFlag/StatusFlag";
import { useContext, useEffect } from "react";
import lenguagesContext from "../../../../contexts/lenguages/lenguagesContext";

type Props = {};

export type FormDataType = {
  name: string;
  email: string;
  message: string;
};

function contactForm({}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const { sendEmail, resStatus, setResStatus } = useMailjs();
  const { lenguage } = useContext(lenguagesContext);

  useEffect(() => {
    setTimeout(() => {
      resStatus != "Enviando..."
        ? setResStatus("Enviando...")
        : setResStatus("Mensaje enviado");
      setResStatus("");
    }, 3000);
  }, [resStatus]);

  return (
    <form
      className={style.form}
      id="form"
      onSubmit={handleSubmit((data) => {
        sendEmail(data as FormDataType);
        console.warn(data);
        reset();
      })}
    >
      <div className={style.callToAction}>
        <span className={style.t1}>{lenguage.Contact.txt1}</span>
        <span className={style.t2}>{lenguage.Contact.txt2}</span>
        <p className={style.p}>{lenguage.Contact.txt3}</p>
        <p className={style.p}>{lenguage.Contact.txt4}</p>
      </div>
      <div className={style.inputContainer}>
        <TextInput
          type="text"
          id="nombre"
          placeHolder={lenguage.Contact.form.txt1}
          {...register("name")}
        ></TextInput>
        <TextInput
          type="email"
          placeHolder={lenguage.Contact.form.txt2}
          id="email"
          {...register("email")}
        ></TextInput>
        <TextInput
          type="textArea"
          label=""
          placeHolder={lenguage.Contact.form.txt3}
          id="message"
          {...register("message")}
        ></TextInput>
        <input
          className={style.submit}
          type="submit"
          value={lenguage.Contact.form.txt4}
        />
        {resStatus != "" && <StatusFlag message={resStatus} />}
      </div>
    </form>
  );
}

export default contactForm;
