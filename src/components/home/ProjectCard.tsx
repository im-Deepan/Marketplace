import { FC } from "react";
import { Project, ProjectCardProps } from "@/types";
import { ArrowUpRight, Cpu } from "lucide-react";

const ProjectCard: FC<ProjectCardProps> = ({ project, onClick, variant = "grid" }) => {
  const handleClick = () => {
    onClick?.(project);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View ${project.title} project`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-accent/80 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* Image Container with 16:10 ratio & category badge */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted/40">
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          width={variant === "carousel" ? 480 : 800}
          height={variant === "carousel" ? 300 : 500}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-md border border-border/40 bg-surface/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground shadow-sm">
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface/90 backdrop-blur-md text-foreground shadow-sm">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Content Container with fixed flex layout */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Title */}
          <h3
            className={`font-display font-bold tracking-tight text-foreground transition-colors group-hover:text-accent ${
              variant === "carousel" ? "text-base line-clamp-2" : "text-lg line-clamp-2"
            }`}
          >
            {project.title}
          </h3>

          {/* Technology */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Cpu className="h-3.5 w-3.5 shrink-0 text-accent" />
            <span className="truncate">{project.technology}</span>
          </div>
        </div>

        {/* Footer Meta Row */}
        <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-xs">
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 font-medium text-foreground">
            {project.difficulty}
          </span>
          <span className="font-semibold text-foreground">
            approx. <span className="text-accent">{project.cost}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
