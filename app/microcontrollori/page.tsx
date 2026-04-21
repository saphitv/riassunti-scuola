import { CourseHeader } from "@/components/index";
import {
  MicrocontrolloriSection,
  GPIOCheatsheetSection,
  UARTCheatsheetSection,
  TimersCheatsheetSection,
  DocumentationIndexSection,
} from "@/components/sections";

export default function MicrocontrolloriPage() {
  return (
    <div className="page page-compact">
      <div className="no-print">
        <CourseHeader title="Microcontrollori" />
      </div>
      <MicrocontrolloriSection />
      <GPIOCheatsheetSection />
      <UARTCheatsheetSection />
      <TimersCheatsheetSection />
      <DocumentationIndexSection />
    </div>
  );
}
