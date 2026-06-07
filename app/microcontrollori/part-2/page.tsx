import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  ADCCheatsheetSection,
  ClockCheatsheetSection,
  DocumentationLinksSection,
  InterruptsCheatsheetSection,
  OutputCompareCheatsheetSection,
  SPICheatsheetSection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Microcontrollori Parte II | Appunti",
  description:
    "Appunti stampabili di Microcontrollori Parte II con clock, interrupt e collegamenti alla documentazione.",
};

export default function MicrocontrolloriPart2Page() {
  return (
    <div className="page page-compact">
      <div className="no-print">
        <CourseHeader title="Microcontrollori — Parte II" />
      </div>
      <DocumentationLinksSection />
      <ClockCheatsheetSection />
      <InterruptsCheatsheetSection />
      <SPICheatsheetSection />
      <ADCCheatsheetSection />
      <OutputCompareCheatsheetSection />
    </div>
  );
}
