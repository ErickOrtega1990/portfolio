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
    title: "Demo web emprendedores",
    subtitle: "Landign page",
    href: "https://demos-ldzu.onrender.com/",
    technologies: ["React", "TypeScript"],
    image: demoImg,
    underDevelopment: false,
    description: `Demo de landing page para contacto, inspirada en emprendedores artesanales. Una página dividida en seis secciones: "Inicio", "Sobre mí", "Mi trabajo", "Productos", "Cómo comprar", "Contacto"`,
  },
  {
    title: "Demo web mueblería",
    subtitle: "Landing page",
    href: "https://demos1-dgb9.onrender.com/",
    technologies: ["React", "TypeScript"],
    image: demo1Img,
    underDevelopment: false,
    description: `Demo de landing page para contacto, inspirada en el diseño de estilo industrial. Una página dividida en seis secciones: "Inicio", "El estudio", "Nuestro proceso", "Colección", "Cómo comprar", "Cotizar"`,
  },
  {
    title: "Demo web mueblería",
    subtitle: "Tienda virtual",
    technologies: ["React", "Node", "MongoDB", "TypeScript"],
    image: demo2Img,
    underDevelopment: true,
    description:
      "Tienda virtual con catalogo por categorias modifcable por administrador, validación de email, cuentas de usuario, carrito de compra, historial de pedidos y botón de pago y envio de notificación de compra con número de pedido a contacto de ventas.",
  },
];

function Proyectos() {
  const { lenguage } = useContext(lenguagesContext);
  return (
    <section id="proyectos" className={style.projects}>
      <h1 className={style.h1}>{lenguage.Projects.txt0}</h1>
      <div className={style.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            subtitle={project.subtitle}
            href={project.href}
            linkLabel={lenguage.Projects.txt1}
            underDevelopment={project.underDevelopment}
            underDevelopmentLabel={lenguage.Projects.txt2}
            readMoreLabel={lenguage.Projects.txt3}
            readLessLabel={lenguage.Projects.txt4}
            technologies={project.technologies}
            description={project.description}
            image={project.image}
          />
        ))}
      </div>
    </section>
  );
}

export default Proyectos;
