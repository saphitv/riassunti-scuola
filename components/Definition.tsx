import { ReactNode } from "react";

interface DefinitionProps {
  term: string;
  children: ReactNode;
}

export function Definition({ term, children }: DefinitionProps) {
  return (
    <div className="definition">
      <span className="definition-term">{term}:</span> {children}
    </div>
  );
}
