import { CourseHeader } from "@/components/index";
import { ZeriDiFunzioneSection, SistemiLineariSection } from "@/components/sections";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export default function NumericaPage() {
  return (
    <div className="page">
      <CourseHeader
        title="Numerica"
        viewTransitionName={getCourseTitleTransitionName("numerica")}
      />
      <ZeriDiFunzioneSection />
      <SistemiLineariSection />
    </div>
  );
}
