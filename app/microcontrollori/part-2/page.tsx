import { CourseHeader } from "@/components/index";
import {
  InterruptsCheatsheetSection,
  ADCCheatsheetSection,
  OutputCompareCheatsheetSection,
  SPICheatsheetSection,
} from "@/components/sections";

export default function MicrocontrolloriPart2Page() {
  return (
    <div className="page page-compact">
      <div className="no-print">
        <CourseHeader title="Microcontrollori — Parte II" />
      </div>
      <InterruptsCheatsheetSection />
      <ADCCheatsheetSection />
      <OutputCompareCheatsheetSection />
      <SPICheatsheetSection />
    </div>
  );
}
