import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Programmazione Procedurale | Appunti",
  description:
    "Appunti stampabili di Programmazione Procedurale in C con include, macro, I/O, puntatori, strutture dati e modularizzazione.",
};

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
