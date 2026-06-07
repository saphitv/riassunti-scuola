import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  FondamentiProbabilitaSection,
  ProbabilitaCondizionataSection,
} from "@/components/sections/probabilita-e-statistica";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export const metadata: Metadata = {
  title: "Probabilita e Statistica | Appunti",
  description:
    "Riassunto stampabile di Probabilita e Statistica con fondamenti e probabilita condizionata.",
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
    </div>
  );
}
