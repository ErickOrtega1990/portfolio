import style from "./contactForm.module.css";
import TextInput from "../../inputs/textInput/TextInput";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState, type FormEvent } from "react";
import lenguagesContext from "../../../../contexts/lenguages/lenguagesContext";
import StatusFlag from "../../statusFlag/StatusFlag";

export type FormDataType = {
  name: string;
  email: string;
  message: string;
};

const TIMEOUT_MS = 60000;

function ContactForm() {
  const { register, reset } = useForm();
  const { lenguage } = useContext(lenguagesContext);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [message, setMessage] = useState<"error" | "pending" | "done" | "">("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingTimeout = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const sendEmail = async (data: FormDataType) => {
    const url = import.meta.env.VITE_MAILING;
    const controller = new AbortController();

    setIsPending(true);
    setMessage("");

    timeoutRef.current = setTimeout(() => {
      controller.abort();
      setMessage("error");
      setIsPending(false);
      timeoutRef.current = null;
    }, TIMEOUT_MS);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      if (timeoutRef.current === null) return;

      clearPendingTimeout();

      res.status === 200 ? setMessage("done") : setMessage("error");
    } catch (error) {
      if (timeoutRef.current !== null) {
        clearPendingTimeout();
        setMessage("error");
      }
    } finally {
      setIsPending(false);
    }
  };

  const resetResult = () => {
    setMessage("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    sendEmail({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    });
    reset();
  };

  return (
    <form
      className={style.form}
      id="form"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <div className={style.callToAction}>
        <span className={style.t1}>{lenguage.Contact.txt1}</span>
        <span className={style.t2}>{lenguage.Contact.txt2}</span>
        <p className={style.p}>{lenguage.Contact.txt3}</p>
        <p className={style.p}>{lenguage.Contact.txt4}</p>
        {message !== "" && <StatusFlag message={message} />}
        {isPending && <StatusFlag message={message} />}
      </div>
      <div className={style.inputContainer}>
        <TextInput
          type="text"
          id="nombre"
          onclick={() => resetResult()}
          placeHolder={lenguage.Contact.form.txt1}
          autoComplete="new-password"
          {...register("name")}
        ></TextInput>
        <TextInput
          type="email"
          placeHolder={lenguage.Contact.form.txt2}
          id="email"
          autoComplete="new-password"
          onclick={() => resetResult()}
          {...register("email")}
        ></TextInput>
        <TextInput
          type="textArea"
          label=""
          placeHolder={lenguage.Contact.form.txt3}
          id="message"
          autoComplete="off"
          onclick={() => resetResult()}
          {...register("message")}
        ></TextInput>
        <input
          className={style.submit}
          type="submit"
          value={lenguage.Contact.form.txt4}
        />
      </div>
    </form>
  );
}

export default ContactForm;
