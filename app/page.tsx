import {
  IntegraliSection,
  CurveParametricheSection,
  SolidiRotazioneSection,
  EquazioniDifferenzialiSection,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="page">
      <header className="header">
        <h1>Analisi 2</h1>
      </header>

      <IntegraliSection />
      <CurveParametricheSection />
      <SolidiRotazioneSection />
      <EquazioniDifferenzialiSection />
    </div>
  );
}
