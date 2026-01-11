import { ReactNode } from "react";

interface ColumnProps {
  children: ReactNode;
  width?: "auto" | "half" | "third" | "two-thirds" | "fourth" | "three-fourths";
}

export function Column({ children, width = "auto" }: ColumnProps) {
  const widthClass = {
    auto: "col-auto",
    half: "col-half",
    third: "col-third",
    "two-thirds": "col-two-thirds",
    fourth: "col-fourth",
    "three-fourths": "col-three-fourths",
  }[width];

  return <div className={`column ${widthClass}`}>{children}</div>;
}
