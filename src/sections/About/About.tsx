import style from "./About.module.css";
import Experience from "./Experience/Experience";
import Profile from "./Profile/Profile";
import Skills from "./Skills/Skills";

type Props = {};

function About({}: Props) {
  return (
    <>
      <section className={style.sectionContainer} id="formacion">
        <Profile />
      </section>
      <section className={style.sectionContainer} id="experiencia">
        <Experience />
      </section>
      <section className={style.sectionContainer} id="habilidades">
        <Skills />
      </section>
    </>
  );
}

export default About;
