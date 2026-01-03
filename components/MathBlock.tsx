"use client";

import { MathJax } from "better-react-mathjax";

interface MathBlockProps {
  children: string;
}

export function MathBlock({ children }: MathBlockProps) {
  return (
    <div className="math-block">
      <MathJax>{`\\[${children}\\]`}</MathJax>
    </div>
  );
}
