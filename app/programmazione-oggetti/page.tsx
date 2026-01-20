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
} from "@/components/sections";

export default function ProgrammazioneOggettiPage() {
  return (
    <div className="page">
      <CourseHeader title="Programmazione a Oggetti" />
      <GenericsSection />
      <ReflectionSection />
      <AnnotationsSection />
      <NestedClassesSection />
      <LambdaStreamsSection />
      <OptionalSection />
      <FunctionalProgrammingSection />
      <RecordsSealedSection />
    </div>
  );
}
