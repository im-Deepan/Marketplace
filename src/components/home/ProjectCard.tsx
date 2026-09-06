import { FC } from "react";
import { Project, ProjectCardProps } from "@/types";

const ProjectCard: FC<ProjectCardProps> = ({ project, onClick, variant = "grid" }) => {
  const handleClick = () => {
    onClick?.(project);
  };

  const baseClasses =
    "group overflow-hidden rounded-xl border border-border bg-surface cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lift";

  const carouselClasses = variant === "carousel" ? "flex flex-col h-full" : "";

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${carouselClasses}`}
      type="button"
      aria-label={`View ${project.title} project`}
    >
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          width={variant === "carousel" ? 400 : 800}
          height={variant === "carousel" ? 300 : 600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className={`p-4 ${variant === "carousel" ? "flex-1 flex flex-col" : ""}`}>
        {/* Category */}
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {project.category}
        </p>

        {/* Title */}
        <h3
          className={`mt-1 font-semibold ${
            variant === "carousel" ? "text-sm line-clamp-2" : "text-base"
          }`}
        >
          {project.title}
        </h3>

        {/* Technology */}
        <p
          className={`mt-2 text-muted-foreground ${variant === "carousel" ? "text-xs" : "text-sm"}`}
        >
          {project.technology}
        </p>

        {/* Meta Information (Grid variant only) */}
        {variant === "grid" && (
          <p className="mt-3 text-sm">
            <span className="font-medium">{project.difficulty}</span>
            <span className="text-muted-foreground"> · approx. {project.cost}</span>
          </p>
        )}
      </div>
    </button>
  );
};

export default ProjectCard;
