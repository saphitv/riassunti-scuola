import { CourseHeader } from "@/components";
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

export default function ProgrammazioneOggettiPage() {
  return (
    <div className="page page-compact">
      <CourseHeader title="Programmazione a Oggetti" />
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
