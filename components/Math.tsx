"use client";

import { MathJax } from "better-react-mathjax";
import { useHasMounted } from "@/components/useHasMounted";

interface MathProps {
  children: string;
}

export function Math({ children }: MathProps) {
  const hasMounted = useHasMounted();
  const tex = `\\(${children}\\)`;

  if (!hasMounted) {
    return <span>{tex}</span>;
  }

  return <MathJax inline>{tex}</MathJax>;
}
