"use client";

import { ToggleGroup } from "@/components/ui/toggle-group";

export type SemesterFilterValue = "all" | "3" | "4";

interface SemesterFilterProps {
  value: SemesterFilterValue;
  onChange: (value: SemesterFilterValue) => void;
}

const options: { value: SemesterFilterValue; label: string }[] = [
  { value: "all", label: "Tutti" },
  { value: "3", label: "III" },
  { value: "4", label: "IV" },
];

export function SemesterFilter({ value, onChange }: SemesterFilterProps) {
  return (
    <ToggleGroup
      name="semester"
      label="Semestre"
      value={value}
      onValueChange={onChange}
      options={options}
    />
  );
}
