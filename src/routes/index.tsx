import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/hero-mechanical.jpg";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import {
  ActionButton,
  FlowDiagram,
  Reveal,
  SectionHeading,
} from "@/components/home/primitives";
import {
  builderFlow,
  communityFlow,
  ideaDomains,
  projects,
  steps,
} from "@/data/homeData";

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
  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-12 pb-20 lg:grid-cols-[47%_1fr] lg:gap-14 lg:pt-20 lg:pb-28">
          <div>
            <h1 className="hero-in text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl">
              Turn Your Project Idea
              <br />
              Into Reality.
            </h1>
            <p
              className="hero-in mt-5 max-w-lg text-base text-muted-foreground sm:text-lg"
              style={{ animationDelay: "0.15s" }}
            >
              Discover real projects, explore ideas, solve technical problems, and connect
              with people who can help you build.
            </p>
            <div
              className="hero-in mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.3s" }}
            >
              <ActionButton>Explore Projects</ActionButton>
              <ActionButton variant="ghost">Post Your Idea</ActionButton>
            </div>
          </div>
          <div className="hero-visual-in overflow-hidden rounded-2xl border border-border bg-surface">
            <img
              src={heroImage}
              width={1200}
              height={1008}
              alt="Technical drawing of a robotic arm and gear assembly"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Platform introduction */}
        <Reveal as="section" id="about" className="border-y border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-16">
            <SectionHeading
              title="Everything You Need to Build Better Projects."
              sub="From finding an idea to getting implementation help, the platform brings the complete project journey together."
            />
          </div>
        </Reveal>

        {/* Explore projects */}
        <Reveal as="section" id="projects" className="mx-auto w-full max-w-6xl px-5 py-20">
          <SectionHeading
            title="Explore Real Projects"
            sub="See what other students and builders have actually made."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <li
                key={project.title}
                className="group overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lift"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {project.category}
                  </p>
                  <h3 className="mt-1 text-base font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.technology}
                  </p>
                  <p className="mt-3 text-sm">
                    <span className="font-medium">{project.difficulty}</span>
                    <span className="text-muted-foreground"> · approx. {project.cost}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ActionButton variant="ghost">View All Projects</ActionButton>
          </div>
        </Reveal>

        {/* Discover ideas */}
        <Reveal as="section" id="ideas" className="border-y border-border bg-surface">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                title="Discover Project Ideas"
                sub="Find suitable mechanical project ideas based on your interest and skill level."
              />
              <div className="mt-8">
                <ActionButton variant="ghost">Browse All Ideas</ActionButton>
              </div>
            </div>
            <ul className="flex flex-wrap gap-3">
              {ideaDomains.map((domain) => (
                <li key={domain}>
                  <a
                    href="#ideas"
                    className="inline-flex rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {domain}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Problems / community */}
        <Reveal as="section" id="problems" className="mx-auto w-full max-w-6xl px-5 py-20">
          <SectionHeading
            title="Stuck? Ask. Learn. Build."
            sub="Ask technical questions and get help from the community."
          />
          <div className="mt-8">
            <FlowDiagram steps={communityFlow} />
          </div>
          <div className="mt-8">
            <ActionButton>Ask a Question</ActionButton>
          </div>
        </Reveal>

        {/* Find a builder */}
        <Reveal as="section" id="builders" className="border-y border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-20">
            <SectionHeading
              title="Have the Idea, But Need Someone to Build It?"
              sub="Post your requirements and connect with builders or vendors who can help turn your idea into a working project."
            />
            <div className="mt-8">
              <FlowDiagram steps={builderFlow} />
            </div>
            <div className="mt-8">
              <ActionButton variant="ghost">Post a Project Request</ActionButton>
            </div>
          </div>
        </Reveal>

        {/* How it works */}
        <Reveal as="section" className="mx-auto w-full max-w-6xl px-5 py-20">
          <SectionHeading title="How It Works" />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <li key={step.no} className="border-t border-border pt-4">
                <span className="font-display text-sm font-bold text-accent">
                  {step.no}
                </span>
                <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Final CTA */}
        <Reveal as="section" className="mx-auto w-full max-w-6xl px-5 pb-24">
          <div
            className="rounded-2xl border border-accent/40 px-6 py-14 text-center sm:px-12"
            style={{ backgroundColor: "var(--accent-soft)" }}
          >
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Have an idea?
              <br />
              Let&apos;s build it.
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ActionButton>Explore Projects</ActionButton>
              <ActionButton variant="ghost">Get Started</ActionButton>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
