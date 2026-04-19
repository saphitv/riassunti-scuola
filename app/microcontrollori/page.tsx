import { CourseHeader } from "@/components";
import {
  MicrocontrolloriSection,
  GPIOCheatsheetSection,
} from "@/components/sections";

export default function MicrocontrolloriPage() {
  return (
    <div className="page page-compact">
      <CourseHeader title="Microcontrollori" />
      <MicrocontrolloriSection />
      <GPIOCheatsheetSection />
    </div>
  );
}
