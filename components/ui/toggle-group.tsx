"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal accessible single-select toggle group.
 *
 * Uses a native <fieldset> + hidden <input type="radio"> under each <label>
 * for correct arrow-key navigation and screen-reader semantics out of the box.
 * Styled to match the scholarly/catalog aesthetic — no Radix dependency.
 */

interface ToggleGroupProps<T extends string> {
  name: string;
  value: T;
  onValueChange: (value: T) => void;
  options: { value: T; label: string }[];
  label?: string;
  className?: string;
}

export function ToggleGroup<T extends string>({
  name,
  value,
  onValueChange,
  options,
  label,
  className,
}: ToggleGroupProps<T>) {
  return (
    <fieldset
      className={cn(
        "inline-flex items-stretch border border-[var(--rule)]",
        className,
      )}
    >
      {label && <legend className="sr-only">{label}</legend>}
      {options.map((opt, i) => {
        const id = `${name}-${opt.value}`;
        const isActive = value === opt.value;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={cn(
              "relative cursor-pointer select-none",
              "px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] leading-none",
              "transition-colors",
              i > 0 && "border-l border-[var(--rule)]",
              isActive
                ? "bg-[var(--ink)] text-[var(--surface)]"
                : "text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-muted)]",
              "focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-[var(--accent)]",
            )}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={opt.value}
              checked={isActive}
              onChange={() => onValueChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        );
      })}
    </fieldset>
  );
}
