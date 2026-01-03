import { ReactNode } from "react";

interface TheoremProps {
  title: string;
  children: ReactNode;
  proof?: ReactNode;
}

export function Theorem({ title, children, proof }: TheoremProps) {
  return (
    <div className="theorem">
      <div className="theorem-header">{title}</div>
      <div className="theorem-content">{children}</div>
      {proof && (
        <div className="theorem-proof">
          <span className="proof-label">Dimostrazione:</span> {proof}
        </div>
      )}
    </div>
  );
}
