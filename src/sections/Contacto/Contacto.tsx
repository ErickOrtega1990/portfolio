import style from "./Contacto.module.css";
import ContactForm from "../../components/contactForm/form/contactForm/contactForm";
import { useContext } from "react";
import lenguagesContext from "../../contexts/lenguages/lenguagesContext";

type Props = {};

function Contacto({}: Props) {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <section id="contacto" className={style.contact}>
      <h1 className={style.h1}>{lenguage.Contact.txt0}</h1>
      <ContactForm />
    </section>
  );
}

export default Contacto;
