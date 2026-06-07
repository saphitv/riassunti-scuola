import type { Metadata } from "next";
import { CourseHeader } from "@/components/index";
import { ZeriDiFunzioneSection, SistemiLineariSection } from "@/components/sections";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export const metadata: Metadata = {
  title: "Numerica Semestre III | Appunti",
  description:
    "Riassunto stampabile di Calcolo Numerico per zeri di funzione e sistemi lineari.",
};

export default function NumericaPage() {
  return (
    <div className="page">
      <CourseHeader
        title="Numerica — Semestre III"
        viewTransitionName={getCourseTitleTransitionName("numerica")}
      />
      <ZeriDiFunzioneSection />
      <SistemiLineariSection />
    </div>
  );
}
