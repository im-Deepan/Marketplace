import { FC, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Project } from "@/types";
import ProjectCard from "@/components/home/ProjectCard";
import { ActionButton, SectionHeading } from "@/components/home/primitives";
import { ArrowRight, Compass } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface IdeasCarouselProps {
  projects: Project[];
  domains: string[];
  title?: string;
  subtitle?: string;
  onProjectClick?: (project: Project) => void;
  onDomainClick?: (domain: string) => void;
  onBrowseAll?: () => void;
  autoplayDelay?: number;
  loading?: boolean;
}

const IdeasCarousel: FC<IdeasCarouselProps> = ({
  projects,
  domains,
  title = "Discover Project Ideas",
  subtitle = "Find suitable mechanical project ideas based on your interest and skill level.",
  onProjectClick,
  onDomainClick,
  onBrowseAll,
  autoplayDelay = 15000,
  loading = false,
}) => {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  const handleDomainClick = (domain: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDomain(domain === activeDomain ? null : domain);
    onDomainClick?.(domain);
  };

  const displayedProjects = activeDomain
    ? projects.filter(
        (p) =>
          p.category.toLowerCase() === activeDomain.toLowerCase() ||
          p.technology.toLowerCase().includes(activeDomain.toLowerCase()),
      )
    : projects;

  if (loading) {
    return (
      <section className="border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading title={title} sub={subtitle} />
          <div className="mt-8 h-12 animate-pulse rounded-2xl bg-muted/60" />
          <div className="mt-8 h-80 animate-pulse rounded-2xl bg-muted/60" />
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={title} sub={subtitle} />
        </div>

        {/* Domain Tags */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Compass className="h-4 w-4 text-accent" />
            <span>Filter by Domain</span>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {domains.map((domain) => {
              const active = activeDomain === domain;
              return (
                <li key={domain}>
                  <button
                    onClick={handleDomainClick(domain)}
                    className={`inline-flex items-center rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-accent text-accent-contrast shadow-soft"
                        : "border border-border bg-background text-muted-foreground hover:border-accent/40 hover:text-foreground"
                    }`}
                    type="button"
                    aria-label={`Explore ${domain} domain`}
                  >
                    {domain}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Carousel Container with proper margins & padding */}
        <div className="mt-10 px-4 sm:px-10">
          <Carousel
            plugins={[
              Autoplay({
                delay: autoplayDelay,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 items-stretch">
              {(displayedProjects.length > 0 ? displayedProjects : projects).map((project) => (
                <CarouselItem
                  key={project.id || project.title}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 flex h-full"
                >
                  <ProjectCard project={project} onClick={onProjectClick} variant="carousel" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:inline-flex -left-4 md:-left-6" />
            <CarouselNext className="hidden sm:inline-flex -right-4 md:-right-6" />
          </Carousel>
        </div>

        {/* Action button */}
        <div className="mt-10 flex items-center justify-between border-t border-border/60 pt-6">
          <p className="text-xs font-medium text-muted-foreground">
            Swipe or use arrows to discover {displayedProjects.length} ideas
          </p>
          <ActionButton
            variant="ghost"
            onClick={onBrowseAll}
            className="inline-flex items-center gap-2 group"
          >
            <span>Browse All Ideas</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default IdeasCarousel;
