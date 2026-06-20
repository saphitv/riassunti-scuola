import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  FondamentiProbabilitaSection,
  InferenzaSection,
  ModelliContinuiSection,
  ModelliDiscretiSection,
  ProbabilitaCondizionataSection,
  StatisticaDescrittivaSection,
  StrategiaEsameSection,
  VariabiliAleatorieSection,
} from "@/components/sections/probabilita-e-statistica";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export const metadata: Metadata = {
  title: "Probabilità e Statistica | Appunti",
  description:
    "Riassunto completo e stampabile di probabilità, variabili aleatorie, modelli, statistica descrittiva e inferenza.",
};

export default function ProbabilitaEStatisticaPage() {
  return (
    <div className="page page-compact">
      <CourseHeader
        title="Probabilità e Statistica"
        viewTransitionName={getCourseTitleTransitionName("probabilita-e-statistica")}
      />
      <FondamentiProbabilitaSection />
      <ProbabilitaCondizionataSection />
      <VariabiliAleatorieSection />
      <ModelliDiscretiSection />
      <ModelliContinuiSection />
      <StatisticaDescrittivaSection />
      <InferenzaSection />
      <StrategiaEsameSection />
    </div>
  );
}
