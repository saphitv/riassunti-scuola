import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  MicrocontrolloriSection,
  GPIOCheatsheetSection,
  UARTCheatsheetSection,
  TimersCheatsheetSection,
  DocumentationIndexSection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Microcontrollori Parte I | Appunti",
  description:
    "Appunti stampabili di Microcontrollori Parte I con GPIO, UART, timer e riferimenti alla documentazione.",
};

export default function MicrocontrolloriPage() {
  return (
    <div className="page page-compact">
      <div className="no-print">
        <CourseHeader title="Microcontrollori — Parte I" />
      </div>
      <MicrocontrolloriSection />
      <GPIOCheatsheetSection />
      <UARTCheatsheetSection />
      <TimersCheatsheetSection />
      <DocumentationIndexSection />
    </div>
  );
}
