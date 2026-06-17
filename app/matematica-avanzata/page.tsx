import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  AutovaloriAutospaziSection,
  DerivateEssenzialiSection,
  DiagonalizzazioneSection,
  MatriciVettoriSection,
  SistemiEquazioniDifferenzialiSection,
  SistemiLTISection,
  TrasformataFourierSection,
  TrasformataLaplaceSection,
} from "@/components/sections/matematica-avanzata";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export const metadata: Metadata = {
  title: "Matematica Avanzata | Appunti",
  description:
    "Riassunto stampabile di matematica avanzata con matrici, vettori, autovalori, diagonalizzazione, sistemi di equazioni differenziali, sistemi LTI, trasformata di Laplace, trasformata di Fourier e Parseval.",
};

export default function MatematicaAvanzataPage() {
  const compact = true
  return (
    <div className={`page ${compact ? "page-compact" : ""}`}> 
      <CourseHeader
        title="Matematica Avanzata"
        viewTransitionName={getCourseTitleTransitionName("matematica-avanzata")}
      />

      <MatriciVettoriSection />
      <DerivateEssenzialiSection />
      <AutovaloriAutospaziSection />
      <DiagonalizzazioneSection />
      <SistemiEquazioniDifferenzialiSection />
      <SistemiLTISection />
      <TrasformataLaplaceSection />
      <TrasformataFourierSection />
    </div>
  );
}
