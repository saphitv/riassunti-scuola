import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Programmazione a Oggetti | Appunti",
  description:
    "Appunti stampabili di Programmazione a Oggetti con Java generics, reflection, annotation, stream, Spring Boot e JPA.",
};

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
