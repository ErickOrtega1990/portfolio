import style from "./Contacto.module.css";
import ContactForm from "../../components/contactForm/form/contactForm/contactForm";

type Props = {};

function Contacto({}: Props) {
  return (
    <section id="contacto" className={style.contact}>
      <ContactForm />
    </section>
  );
}

export default Contacto;
