import style from "./contactForm.module.css";
import TextInput from "../../inputs/textInput/TextInput";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import lenguagesContext from "../../../../contexts/lenguages/lenguagesContext";
import StatusFlag from "../../statusFlag/StatusFlag";

export type FormDataType = {
  name: string;
  email: string;
  message: string;
};

function ContactForm() {
  const { register, handleSubmit, reset } = useForm();
  const { lenguage } = useContext(lenguagesContext);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const sendEmail = async (data: FormDataType) => {
    const url = import.meta.env.VITE_MAILING;
    setIsPending(true);
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response;
    res.status === 200
      ? setMessage(
          "Su mensaje ha sido enviado exitosamente, dentro de poco recibirá la confirmación en su correo electrónico",
        )
      : setMessage(
          "Hubo un error al enviar su mensaje, por favor, inténtelo de nuevo mas tarde.",
        );
    setIsPending(false);
  };

  return (
    <form
      className={style.form}
      id="form"
      onSubmit={handleSubmit((data) => {
        sendEmail(data as FormDataType);
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
        {message !== "" && <StatusFlag message={message} />}
        {isPending && <StatusFlag message="Enviando..." />}
      </div>
    </form>
  );
}

export default ContactForm;
