import { useState } from "react";
import type { FormDataType } from "../contactForm";

export function useMailjs() {
  const [resStatus, setResStatus] = useState("");

  // El envío por EmailJS está deshabilitado temporalmente.
  const sendEmail = (data: FormDataType) => {
    void data;
    setResStatus("Enviando...");
  };

  return { sendEmail, resStatus, setResStatus };
}
