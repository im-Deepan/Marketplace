import { FC } from "react";
import { ActionButton } from "@/components/home/primitives";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryCTA?: () => void;
  onSecondaryCTA?: () => void;
  bgColor?: string;
}

const CTASection: FC<CTASectionProps> = ({
  title,
  subtitle,
  primaryCTA = "Get Started",
  secondaryCTA = "Learn More",
  onPrimaryCTA,
  onSecondaryCTA,
  bgColor = "var(--accent-soft)",
}) => {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-24">
      <div
        className="rounded-2xl border border-accent/40 px-6 py-14 text-center sm:px-12"
        style={{ backgroundColor: bgColor }}
      >
        <h2 className="text-3xl font-semibold sm:text-4xl">
          {title.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </h2>
        {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ActionButton onClick={onPrimaryCTA}>{primaryCTA}</ActionButton>
          <ActionButton variant="ghost" onClick={onSecondaryCTA}>
            {secondaryCTA}
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
