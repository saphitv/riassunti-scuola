import { ViewTransition } from "react";

interface CourseHeaderProps {
  title: string;
  viewTransitionName?: string;
}

export function CourseHeader({
  title,
  viewTransitionName,
}: CourseHeaderProps) {
  return (
    <header className="header">
      {viewTransitionName ? (
        <ViewTransition name={viewTransitionName}>
          <h1>{title}</h1>
        </ViewTransition>
      ) : (
        <h1>{title}</h1>
      )}
    </header>
  );
}
