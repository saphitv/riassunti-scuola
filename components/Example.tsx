import { ReactNode } from "react";

interface ExampleProps {
  title?: string;
  children: ReactNode;
  color?: "green" | "red" | "yellow" | "blue" | "gray";
  border?: "left" | "right" | "top" | "bottom" | "all";
  radius?: "none" | "sm" | "md" | "lg" | "full";
}

export function Example({ title, children, color = "gray", border, radius }: ExampleProps) {
  return (
    <div className={`example example-color-${color} ${border ? `example-border-${border}` : ""} ${radius ? `example-radius-${radius}` : ""}`}>
      {title && <div className={`example-title example-color-${color}`}>{title}</div>}
      <div className={`example-content example-color-${color}`}>{children}</div>
    </div>
  );
}
