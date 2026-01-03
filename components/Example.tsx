import { ReactNode } from "react";

interface ExampleProps {
  title?: string;
  children: ReactNode;
}

export function Example({ title, children }: ExampleProps) {
  return (
    <div className="example">
      {title && <div className="example-title">{title}</div>}
      <div className="example-content">{children}</div>
    </div>
  );
}
