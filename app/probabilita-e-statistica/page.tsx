import { CourseHeader } from "@/components";
import {
  FondamentiProbabilitaSection,
  ProbabilitaCondizionataSection,
} from "@/components/sections/probabilita-e-statistica";

export default function ProbabilitaEStatisticaPage() {
  return (
    <div className="page">
      <CourseHeader title="Probabilita e Statistica" />
      <FondamentiProbabilitaSection />
      <ProbabilitaCondizionataSection />
    </div>
  );
}
