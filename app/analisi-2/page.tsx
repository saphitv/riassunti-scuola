import { CourseHeader } from "@/components";
import {
  IntegraliSection,
  CurveParametricheSection,
  SolidiRotazioneSection,
  EquazioniDifferenzialiSection,
  FormeNotevoliSection,
  FunzioniPiuVariabiliSection,
} from "@/components/sections/analisi-2";

export default function Analisi2Page() {
  return (
    <div className="page">
      <CourseHeader title="Analisi 2" />

      <IntegraliSection />
      <CurveParametricheSection />
      <SolidiRotazioneSection />
      <FormeNotevoliSection />

      <EquazioniDifferenzialiSection />

      <FunzioniPiuVariabiliSection />
    </div>
  );
}
