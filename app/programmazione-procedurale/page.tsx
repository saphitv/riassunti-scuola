import { CourseHeader } from "@/components/index";
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
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export default function ProgrammazioneProceduralePage() {
  return (
    <div className="page page-compact">
      <CourseHeader
        title="Programmazione Procedurale"
        viewTransitionName={getCourseTitleTransitionName("programmazione-procedurale")}
      />
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
