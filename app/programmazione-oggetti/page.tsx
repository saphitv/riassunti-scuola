import { CourseHeader } from "@/components/index";
import {
  GenericsSection,
  ReflectionSection,
  AnnotationsSection,
  NestedClassesSection,
  LambdaStreamsSection,
  OptionalSection,
  FunctionalProgrammingSection,
  RecordsSealedSection,
  SpringBootSection,
  HibernateJpaSection,
} from "@/components/sections";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export default function ProgrammazioneOggettiPage() {
  return (
    <div className="page page-compact">
      <CourseHeader
        title="Programmazione a Oggetti"
        viewTransitionName={getCourseTitleTransitionName("programmazione-oggetti")}
      />
      <GenericsSection />
      <ReflectionSection />
      <AnnotationsSection />
      <NestedClassesSection />
      <LambdaStreamsSection />
      <OptionalSection />
      <FunctionalProgrammingSection />
      <RecordsSealedSection />
      <SpringBootSection />
      <HibernateJpaSection />
    </div>
  );
}
