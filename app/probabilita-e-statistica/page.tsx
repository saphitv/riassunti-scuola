import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  EserciziSimulazioniSection,
  FondamentiProbabilitaSection,
  ProbabilitaCondizionataSection,
} from "@/components/sections/probabilita-e-statistica";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export const metadata: Metadata = {
  title: "Probabilita e Statistica | Appunti",
  description:
    "Riassunto stampabile di Probabilita e Statistica con richiami, strategie ed esercizi risolti.",
};

export default function ProbabilitaEStatisticaPage() {
  return (
    <div className="page">
      <CourseHeader
        title="Probabilita e Statistica"
        viewTransitionName={getCourseTitleTransitionName("probabilita-e-statistica")}
      />
      <FondamentiProbabilitaSection />
      <ProbabilitaCondizionataSection />
      <EserciziSimulazioniSection />
    </div>
  );
}
