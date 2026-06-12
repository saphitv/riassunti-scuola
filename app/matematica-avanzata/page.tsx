import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  AutovaloriAutospaziSection,
  DiagonalizzazioneSection,
  DeterminantiSection,
  MatriciVettoriSection,
} from "@/components/sections/matematica-avanzata";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export const metadata: Metadata = {
  title: "Matematica Avanzata | Appunti",
  description:
    "Riassunto stampabile di matematica avanzata con matrici, vettori, determinanti, traccia, autovalori, autovettori, autospazi e diagonalizzazione.",
};

export default function MatematicaAvanzataPage() {
  return (
    <div className="page">
      <CourseHeader
        title="Matematica Avanzata"
        viewTransitionName={getCourseTitleTransitionName("matematica-avanzata")}
      />

      <MatriciVettoriSection />
      <DeterminantiSection />
      <AutovaloriAutospaziSection />
      <DiagonalizzazioneSection />
    </div>
  );
}
