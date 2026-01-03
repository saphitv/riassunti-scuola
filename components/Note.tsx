import { ReactNode } from "react";

interface NoteProps {
  children: ReactNode;
}

export function Note({ children }: NoteProps) {
  return (
    <div className="note">
      <span className="note-label">Nota:</span> {children}
    </div>
  );
}
