"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Two-state theme toggle (light ↔ dark).
 *
 * Both icons are rendered; CSS in globals.css (`.theme-icon-sun` /
 * `.theme-icon-moon`) reveals the active one based on the `.dark` class
 * on <html>. This avoids a React mount-flag / effect and therefore a
 * hydration mismatch.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="icon"
      size="icon"
      onClick={toggle}
      aria-label="Cambia tema giorno / notte"
      title="Cambia tema"
      suppressHydrationWarning
      className="theme-toggle"
    >
      <Sun className="theme-icon-sun" aria-hidden />
      <Moon className="theme-icon-moon" aria-hidden />
    </Button>
  );
}
