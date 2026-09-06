import { FC, useState, useMemo } from "react";
import { Project } from "@/types";
import ProjectCard from "@/components/home/ProjectCard";
import { ActionButton, SectionHeading } from "@/components/home/primitives";
import { ArrowRight, Sparkles, Filter } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [projects, selectedCategory]);

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title={title} sub={subtitle} />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-2xl bg-muted/60 border border-border"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Top Header & Controls */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading title={title} sub={subtitle} />

        {/* Category Filter Pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground mr-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter:</span>
            </span>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-accent text-accent-contrast shadow-soft"
                      : "border border-border bg-surface text-muted-foreground hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length > 0 ? (
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {filteredProjects.map((project) => (
            <li key={project.id || project.title} className="flex h-full w-full">
              <ProjectCard project={project} onClick={onProjectClick} variant="grid" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
          <Sparkles className="h-8 w-8 text-muted-foreground/60" />
          <p className="mt-3 text-sm font-semibold text-foreground">
            No projects found in this category
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="mt-3 text-xs font-semibold text-accent hover:underline cursor-pointer"
          >
            Clear filter to view all
          </button>
        </div>
      )}

      {/* Footer view all button */}
      <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-6">
        <p className="text-xs font-medium text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} curated projects
        </p>
        <ActionButton
          variant="ghost"
          onClick={onViewAll}
          className="inline-flex items-center gap-2 group"
        >
          <span>View All Projects</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </ActionButton>
      </div>
    </section>
  );
};

export default ProjectsGrid;
