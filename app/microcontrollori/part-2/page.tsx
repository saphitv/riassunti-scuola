import { CourseHeader } from "@/components/index";
import {
  ClockCheatsheetSection,
  DocumentationLinksSection,
  InterruptsCheatsheetSection,
} from "@/components/sections";

export default function MicrocontrolloriPart2Page() {
  return (
    <div className="page page-compact">
      <div className="no-print">
        <CourseHeader title="Microcontrollori — Parte II" />
      </div>
      <DocumentationLinksSection />
      <ClockCheatsheetSection />
      <InterruptsCheatsheetSection />
    </div>
  );
}
