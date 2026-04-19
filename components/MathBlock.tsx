"use client";

import { MathJax } from "better-react-mathjax";

interface MathBlockProps {
  children: string;
  gap?: "sm" | "md" | "lg" | "xl";
  size?: "default" | "small";
}

export function MathBlock({
  children,
  gap = "md",
  size = "default",
}: MathBlockProps) {
  return (
    <div className={`math-block math-block-gap-${gap} math-block-size-${size}`}>
      <MathJax>{`\\[${children}\\]`}</MathJax>
    </div>
  );
}
