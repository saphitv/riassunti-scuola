interface SpacerProps {
  size?: "sm" | "md" | "lg" | "xl";
}

export function Spacer({ size = "md" }: SpacerProps) {
  return <div className={`spacer spacer-${size}`} />;
}
