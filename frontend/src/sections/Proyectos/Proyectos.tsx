import { useContext } from "react";
import ProjectCard from "../../components/cards/projectCard/ProjectCard";
import style from "./Proyectos.module.css";
import lenguagesContext from "../../contexts/lenguages/lenguagesContext";
import demoImg from "../../assets/projects/demo.webp";
import demo1Img from "../../assets/projects/demo 1.webp";
import demo2Img from "../../assets/projects/demo3.webp";

// Contenido de muestra: reemplazar por los proyectos reales.
// Las imágenes se importan arriba (Vite las resuelve y las optimiza);
// sin `image` la tarjeta muestra un marcador de posición.
// `href` es la URL del proyecto y abre en una pestaña nueva.
type Project = {
  title: string;
  subtitle?: string;
  href?: string;
  technologies: string[];
  image?: string;
  underDevelopment?: boolean;
  description: string;
};

const projects: Project[] = [
  {
    title: "",
    subtitle: "",
    href: "https://demos-ldzu.onrender.com/",
    technologies: ["React", "TypeScript"],
    image: demoImg,
    underDevelopment: false,
    description: "",
  },
  {
    title: "",
    subtitle: "",
    href: "https://demos1-dgb9.onrender.com/",
    technologies: ["React", "TypeScript"],
    image: demo1Img,
    underDevelopment: false,
    description: "",
  },
  {
    title: "",
    subtitle: "",
    technologies: ["React", "Node", "MongoDB", "TypeScript"],
    image: demo2Img,
    underDevelopment: true,
    description: "",
  },
];

function Proyectos() {
  const { lenguage } = useContext(lenguagesContext);
  const cardsTexts = lenguage.Projects.cards;
  return (
    <section id="proyectos" className={style.projects}>
      <h1 className={style.h1}>{lenguage.Projects.txt0}</h1>
      <div className={style.projectsGrid}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            title={cardsTexts[index].title}
            subtitle={cardsTexts[index].subtitle}
            href={project.href}
            linkLabel={lenguage.Projects.txt1}
            underDevelopment={project.underDevelopment}
            underDevelopmentLabel={lenguage.Projects.txt2}
            readMoreLabel={lenguage.Projects.txt3}
            readLessLabel={lenguage.Projects.txt4}
            technologies={project.technologies}
            description={cardsTexts[index].description}
            image={project.image}
          />
        ))}
      </div>
    </section>
  );
}

export default Proyectos;
