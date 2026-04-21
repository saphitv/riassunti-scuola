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
