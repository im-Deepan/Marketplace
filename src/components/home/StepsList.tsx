import { FC } from "react";
import { StepType } from "@/types";
import { SectionHeading } from "@/components/home/primitives";

interface StepsListProps {
  title: string;
  subtitle?: string;
  steps: StepType[];
  variant?: "grid" | "vertical";
}

const StepsList: FC<StepsListProps> = ({ title, subtitle, steps, variant = "grid" }) => {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20">
      <SectionHeading title={title} sub={subtitle} />
      <ol
        className={`mt-10 grid gap-8 ${
          variant === "grid" ? "sm:grid-cols-2 lg:grid-cols-5" : "grid-cols-1"
        }`}
      >
        {steps.map((step) => (
          <li key={step.no} className="border-t border-border pt-4">
            <span className="font-display text-sm font-bold text-accent">{step.no}</span>
            <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default StepsList;
