import { ReactNode } from "react";

interface RowProps {
  children: ReactNode;
  gap?: "sm" | "md" | "lg";
}

export function Row({ children, gap = "md" }: RowProps) {
  const gapClass = {
    sm: "row-gap-sm",
    md: "row-gap-md",
    lg: "row-gap-lg",
  }[gap];

  return <div className={`row ${gapClass}`}>{children}</div>;
}
