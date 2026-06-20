import { Section, Row, Column, Box, Math, MathBlock, Note } from "@/components/index";

export function StrategiaEsameSection() {
  return (
    <Section title="8. Strategia trasversale per gli esercizi" allowPageBreak>
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Prima del calcolo">
            <ol>
              <li>Definire evento o variabile, supporto, parametri e unità.</li>
              <li>Riconoscere il modello e verificarne le ipotesi.</li>
              <li>Tradurre “dato”, “almeno”, “al massimo”, “ogni”, “complessivamente”.</li>
              <li>Scrivere la formula simbolica, poi sostituire i numeri.</li>
            </ol>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Controlli finali">
            <ol>
              <li>Probabilità in <Math>{"[0,1]"}</Math> e densità normalizzata.</li>
              <li>Varianza non negativa e unità coerenti.</li>
              <li>Tassi convertiti sullo stesso intervallo.</li>
              <li>Arrotondamento nella direzione che garantisce la richiesta.</li>
              <li>Conclusione interpretata nel contesto.</li>
            </ol>
          </Box>
        </Column>
      </Row>

      <Box color="red" border="left" title="Distinzioni che evitano gli errori più comuni">
        <ul>
          <li><strong>Disgiunti ≠ indipendenti.</strong></li>
          <li><Math>{"P(A\\mid B)"}</Math> <strong>≠</strong> <Math>{"P(B\\mid A)"}</Math>.</li>
          <li>“Ogni giorno accade A”: <Math>{"P(A)^n"}</Math>; “in almeno k giorni”: conteggio binomiale.</li>
          <li>“Somma complessiva sotto s”: convoluzione o enumerazione, non una potenza.</li>
          <li>Senza reinserimento: ipergeometrica; la binomiale è solo un&apos;approssimazione.</li>
          <li>Per somme indipendenti si sommano le varianze, non le deviazioni standard.</li>
        </ul>
      </Box>

      <Box color="purple" border="left" title="Parametri da condizioni">
        <p>
          Se una densità contiene costanti ignote, combinare normalizzazione e
          momenti. Se una soglia è richiesta tramite una probabilità, scrivere la
          CDF o la coda e isolare il parametro, controllando dominio e verso delle disuguaglianze.
        </p>
        <MathBlock>{`\\int f(x)dx=1 \\qquad E[X^r]=\\int x^rf(x)dx`}</MathBlock>
      </Box>

      <Note>
        Non tutti i momenti esistono. Per una Pareto con densità
        <Math>{" f(x)=\\alpha\\beta^\\alpha/x^{\\alpha+1}"}</Math>,
        <Math>{" x\\ge\\beta"}</Math>, la media è finita solo se
        <Math>{" \\alpha>1"}</Math>; verificare l&apos;integrale prima di applicare
        formule basate su media o varianza.
      </Note>
    </Section>
  );
}
