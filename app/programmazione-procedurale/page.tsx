import { CourseHeader } from "@/components";
import {
  IncludesSection,
  FormattazioneSection,
  IoSection,
  MathSection,
  StringheSection,
  ConversioniSection,
  StructUnionSection,
  PuntatoriSection,
  StaticFunzioniSection,
  TempoSection,
} from "@/components/sections/programmazione-procedurale";

export default function ProgrammazioneProceduralePage() {
  return (
    <div className="page">
      <CourseHeader title="Programmazione Procedurale" />
      <IncludesSection />
      <FormattazioneSection />
      <IoSection />
      <MathSection />
      <StringheSection />
      <ConversioniSection />
      <StructUnionSection />
      <PuntatoriSection />
      <StaticFunzioniSection />
      <TempoSection />
    </div>
  );
}
