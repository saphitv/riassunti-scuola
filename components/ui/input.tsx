import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-14 w-full min-w-0 border-0 border-b border-[var(--rule)] bg-transparent px-0 py-3",
          "text-lg leading-none text-[var(--ink)]",
          "placeholder:italic placeholder:text-[var(--ink-muted)]",
          "focus-visible:border-[var(--accent)] focus-visible:outline-none",
          "transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
