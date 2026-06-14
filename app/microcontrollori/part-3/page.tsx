import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  ADCTest2Section,
  I2CCheatsheetSection,
  OutputCompareTest2Section,
  PMPCheatsheetSection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Microcontrollori Test 2 | Appunti",
  description:
    "Appunti stampabili di Microcontrollori Test 2 con PMP/LCD, ADC, Output Compare/PWM e I2C.",
};

export default function MicrocontrolloriPart3Page() {
  return (
    <div className="page page-compact">
      <div className="no-print">
        <CourseHeader title="Microcontrollori — Test 2" />
      </div>
      <PMPCheatsheetSection />
      <ADCTest2Section />
      <OutputCompareTest2Section />
      <I2CCheatsheetSection />
    </div>
  );
}
