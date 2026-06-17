import {
  Box,
  Column,
  Example,
  Math,
  MathBlock,
  Note,
  Row,
  Section,
} from "@/components/index";

export function SistemiLTISection() {
  return (
    <Section title="Sistemi lineari tempo-invarianti (LTI)" allowPageBreak>
      <Row gap="sm">
        <Column width="half">
          <Box color="purple" border="left" title="Perche si usa Laplace">
            <p>
              Un sistema e LTI quando l&apos;equazione e lineare e i
              coefficienti non dipendono da <Math>{"t"}</Math>. Laplace
              trasforma le derivate in polinomi in <Math>{"s"}</Math>, quindi
              l&apos;equazione differenziale diventa algebrica.
            </p>
            <MathBlock gap="sm">
              {`\\mathcal{L}\\{y'\\}=sY(s)-y(0)
\\qquad
\\mathcal{L}\\{y''\\}=s^2Y(s)-sy(0)-y'(0)`}
            </MathBlock>
            <Note>
              Se ci sono condizioni iniziali non nulle, non usare direttamente{" "}
              <Math>{"G(s)=Y(s)/U(s)"}</Math>: trasforma tutta l&apos;equazione
              e porta dentro i dati iniziali.
            </Note>
          </Box>
        </Column>

        <Column width="half">
          <Box color="yellow" border="left" title="Procedura pratica">
            <ol>
              <li>
                Scrivi l&apos;equazione con <Math>{"y"}</Math> a sinistra e{" "}
                <Math>{"u"}</Math> a destra.
              </li>
              <li>
                Applica <Math>{"\\mathcal{L}"}</Math> a ogni termine.
              </li>
              <li>
                Sostituisci le formule delle derivate includendo i dati
                iniziali.
              </li>
              <li>
                Raggruppa tutti i termini con <Math>{"Y(s)"}</Math>.
              </li>
              <li>
                Isola <Math>{"Y(s)"}</Math>, scomponi in fratti semplici e fai{" "}
                <Math>{"\\mathcal{L}^{-1}"}</Math>.
              </li>
            </ol>
          </Box>
        </Column>
      </Row>

      <Row gap="sm">
        <Column width="half">
          <Box color="green" border="left" title="Funzione di trasferimento">
            <p>
              Con condizioni iniziali nulle puoi passare al rapporto
              ingresso-uscita:
            </p>
            <MathBlock gap="sm">
              {`G(s)=\\frac{Y(s)}{U(s)}`}
            </MathBlock>
            <p>
              Nei problemi di segnali spesso l&apos;ingresso si chiama{" "}
              <Math>{"x(t)"}</Math> e si scrive:
            </p>
            <MathBlock gap="sm">
              {`H(s)=\\frac{Y(s)}{X(s)}
\\qquad
Y(s)=H(s)X(s)`}
            </MathBlock>
            <p>Per esempio, se</p>
            <MathBlock gap="sm" size="small">
              {`y''+3y'+2y=u(t)`}
            </MathBlock>
            <p>allora, con dati iniziali nulli,</p>
            <MathBlock gap="sm" size="small">
              {`(s^2+3s+2)Y(s)=U(s)
\\qquad
G(s)=\\frac{1}{s^2+3s+2}`}
            </MathBlock>
            <Note>
              I poli sono gli zeri del denominatore di <Math>{"G(s)"}</Math>.
            </Note>
          </Box>
        </Column>

        <Column width="half">
          <Box color="gray" border="left" title="Se lo danno in forma di stato">
            <p>
              A volte il sistema e scritto con matrici. Con{" "}
              <Math>{"z(0)=0"}</Math>:
            </p>
            <MathBlock gap="sm" size="small">
              {`\\dot{z}=Az+Bu
\\qquad
y=Cz+Du`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`sZ(s)=AZ(s)+BU(s)
\\Rightarrow
Z(s)=(sI-A)^{-1}BU(s)`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`G(s)=C(sI-A)^{-1}B+D`}
            </MathBlock>
          </Box>

          <Box color="red" border="left" title="Errori da evitare">
            <ul>
              <li>
                Dimenticare <Math>{"-y(0)"}</Math>,{" "}
                <Math>{"-sy(0)-y'(0)"}</Math> nelle derivate.
              </li>
              <li>
                Usare <Math>{"G(s)"}</Math> anche quando i dati iniziali non
                sono nulli.
              </li>
              <li>
                Non trasformare l&apos;ingresso: per il gradino{" "}
                <Math>{"u(t)=1"}</Math> vale <Math>{"U(s)=1/s"}</Math>.
              </li>
              <li>
                Saltare il controllo finale su <Math>{"y(0)"}</Math> e{" "}
                <Math>{"y'(0)"}</Math>.
              </li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Example title="Esempio completo con Laplace" color="blue">
        <p>Risolvi il sistema LTI con ingresso gradino:</p>
        <MathBlock gap="sm">
          {`y''+3y'+2y=u(t)
\\qquad
u(t)=1
\\qquad
y(0)=1
\\qquad
y'(0)=0`}
        </MathBlock>
        <p>
          Siccome <Math>{"u(t)=1"}</Math>, allora{" "}
          <Math>{"U(s)=1/s"}</Math>. Trasforma l&apos;equazione:
        </p>
        <MathBlock gap="sm">
          {`\\bigl(s^2Y(s)-sy(0)-y'(0)\\bigr)
+3\\bigl(sY(s)-y(0)\\bigr)+2Y(s)=\\frac{1}{s}`}
        </MathBlock>
        <p>
          Sostituisci i dati iniziali e raggruppa i termini con{" "}
          <Math>{"Y(s)"}</Math>:
        </p>
        <MathBlock gap="sm">
          {`(s^2Y-s)+3(sY-1)+2Y=\\frac{1}{s}
\\Rightarrow
(s^2+3s+2)Y(s)-s-3=\\frac{1}{s}`}
        </MathBlock>
        <p>Isola <Math>{"Y(s)"}</Math>, fattorizza e scomponi:</p>
        <MathBlock gap="sm">
          {`Y(s)=\\frac{\\frac{1}{s}+s+3}{s^2+3s+2}
=\\frac{s^2+3s+1}{s(s+1)(s+2)}
=\\frac{1}{2}\\frac{1}{s}
+\\frac{1}{s+1}
-\\frac{1}{2}\\frac{1}{s+2}`}
        </MathBlock>
        <p>Antitrasforma termine per termine:</p>
        <MathBlock gap="sm">
          {`\\boxed{y(t)=\\frac12+e^{-t}-\\frac12e^{-2t}}`}
        </MathBlock>
        <Note>
          Controllo veloce: <Math>{"y(0)=\\frac12+1-\\frac12=1"}</Math> e{" "}
          <Math>{"y'(0)=-1+1=0"}</Math>, quindi i dati iniziali tornano.
        </Note>
      </Example>

      <Example title="Esempio con H(s) e x(t)" color="green">
        <Row gap="sm">
          <Column width="half">
            <p>
              Il sistema e dato dalla funzione di trasferimento e
              dall&apos;ingresso:
            </p>
            <MathBlock gap="sm">
              {`H(s)=\\frac{2}{s+3}
\\qquad
x(t)=e^{-t}`}
            </MathBlock>
            <p>
              Con condizioni iniziali nulle, prima trasformi l&apos;ingresso:
            </p>
            <MathBlock gap="sm">
              {`X(s)=\\mathcal{L}\\{e^{-t}\\}=\\frac{1}{s+1}`}
            </MathBlock>
          </Column>

          <Column width="half">
            <p>Moltiplica nel dominio di Laplace:</p>
            <MathBlock gap="sm">
              {`Y(s)=H(s)X(s)
=\\frac{2}{(s+3)(s+1)}`}
            </MathBlock>
            <p>Scomponi e antitrasforma:</p>
            <MathBlock gap="sm">
              {`\\frac{2}{(s+1)(s+3)}
=\\frac{1}{s+1}-\\frac{1}{s+3}
\\Rightarrow
\\boxed{y(t)=e^{-t}-e^{-3t}}`}
            </MathBlock>
          </Column>
        </Row>
      </Example>

    </Section>
  );
}
