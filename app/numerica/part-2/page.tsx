import { CourseHeader } from "@/components/index";
import {
  AdattamentoCurveSection,
  InterpolazioneSection,
  SplineSection,
  IntegrazioneTrapeziSection,
} from "@/components/sections";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

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
