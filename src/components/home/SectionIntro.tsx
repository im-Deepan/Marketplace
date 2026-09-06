import { FC, ReactNode } from "react";
import { SectionHeading } from "@/components/home/primitives";

interface SectionIntroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  bgVariant?: "surface" | "background";
}

const SectionIntro: FC<SectionIntroProps> = ({
  title,
  subtitle,
  children,
  bgVariant = "background",
}) => {
  const bgClass = bgVariant === "surface" ? "border-y border-border bg-surface" : "";

  return (
    <section className={bgClass}>
      <div className="mx-auto w-full max-w-6xl px-5 py-16">
        <SectionHeading title={title} sub={subtitle} />
        {children}
      </div>
    </section>
  );
};

export default SectionIntro;
