interface DividerProps {
  style?: "solid" | "dashed" | "dotted" | "double";
  spacing?: "sm" | "md" | "lg";
}

export function Divider({ style = "solid", spacing = "md" }: DividerProps) {
  return <hr className={`divider divider-${style} divider-spacing-${spacing}`} />;
}
