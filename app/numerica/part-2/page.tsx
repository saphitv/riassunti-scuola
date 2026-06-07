import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import {
  AdattamentoCurveSection,
  InterpolazioneSection,
  SplineSection,
  IntegrazioneTrapeziSection,
} from "@/components/sections";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export const metadata: Metadata = {
  title: "Numerica Semestre IV | Appunti",
  description:
    "Riassunto stampabile di Calcolo Numerico con adattamento di curve, interpolazione, spline e integrazione.",
};

export default function NumericaPart2Page() {
  return (
    <div className="page page-compact">
      <CourseHeader
        title="Numerica — Semestre IV"
        viewTransitionName={getCourseTitleTransitionName("numerica")}
      />
      <AdattamentoCurveSection />
      <InterpolazioneSection />
      <SplineSection />
      <IntegrazioneTrapeziSection />
    </div>
  );
}
