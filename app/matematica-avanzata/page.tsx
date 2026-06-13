import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  AutovaloriAutospaziSection,
  DiagonalizzazioneSection,
  DeterminantiSection,
  MatriciVettoriSection,
  RangoMatriciSection,
  SistemiEquazioniDifferenzialiSection,
  TrasformataLaplaceSection,
} from "@/components/sections/matematica-avanzata";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export const metadata: Metadata = {
  title: "Matematica Avanzata | Appunti",
  description:
    "Riassunto stampabile di matematica avanzata con matrici, vettori, determinanti, traccia, autovalori, autovettori, autospazi, diagonalizzazione, sistemi di equazioni differenziali e trasformata di Laplace.",
};

export default function MatematicaAvanzataPage() {
  return (
    <div className="page">
      <CourseHeader
        title="Matematica Avanzata"
        viewTransitionName={getCourseTitleTransitionName("matematica-avanzata")}
      />

      <MatriciVettoriSection />
      <RangoMatriciSection />
      <DeterminantiSection />
      <AutovaloriAutospaziSection />
      <DiagonalizzazioneSection />
      <SistemiEquazioniDifferenzialiSection />
      <TrasformataLaplaceSection />
    </div>
  );
}
