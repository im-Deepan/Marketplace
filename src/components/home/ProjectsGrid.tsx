import { FC } from "react";
import { Project } from "@/types";
import ProjectCard from "@/components/home/ProjectCard";
import { ActionButton, SectionHeading } from "@/components/home/primitives";

interface ProjectsGridProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
  onProjectClick?: (project: Project) => void;
  onViewAll?: () => void;
  loading?: boolean;
}

const ProjectsGrid: FC<ProjectsGridProps> = ({
  projects,
  title = "Explore Real Projects",
  subtitle = "See what other students and builders have actually made.",
  onProjectClick,
  onViewAll,
  loading = false,
}) => {
  if (loading) {
    return (
      <section className="mx-auto w-full max-w-6xl px-5 py-20">
        <SectionHeading title={title} sub={subtitle} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl bg-muted h-80" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20">
      <SectionHeading title={title} sub={subtitle} />
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <li key={project.id || project.title}>
            <ProjectCard project={project} onClick={onProjectClick} variant="grid" />
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <ActionButton variant="ghost" onClick={onViewAll}>
          View All Projects
        </ActionButton>
      </div>
    </section>
  );
};

export default ProjectsGrid;
