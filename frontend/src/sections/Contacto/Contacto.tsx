import style from "./Contacto.module.css";
import ContactForm from "../../components/contactForm/form/contactForm/contactForm";

type Props = {};

function Contacto({}: Props) {
  return (
    <section id="contacto" className={style.contact}>
      {/* <h1 className={style.h1}>{lenguage.Contact.txt0}</h1> */}
      <ContactForm />
    </section>
  );
}

export default Contacto;
