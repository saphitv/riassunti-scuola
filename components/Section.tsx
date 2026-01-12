import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  allowPageBreak?: boolean;
}

export function Section({ title, children, allowPageBreak = false }: SectionProps) {
  return (
    <section className={`section ${allowPageBreak ? "section-allow-break" : ""}`}>
      <h2 className="section-title">{title}</h2>
      <div className="section-content">{children}</div>
    </section>
  );
}
