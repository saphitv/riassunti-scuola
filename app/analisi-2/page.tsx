import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  IntegraliSection,
  CurveParametricheSection,
  SolidiRotazioneSection,
  EquazioniDifferenzialiSection,
  FormeNotevoliSection,
  FunzioniPiuVariabiliSection,
} from "@/components/sections/analisi-2";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export const metadata: Metadata = {
  title: "Analisi 2 | Appunti",
  description:
    "Riassunto stampabile di Analisi 2 con integrali, curve, solidi, equazioni differenziali e funzioni a piu variabili.",
};

export default function Analisi2Page() {
  return (
    <div className="page">
      <CourseHeader
        title="Analisi 2"
        viewTransitionName={getCourseTitleTransitionName("analisi-2")}
      />

      <IntegraliSection />
      <CurveParametricheSection />
      <SolidiRotazioneSection />
      <FormeNotevoliSection />

      <EquazioniDifferenzialiSection />

      <FunzioniPiuVariabiliSection />
    </div>
  );
}
