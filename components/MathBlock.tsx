"use client";

import { MathJax } from "better-react-mathjax";
import { useHasMounted } from "@/components/useHasMounted";

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
  const hasMounted = useHasMounted();
  const tex = `\\[${children}\\]`;

  return (
    <div className={`math-block math-block-gap-${gap} math-block-size-${size}`}>
      {hasMounted ? <MathJax>{tex}</MathJax> : <span>{tex}</span>}
    </div>
  );
}
