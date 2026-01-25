import { CourseHeader } from "@/components";
import {
  IncludesSection,
  MacroSection,
  FormattazioneSection,
  IoSection,
  MathSection,
  StringheSection,
  ConversioniSection,
  StructUnionSection,
  PuntatoriSection,
  StaticFunzioniSection,
  TempoSection,
  StruttureDatiSection,
} from "@/components/sections/programmazione-procedurale";

export default function ProgrammazioneProceduralePage() {
  return (
    <div className="page">
      <CourseHeader title="Programmazione Procedurale" />
      <IncludesSection />
      <MacroSection />
      <FormattazioneSection />
      <IoSection />
      <MathSection />
      <StringheSection />
      <ConversioniSection />
      <StructUnionSection />
      <PuntatoriSection />
      <StaticFunzioniSection />
      <TempoSection />
      <StruttureDatiSection />
    </div>
  );
}
