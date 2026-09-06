import { FC } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Project } from "@/types";
import ProjectCard from "@/components/home/ProjectCard";
import { ActionButton, SectionHeading } from "@/components/home/primitives";
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
  const handleDomainClick = (domain: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onDomainClick?.(domain);
  };

  if (loading) {
    return (
      <section className="border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-20">
          <SectionHeading title={title} sub={subtitle} />
          <div className="mt-10 h-20 animate-pulse rounded-full bg-muted" />
          <div className="mt-12 h-64 animate-pulse rounded-xl bg-muted" />
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-20">
        <SectionHeading title={title} sub={subtitle} />

        {/* Domain Tags */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Explore by Domain</h3>
          <ul className="flex flex-wrap gap-3">
            {domains.map((domain) => (
              <li key={domain}>
                <button
                  onClick={handleDomainClick(domain)}
                  className="inline-flex rounded-full border border-border px-4 py-2 text-sm cursor-pointer transition-colors hover:border-accent hover:text-accent"
                  type="button"
                  aria-label={`Explore ${domain} domain`}
                >
                  {domain}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Carousel */}
        <div className="mt-12 px-12">
          <Carousel
            plugins={[
              Autoplay({
                delay: autoplayDelay,
              }),
            ]}
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id || project.title} className="basis-1/2 lg:basis-1/3">
                  <ProjectCard project={project} onClick={onProjectClick} variant="carousel" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="mt-10">
          <ActionButton variant="ghost" onClick={onBrowseAll}>
            Browse All Ideas
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default IdeasCarousel;
