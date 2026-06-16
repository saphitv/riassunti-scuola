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
  title: "Microcontrollori Test 1 P1 | Appunti",
  description:
    "Appunti stampabili di Microcontrollori Test 1 P1 con GPIO, UART, timer e riferimenti alla documentazione.",
};

export default function MicrocontrolloriPage() {
  return (
    <div className="page page-compact">
      <div className="no-print">
        <CourseHeader title="Microcontrollori — Test 1 P1" />
      </div>
      <MicrocontrolloriSection />
      <GPIOCheatsheetSection />
      <UARTCheatsheetSection />
      <TimersCheatsheetSection />
      <DocumentationIndexSection />
    </div>
  );
}
