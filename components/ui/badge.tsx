import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] leading-none whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "px-2 py-1 bg-[var(--surface-muted)] text-[var(--ink)] border border-[var(--rule)]",
        outline:
          "px-2 py-1 border border-[var(--rule)] text-[var(--ink-muted)]",
        solid: "px-2 py-1 bg-[var(--ink)] text-[var(--surface)]",
        accent: "px-2 py-1 bg-[var(--accent)] text-[var(--surface)]",
        bare: "text-[var(--ink-muted)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
