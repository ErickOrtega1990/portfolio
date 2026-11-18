import type { MouseEvent, ReactNode } from "react";
import style from "./NavbarLink.module.css";

type Props = {
  href: string;
  children: ReactNode;
  onNavigate?: () => void;
};

function Link({ href, children, onNavigate }: Props) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (href.length < 2 || !href.startsWith("#")) return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();

    // El scroll real ocurre en #root (overflow-y: auto), no en el documento.
    // Hacer scroll explícitamente ahí evita que el cambio de hash no mueva
    // el contenedor anidado en móvil.
    const scroller = document.getElementById("root");
    if (scroller) {
      const scrollMarginTop =
        parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const top =
        target.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop -
        scrollMarginTop;

      scroller.scrollTo({ top, behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Mantiene la URL actualizada sin disparar el salto nativo del hash.
    window.history.pushState(null, "", href);
    onNavigate?.();
  };

  return (
    <a className={style.link} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
