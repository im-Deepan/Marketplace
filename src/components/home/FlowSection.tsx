import { FC } from "react";
import { FlowStep } from "@/types";
import { ActionButton, FlowDiagram, SectionHeading } from "@/components/home/primitives";

interface FlowSectionProps {
  title: string;
  subtitle?: string;
  steps: FlowStep[];
  ctaText?: string;
  ctaVariant?: "default" | "ghost";
  onCTA?: () => void;
  bgVariant?: "surface" | "background";
}

const FlowSection: FC<FlowSectionProps> = ({
  title,
  subtitle,
  steps,
  ctaText = "Get Started",
  ctaVariant = "default",
  onCTA,
  bgVariant = "background",
}) => {
  const bgClass = bgVariant === "surface" ? "border-y border-border bg-surface" : "";

  return (
    <section className={`${bgClass}`}>
      <div className="mx-auto w-full max-w-6xl px-5 py-20">
        <SectionHeading title={title} sub={subtitle} />
        <div className="mt-8">
          <FlowDiagram steps={steps} />
        </div>
        {ctaText && (
          <div className="mt-8">
            <ActionButton variant={ctaVariant} onClick={onCTA}>
              {ctaText}
            </ActionButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlowSection;
