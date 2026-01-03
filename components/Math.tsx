"use client";

import { MathJax } from "better-react-mathjax";

interface MathProps {
  children: string;
}

export function Math({ children }: MathProps) {
  return <MathJax inline>{`\\(${children}\\)`}</MathJax>;
}
