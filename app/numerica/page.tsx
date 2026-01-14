import { CourseHeader } from "@/components";
import { ZeriDiFunzioneSection, SistemiLineariSection } from "@/components/sections";

export default function NumericaPage() {
  return (
    <div className="page">
      <CourseHeader title="Numerica" />
      <ZeriDiFunzioneSection />
      <SistemiLineariSection />
    </div>
  );
}
