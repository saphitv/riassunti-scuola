"use client";

import { cn } from "@/lib/utils";
import type { CourseCategory } from "@/lib/courses";
import { CATEGORY_LABELS } from "@/lib/courses";

interface CategoryFilterProps {
  active: Set<CourseCategory>;
  onToggle: (category: CourseCategory) => void;
  available: CourseCategory[];
}

export function CategoryFilter({
  active,
  onToggle,
  available,
}: CategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Categoria"
      className="flex flex-wrap items-center gap-2"
    >
      {available.map((cat) => {
        const isActive = active.has(cat);
        return (
          <button
            key={cat}
            type="button"
            aria-pressed={isActive}
            onClick={() => onToggle(cat)}
            className={cn(
              "inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] leading-none transition-colors",
              isActive
                ? "bg-[var(--ink)] text-[var(--surface)] border-[var(--ink)]"
                : "border-[var(--rule)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--ink)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                isActive ? "bg-[var(--surface)]" : "bg-[var(--rule)]",
              )}
            />
            {CATEGORY_LABELS[cat]}
          </button>
        );
      })}
    </div>
  );
}
