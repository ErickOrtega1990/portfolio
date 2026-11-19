import { useId, useState } from "react";
import style from "./ProjectCard.module.css";

type Props = {
  title: string;
  subtitle?: string;
  description: string;
  technologies?: string[];
  image?: string;
  imageAlt?: string;
  href?: string;
  linkLabel?: string;
  underDevelopment?: boolean;
  underDevelopmentLabel?: string;
  readMoreLabel?: string;
  readLessLabel?: string;
};

function ProjectCard({
  title,
  subtitle,
  description,
  technologies = [],
  image,
  imageAlt,
  href,
  linkLabel = "Ver proyecto",
  underDevelopment = false,
  underDevelopmentLabel = "En desarrollo",
  readMoreLabel = "Leer más",
  readLessLabel = "Leer menos",
}: Props) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const descriptionId = useId();

  return (
    <article className={style.card}>
      <div className={style.media}>
        {image ? (
          <img
            className={style.img}
            src={image}
            alt={imageAlt ?? title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={style.placeholder}>
            <svg
              className={style.placeholderIcon}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle
                cx="9"
                cy="9.5"
                r="1.6"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M4 17l4.5-4.6a1.6 1.6 0 0 1 2.3 0L15 16.5m0 0 1.8-1.9a1.6 1.6 0 0 1 2.3 0L21 16.6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={style.placeholderText}>Imagen del proyecto</span>
          </div>
        )}
      </div>

      <div className={style.content}>
        {technologies.length > 0 && (
          <ul className={style.technologies}>
            {technologies.map((technology, index) => (
              <li key={`${technology}-${index}`} className={style.technology}>
                <span className={style.dot} aria-hidden="true" />
                <span className={style.technologyName}>{technology}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={style.heading}>
          <h3 className={style.title}>{title}</h3>
          {subtitle && <p className={style.subtitle}>{subtitle}</p>}
        </div>

        <div
          className={`${style.descriptionCollapse} ${
            isDescriptionExpanded ? style.expanded : ""
          }`}
        >
          <div className={style.descriptionInner}>
            <p
              id={descriptionId}
              className={style.description}
              tabIndex={0}
            >
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          className={style.toggleDescription}
          onClick={() => setIsDescriptionExpanded((prev) => !prev)}
          aria-expanded={isDescriptionExpanded}
          aria-controls={descriptionId}
        >
          {isDescriptionExpanded ? readLessLabel : readMoreLabel}
        </button>

        {(href || underDevelopment) && (
          <div className={style.footer}>
            {underDevelopment ? (
              <span className={style.status}>
                <span className={style.statusDot} aria-hidden="true" />
                {underDevelopmentLabel}
              </span>
            ) : (
              <a
                className={style.link}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${linkLabel}: ${title}`}
              >
                <span>{linkLabel}</span>
                <svg
                  className={style.linkIcon}
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 11 11 5M11 5H6.5M11 5v4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
