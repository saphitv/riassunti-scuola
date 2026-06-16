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
  title: "Microcontrollori Test 1 P2 | Appunti",
  description:
    "Appunti stampabili di Microcontrollori Test 1 P2 con clock, interrupt, SPI, ADC e Output Compare/PWM.",
};

export default function MicrocontrolloriPart2Page() {
  return (
    <div className="page page-compact">
      <div className="no-print">
        <CourseHeader title="Microcontrollori — Test 1 P2" />
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
