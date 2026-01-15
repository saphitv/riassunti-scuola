import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  allowPageBreak?: boolean;
  /** Force section to start on current page (useful for first section) */
  forceFirstPage?: boolean;
}

export function Section({ title, children, allowPageBreak = false, forceFirstPage = false }: SectionProps) {
  const classNames = [
    "section",
    allowPageBreak || forceFirstPage ? "section-allow-break" : "",
    forceFirstPage ? "section-force-first-page" : "",
  ].filter(Boolean).join(" ");

  return (
    <section className={classNames}>
      <h2 className="section-title">{title}</h2>
      <div className="section-content">{children}</div>
    </section>
  );
}
