import { useState } from "react";
import type { FormDataType } from "../contactForm";
import emailjs from "@emailjs/browser";

const emailjsAccountId = "service_tolzqwi";
const emailjsTemplate = "template_b7076dh";
const emailjsPublicKey = "qBlKeKkuDfgqPwkVl";

export function useMailjs() {
  const [resStatus, setResStatus] = useState("");

  const sendEmail = async (data: FormDataType) => {
    const templateParams = {
      name: data.name,
      email: data.email,
      message: data.message,
    };

    try {
      setResStatus("Enviando...");
      // emailjs
      //   .send(
      //     emailjsAccountId,
      //     emailjsTemplate,
      //     templateParams,
      //     emailjsPublicKey,
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     if (res.status === 200) {
      //       setResStatus("mensaje enviado");
      //     }
      //   });
    } catch (e) {
      console.log(e);
      setResStatus("Error en el envio");
    }
  };

  return { sendEmail, resStatus, setResStatus };
}
