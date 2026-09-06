import { FC } from "react";
import heroImage from "@/assets/hero-mechanical.jpg";
import { ActionButton } from "@/components/home/primitives";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryCTA?: () => void;
  onSecondaryCTA?: () => void;
}

const HeroSection: FC<HeroSectionProps> = ({
  title = "Turn Your Project Idea Into Reality.",
  subtitle = "Discover real projects, explore ideas, solve technical problems, and connect with people who can help you build.",
  primaryCTA = "Explore Projects",
  secondaryCTA = "Post Your Idea",
  onPrimaryCTA,
  onSecondaryCTA,
}) => {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-12 pb-20 lg:grid-cols-[47%_1fr] lg:gap-14 lg:pt-20 lg:pb-28">
      <div>
        <h1 className="hero-in text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl">
          {title.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </h1>
        <p
          className="hero-in mt-5 max-w-lg text-base text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.15s" }}
        >
          {subtitle}
        </p>
        <div
          className="hero-in mt-8 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <ActionButton onClick={onPrimaryCTA}>{primaryCTA}</ActionButton>
          <ActionButton variant="ghost" onClick={onSecondaryCTA}>
            {secondaryCTA}
          </ActionButton>
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
  );
};

export default HeroSection;
