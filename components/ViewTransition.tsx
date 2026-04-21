import * as React from "react";

type ReactViewTransitionProps = {
  name: string;
  children: React.ReactNode;
};

type ReactWithViewTransition = typeof React & {
  ViewTransition?: React.ComponentType<ReactViewTransitionProps>;
};

interface ViewTransitionProps {
  name?: string;
  children: React.ReactNode;
}

export function ViewTransition({ name, children }: ViewTransitionProps) {
  const ReactViewTransition = (React as ReactWithViewTransition).ViewTransition;

  if (!name || !ReactViewTransition) {
    return <>{children}</>;
  }

  return <ReactViewTransition name={name}>{children}</ReactViewTransition>;
}
