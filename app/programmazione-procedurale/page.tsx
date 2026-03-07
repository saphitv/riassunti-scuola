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
  OperatoriBitSection,
  ModularizzazioneSection,
} from "@/components/sections/programmazione-procedurale";

export default function ProgrammazioneProceduralePage() {
  return (
    <div className="page page-compact">
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
      <OperatoriBitSection />
      <ModularizzazioneSection />
    </div>
  );
}
