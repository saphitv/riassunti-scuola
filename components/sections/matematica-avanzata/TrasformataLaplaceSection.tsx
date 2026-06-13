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

export function TrasformataLaplaceSection() {
  return (
    <Section title="Trasformata di Laplace" allowPageBreak>
      <p>
        La trasformata di Laplace porta una funzione nel tempo in una funzione
        nella variabile <Math>{"s"}</Math>. E utile per trasformare equazioni
        differenziali con condizioni iniziali in equazioni algebriche.
      </p>

      <MathBlock>
        {`\\mathcal{L}\\{f(t)\\}=F(s)=\\int_0^{+\\infty} e^{-st}f(t)\\,dt`}
      </MathBlock>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Regole operative">
            <p>
              La trasformata e lineare, quindi si distribuisce su somme e
              costanti:
            </p>
            <MathBlock>
              {`\\mathcal{L}\\{af(t)+bg(t)\\}=aF(s)+bG(s)`}
            </MathBlock>
            <p>Per le derivate compaiono le condizioni iniziali:</p>
            <MathBlock>
              {`\\mathcal{L}\\{y'\\}=sY(s)-y(0)
\\qquad
\\mathcal{L}\\{y''\\}=s^2Y(s)-sy(0)-y'(0)`}
            </MathBlock>
            <MathBlock>
              {`\\mathcal{L}\\{y^{(n)}\\}
=s^nY(s)-s^{n-1}y(0)-s^{n-2}y'(0)-\\cdots-y^{(n-1)}(0)`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Procedura per EDO">
            <ol>
              <li>
                Applica <Math>{"\\mathcal{L}"}</Math> a entrambi i membri
                dell&apos;equazione.
              </li>
              <li>
                Sostituisci le derivate con le formule in funzione di{" "}
                <Math>{"Y(s)"}</Math> e dei dati iniziali.
              </li>
              <li>
                Isola <Math>{"Y(s)"}</Math>.
              </li>
              <li>
                Scomponi <Math>{"Y(s)"}</Math> in termini semplici.
              </li>
              <li>
                Applica <Math>{"\\mathcal{L}^{-1}"}</Math> usando la tabella
                delle trasformate note.
              </li>
            </ol>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="green" border="left" title="Scomposizione in fratti semplici">
            <p>
              Quando <Math>{"Y(s)"}</Math> e razionale, prima fattorizza il
              denominatore. Se il grado del numeratore e maggiore o uguale al
              grado del denominatore, fai prima la divisione tra polinomi.
            </p>
            <MathBlock>
              {`Y(s)=\\frac{P(s)}{Q(s)}
\\qquad
Q(s)=(s-a)(s-b)
\\qquad
Y(s)=\\frac{A}{s-a}+\\frac{B}{s-b}`}
            </MathBlock>
            <p>
              Per trovare <Math>{"A"}</Math> e <Math>{"B"}</Math>, moltiplica
              per il denominatore comune e poi sostituisci i valori che
              annullano i fattori:
            </p>
            <MathBlock>
              {`P(s)=A(s-b)+B(s-a)
\\qquad
s=a \\Rightarrow A=\\frac{P(a)}{a-b}
\\qquad
s=b \\Rightarrow B=\\frac{P(b)}{b-a}`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Forme del denominatore">
            <p>Adatta i termini al tipo di fattore nel denominatore:</p>
            <MathBlock>
              {`\\frac{P(s)}{(s-a)(s-b)}
=\\frac{A}{s-a}+\\frac{B}{s-b}`}
            </MathBlock>
            <MathBlock>
              {`\\frac{P(s)}{(s-a)^k}
=\\frac{A_1}{s-a}+\\frac{A_2}{(s-a)^2}+\\cdots+\\frac{A_k}{(s-a)^k}`}
            </MathBlock>
            <MathBlock>
              {`\\frac{P(s)}{s^2+ps+q}
=\\frac{Bs+C}{s^2+ps+q}`}
            </MathBlock>
            <Note>
              Dopo la scomposizione ogni addendo deve corrispondere a una forma
              leggibile nella tabella delle trasformate inverse.
            </Note>
          </Box>
        </Column>
      </Row>

      <Example title="Esempio di scomposizione" color="green">
        <p>Scomponi la funzione razionale:</p>
        <MathBlock>
          {`Y(s)=\\frac{3s+5}{(s+1)(s+2)}
=\\frac{A}{s+1}+\\frac{B}{s+2}`}
        </MathBlock>
        <p>Moltiplico per il denominatore comune:</p>
        <MathBlock>{`3s+5=A(s+2)+B(s+1)`}</MathBlock>
        <p>
          Sostituendo <Math>{"s=-1"}</Math> e <Math>{"s=-2"}</Math>:
        </p>
        <MathBlock>
          {`s=-1:\\quad 2=A
\\qquad
s=-2:\\quad -1=-B \\Rightarrow B=1`}
        </MathBlock>
        <MathBlock>
          {`\\frac{3s+5}{(s+1)(s+2)}
=\\frac{2}{s+1}+\\frac{1}{s+2}`}
        </MathBlock>
      </Example>

      <Box color="red" border="left" title="Errori comuni">
        <ul>
          <li>
            Non dimenticare i dati iniziali nelle trasformate delle derivate.
          </li>
          <li>
            Prima di scomporre, controlla che la frazione sia propria:{" "}
            <Math>{"\\deg P < \\deg Q"}</Math>.
          </li>
          <li>
            Per fattori ripetuti servono tutti i termini fino alla potenza
            massima, non solo <Math>{"A/(s-a)"}</Math>.
          </li>
        </ul>
      </Box>
    </Section>
  );
}
