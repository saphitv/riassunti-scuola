"use client";

import { MathJax } from "better-react-mathjax";

interface MathBlockProps {
  children: string;
  gap?: "sm" | "md" | "lg" | "xl";
}

export function MathBlock({ children, gap = "md" }: MathBlockProps) {
  return (
    <div className={`math-block math-block-gap-${gap}`}>
      <MathJax>{`\\[${children}\\]`}</MathJax>
    </div>
  );
}
