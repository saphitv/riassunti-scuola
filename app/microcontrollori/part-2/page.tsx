import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  ADCCheatsheetSection,
  I2CCheatsheetSection,
  OutputCompareCheatsheetSection,
  PMPCheatsheetSection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Microcontrollori Parte II | Appunti",
  description:
    "Appunti stampabili di Microcontrollori Parte II con PMP, ADC, Output Compare/PWM e I2C.",
};

export default function MicrocontrolloriPart2Page() {
  return (
    <div className="page page-compact">
      <div className="no-print">
        <CourseHeader title="Microcontrollori — Parte II" />
      </div>
      <PMPCheatsheetSection />
      <ADCCheatsheetSection />
      <OutputCompareCheatsheetSection />
      <I2CCheatsheetSection />
    </div>
  );
}
