"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="group relative block">
      <span className="sr-only">Cerca un riassunto</span>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--ink-muted)] transition-colors group-focus-within:text-[var(--accent)]"
      />
      <Input
        type="search"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="cerca un argomento, una definizione, un concetto…"
        className="pl-8 font-serif"
      />
    </label>
  );
}
