import { ReactNode } from "react";

interface ColumnProps {
  children: ReactNode;
  width?: "auto" | "half" | "third" | "two-thirds";
}

export function Column({ children, width = "auto" }: ColumnProps) {
  const widthClass = {
    auto: "col-auto",
    half: "col-half",
    third: "col-third",
    "two-thirds": "col-two-thirds",
  }[width];

  return <div className={`column ${widthClass}`}>{children}</div>;
}
