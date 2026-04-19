import { CourseHeader } from "@/components";
import {
  MicrocontrolloriSection,
  GPIOCheatsheetSection,
  UARTCheatsheetSection,
  TimersCheatsheetSection,
} from "@/components/sections";

export default function MicrocontrolloriPage() {
  return (
    <div className="page page-compact">
      <CourseHeader title="Microcontrollori" />
      <MicrocontrolloriSection />
      <GPIOCheatsheetSection />
      <UARTCheatsheetSection />
      <TimersCheatsheetSection />
    </div>
  );
}
