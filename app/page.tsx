import {
  IntegraliSection,
  CurveParametricheSection,
  SolidiRotazioneSection,
  EquazioniDifferenzialiSection,
  FormeNotevoliSection,
  FunzioniPiuVariabiliSection,
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
      <FormeNotevoliSection />

      <EquazioniDifferenzialiSection />

      <FunzioniPiuVariabiliSection />
    </div>
  );
}
