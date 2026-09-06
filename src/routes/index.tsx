import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Reveal } from "@/components/home/primitives";

// Page sections
import HeroSection from "@/components/home/HeroSection";
import SectionIntro from "@/components/home/SectionIntro";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import IdeasCarousel from "@/components/home/IdeasCarousel";
import FlowSection from "@/components/home/FlowSection";
import StepsList from "@/components/home/StepsList";
import CTASection from "@/components/home/PlatformIntro";

// Data & hooks
import { projects, steps, ideaDomains, communityFlow, builderFlow } from "@/data/homeData";
import { useProjects } from "@/hooks/useProjects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProjectHub — Discover. Build. Collaborate." },
      {
        name: "description",
        content:
          "Discover college projects, find project ideas, solve technical problems, and connect with builders who can help bring your ideas to life.",
      },
      { property: "og:title", content: "ProjectHub — Discover. Build. Collaborate." },
      {
        property: "og:description",
        content:
          "Explore real student projects, find mechanical project ideas, ask technical questions, and connect with builders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  // Fetch projects from API (fallback to static data for now)
  const { data: apiProjects, loading } = useProjects();
  const displayProjects = apiProjects.length > 0 ? apiProjects : projects;

  // Event handlers
  const handleExploreProjects = () => {
    console.log("Navigate to projects");
  };

  const handlePostIdea = () => {
    console.log("Navigate to post idea");
  };

  const handleProjectClick = (project: (typeof projects)[0]) => {
    console.log("Project clicked:", project);
  };

  const handleDomainClick = (domain: string) => {
    console.log("Domain selected:", domain);
  };

  const handleViewAllProjects = () => {
    console.log("View all projects");
  };

  const handleBrowseAllIdeas = () => {
    console.log("Browse all ideas");
  };

  const handleAskQuestion = () => {
    console.log("Ask a question");
  };

  const handlePostRequest = () => {
    console.log("Post a request");
  };

  const handleCTAPrimary = () => {
    console.log("CTA Primary clicked");
  };

  const handleCTASecondary = () => {
    console.log("CTA Secondary clicked");
  };
  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <Reveal as="div">
          <HeroSection
            title="Turn Your Project Idea Into Reality."
            subtitle="Discover real projects, explore ideas, solve technical problems, and connect with people who can help you build."
            primaryCTA="Explore Projects"
            secondaryCTA="Post Your Idea"
            onPrimaryCTA={handleExploreProjects}
            onSecondaryCTA={handlePostIdea}
          />
        </Reveal>

        {/* Platform Introduction */}
        <Reveal as="div">
          <SectionIntro
            title="Everything You Need to Build Better Projects."
            subtitle="From finding an idea to getting implementation help, the platform brings the complete project journey together."
            bgVariant="surface"
          />
        </Reveal>

        {/* Projects Grid */}
        <Reveal as="div" id="projects">
          <ProjectsGrid
            projects={displayProjects}
            title="Explore Real Projects"
            subtitle="See what other students and builders have actually made."
            onProjectClick={handleProjectClick}
            onViewAll={handleViewAllProjects}
            loading={loading}
          />
        </Reveal>

        {/* Ideas Carousel */}
        <Reveal as="div" id="ideas">
          <IdeasCarousel
            projects={displayProjects}
            domains={ideaDomains}
            title="Discover Project Ideas"
            subtitle="Find suitable mechanical project ideas based on your interest and skill level."
            onProjectClick={handleProjectClick}
            onDomainClick={handleDomainClick}
            onBrowseAll={handleBrowseAllIdeas}
            autoplayDelay={15000}
            loading={loading}
          />
        </Reveal>

        {/* Community Flow Section */}
        <Reveal as="div" id="problems">
          <FlowSection
            title="Stuck? Ask. Learn. Build."
            subtitle="Ask technical questions and get help from the community."
            steps={communityFlow}
            ctaText="Ask a Question"
            onCTA={handleAskQuestion}
            bgVariant="background"
          />
        </Reveal>

        {/* Builder Request Section */}
        <Reveal as="div" id="builders">
          <FlowSection
            title="Have the Idea, But Need Someone to Build It?"
            subtitle="Post your requirements and connect with builders or vendors who can help turn your idea into a working project."
            steps={builderFlow}
            ctaText="Post a Project Request"
            ctaVariant="ghost"
            onCTA={handlePostRequest}
            bgVariant="surface"
          />
        </Reveal>

        {/* How It Works */}
        <Reveal as="div">
          <StepsList title="How It Works" steps={steps} variant="grid" />
        </Reveal>

        {/* Final CTA */}
        <Reveal as="div">
          <CTASection
            title="Have an idea? Let's build it."
            primaryCTA="Explore Projects"
            secondaryCTA="Get Started"
            onPrimaryCTA={handleCTAPrimary}
            onSecondaryCTA={handleCTASecondary}
          />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
