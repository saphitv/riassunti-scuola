import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  color?: "default" | "blue" | "green" | "red" | "yellow" | "gray";
  border?: "none" | "solid" | "dashed" | "left";
  title?: string;
}

export function Box({
  children,
  color = "default",
  border = "solid",
  title,
}: BoxProps) {
  return (
    <div className={`box box-${color} box-border-${border}`}>
      {title && <div className="box-title">{title}</div>}
      <div className="box-content">{children}</div>
    </div>
  );
}
