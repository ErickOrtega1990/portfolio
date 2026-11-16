import { useContext, useEffect, useRef, useState } from "react";
import style from "./Footer.module.css";
import lenguagesContext from "../../contexts/lenguages/lenguagesContext";

type Props = {};

function MailIcon() {
  return (
    <svg
      className={style.icon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="2.5"
        y="4.5"
        width="19"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m3.5 6 8.5 6.5L20.5 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      className={style.icon}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.92.58.11.79-.25.79-.56v-2.18c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      className={style.icon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 21.5s6.5-5.66 6.5-10.5a6.5 6.5 0 1 0-13 0c0 4.84 6.5 10.5 6.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Footer({}: Props) {
  const { lenguage } = useContext(lenguagesContext);
  const footerRef = useRef<HTMLElement>(null);
  const [isFooterInView, setIsFooterInView] = useState(false);
  const year = new Date().getFullYear();

  const navigation = [
    { href: "#inicio", label: lenguage.navBar.txt1 },
    { href: "#formacion", label: lenguage.navBar.txt21 },
    { href: "#experiencia", label: lenguage.navBar.txt22 },
    { href: "#habilidades", label: lenguage.navBar.txt23 },
    { href: "#proyectos", label: lenguage.navBar.txt3 },
    { href: "#contacto", label: lenguage.navBar.txt4 },
  ];

  const compactNavigation = [
    { href: "#inicio", label: lenguage.navBar.txt1 },
    { href: "#habilidades", label: lenguage.navBar.txt23 },
    { href: "#proyectos", label: lenguage.navBar.txt3 },
    { href: "#contacto", label: lenguage.navBar.txt4 },
  ];

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || typeof IntersectionObserver === "undefined") return;

    // El footer completo se considera visible cuando asoma por encima de
    // la barra compacta; en ese momento la barra reducida desaparece.
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterInView(entry.isIntersecting),
      { rootMargin: "0px 0px -56px 0px", threshold: 0 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <footer ref={footerRef} className={style.footer}>
        <div className={style.container}>
          <div className={style.brand}>
            <h2 className={style.name}>{lenguage.Home.txt1}</h2>
            <p className={style.role}>{lenguage.Home.txt2}</p>
            <p className={style.tagline}>{lenguage.footer.tagline}</p>
          </div>

          <nav className={style.column} aria-label={lenguage.footer.nav}>
            <h3 className={style.heading}>{lenguage.footer.nav}</h3>
            <ul className={style.list}>
              {navigation.map(({ href, label }) => (
                <li key={href}>
                  <a className={style.link} href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={style.column}>
            <h3 className={style.heading}>{lenguage.footer.contact}</h3>
            <ul className={style.contactList}>
              <li>
                <a
                  className={style.contactLink}
                  href="mailto:contacto@erickortegadev.cl"
                >
                  <MailIcon />
                  <span className={style.link}>contacto@erickortegadev.cl</span>
                </a>
              </li>
              <li>
                <a
                  className={style.contactLink}
                  href="https://github.com/ErickOrtega1990"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon />
                  <span className={style.link}>github.com/ErickOrtega1990</span>
                </a>
              </li>
              <li>
                <span className={style.location}>
                  <PinIcon />
                  <span className={style.link}>{lenguage.footer.location}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={style.bottom}>
          <p>
            © {year} Erick Ortega. {lenguage.footer.rights}
          </p>
          <p className={style.madeWith}>{lenguage.footer.madeWith}</p>
        </div>
      </footer>

      {/* Versión reducida: acompaña el scroll hasta que el footer completo
          aparece al final de la página. */}
      {!isFooterInView && (
        <aside className={style.compact}>
          <div className={style.compactInner}>
            <span className={style.compactBrand}>
              <span className={style.compactDot} aria-hidden="true" />
              {lenguage.Home.txt1}
            </span>

            <nav className={style.compactNav} aria-label={lenguage.footer.nav}>
              {compactNavigation.map(({ href, label }) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </nav>

            <span className={style.compactRights}>© {year}</span>
          </div>
        </aside>
      )}
    </>
  );
}

export default Footer;
