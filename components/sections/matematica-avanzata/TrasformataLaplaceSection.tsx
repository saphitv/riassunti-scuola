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
      <Row gap="sm">
        <Column width="half">
            <p>
              La trasformata di Laplace porta una funzione nel tempo in una
              funzione nella variabile <Math>{"s"}</Math>. E utile per
              trasformare equazioni differenziali con condizioni iniziali in
              equazioni algebriche.
            </p>
            <MathBlock gap="sm">
              {`\\mathcal{L}\\{f(t)\\}=F(s)=\\int_0^{+\\infty} e^{-st}f(t)\\,dt`}
            </MathBlock>
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

      <Box color="blue" border="left" title="Regole operative">
        <p>
          La trasformata e lineare, quindi si distribuisce su somme e costanti:
        </p>
        <MathBlock gap="sm">
          {`\\mathcal{L}\\{af(t)+bg(t)\\}=aF(s)+bG(s)`}
        </MathBlock>
        <p>Per le derivate compaiono le condizioni iniziali:</p>
        <MathBlock gap="sm" size="small">
          {`\\mathcal{L}\\{y'\\}=sY(s)-y(0)
\\qquad
\\mathcal{L}\\{y''\\}=s^2Y(s)-sy(0)-y'(0)`}
        </MathBlock>
        <MathBlock gap="sm" size="small">
          {`\\mathcal{L}\\{y^{(n)}\\}
=s^nY(s)-s^{n-1}y(0)-s^{n-2}y'(0)-\\cdots-y^{(n-1)}(0)`}
        </MathBlock>
      </Box>

      <Box color="purple" border="left" title="Forme del denominatore">
        <p>
          Scegli la forma in base ai fattori del denominatore, poi moltiplica
          per il denominatore comune e trova le costanti.
        </p>
        <Row gap="sm">
          <Column width="half">
            <MathBlock gap="sm">
              {`\\frac{P(s)}{(s-a)(s-b)}
=\\frac{A}{s-a}+\\frac{B}{s-b}`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`\\frac{P(s)}{(s-a)^k}
=\\frac{A_1}{s-a}+\\frac{A_2}{(s-a)^2}+\\cdots+\\frac{A_k}{(s-a)^k}`}
            </MathBlock>
          </Column>
          <Column width="half">
            <MathBlock gap="sm">
              {`\\frac{P(s)}{s^2+ps+q}
=\\frac{Bs+C}{s^2+ps+q}`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`\\frac{P(s)}{(s^2+ps+q)(s-a)^2}
=\\frac{Bs+C}{s^2+ps+q}+\\frac{D}{s-a}+\\frac{E}{(s-a)^2}`}
            </MathBlock>
            <Note>
              Se compare un quadratico tipo <Math>{"s^2+ps+q"}</Math>, completa
              il quadrato quando serve per ottenere seno, coseno o traslazioni
              esponenziali.
            </Note>
          </Column>
        </Row>
      </Box>

      <Example title="Esempio con fattori misti" color="blue">
        <Row gap="sm">
          <Column width="half">
            <p>Parti dalla forma corretta dei termini:</p>
            <MathBlock gap="sm" size="small">
              {`\\frac{6}{(s^2+4)(s-2)^2}
=\\frac{As+B}{s^2+4}+\\frac{C}{s-2}+\\frac{D}{(s-2)^2}`}
            </MathBlock>
            <p>Moltiplica per il denominatore comune:</p>
            <MathBlock gap="sm" size="small">
              {`6=(As+B)(s-2)^2+C(s^2+4)(s-2)+D(s^2+4)`}
            </MathBlock>
            <p>Confronta i coefficienti delle potenze di <Math>{"s"}</Math>:</p>
            <MathBlock gap="sm" size="small">
              {`\\begin{cases}
A+C=0\\\\
-4A+B-2C+D=0\\\\
4A-4B+4C=0\\\\
4B-8C+4D=6
\\end{cases}
\\Rightarrow
A=\\frac38,\\ B=0,\\ C=-\\frac38,\\ D=\\frac34`}
            </MathBlock>
          </Column>

          <Column width="half">
            <p>Riscrivi in termini riconoscibili:</p>
            <MathBlock gap="sm" size="small">
              {`\\frac{6}{(s^2+4)(s-2)^2}
=\\frac{3}{8}\\frac{s}{s^2+4}
-\\frac{3}{8}\\frac{1}{s-2}
+\\frac{3}{4}\\frac{1}{(s-2)^2}`}
            </MathBlock>
            <p>Ora ogni pezzo ha una trasformata inversa nota:</p>
            <MathBlock gap="sm" size="small">
              {`\\mathcal{L}^{-1}\\left\\{\\frac{s}{s^2+a^2}\\right\\}=\\cos(at)
\\qquad
\\mathcal{L}^{-1}\\left\\{\\frac{1}{(s-a)^2}\\right\\}=te^{at}`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\mathcal{L}^{-1}\\left\\{\\frac{6}{(s^2+4)(s-2)^2}\\right\\}
=\\frac38\\cos(2t)-\\frac38e^{2t}+\\frac34te^{2t}`}
            </MathBlock>
          </Column>
        </Row>
      </Example>

      <Example title="Esercizio completo con Laplace" color="green">
        <Row gap="sm">
          <Column width="half">
            <p>Risolvi il problema di Cauchy:</p>
            <MathBlock gap="sm">
              {`y''-4y'+4y=0
\\qquad
y(0)=1
\\qquad
y'(0)=1`}
            </MathBlock>
            <p>
              Poni <Math>{"\\mathcal{L}\\{y(t)\\}=Y(s)"}</Math> e trasforma
              ogni termine:
            </p>
            <MathBlock gap="sm" size="small">
              {`\\mathcal{L}\\{y''\\}=s^2Y(s)-sy(0)-y'(0)=s^2Y(s)-s-1
\\qquad
\\mathcal{L}\\{y'\\}=sY(s)-y(0)=sY(s)-1`}
            </MathBlock>
            <p>Sostituisci nell&apos;equazione:</p>
            <MathBlock gap="sm" size="small">
              {`(s^2Y-s-1)-4(sY-1)+4Y=0`}
            </MathBlock>
          </Column>

          <Column width="half">
            <p>Raggruppa i termini con <Math>{"Y(s)"}</Math>:</p>
            <MathBlock gap="sm" size="small">
              {`(s^2-4s+4)Y(s)-s-1+4=0
\\Rightarrow
(s-2)^2Y(s)-s+3=0`}
            </MathBlock>
            <p>Isola <Math>{"Y(s)"}</Math> e prepara l&apos;antitrasformata:</p>
            <MathBlock gap="sm" size="small">
              {`Y(s)=\\frac{s-3}{(s-2)^2}
=\\frac{(s-2)-1}{(s-2)^2}
=\\frac{1}{s-2}-\\frac{1}{(s-2)^2}`}
            </MathBlock>
            <p>Usa la tabella inversa:</p>
            <MathBlock gap="sm" size="small">
              {`\\mathcal{L}^{-1}\\left\\{\\frac{1}{s-a}\\right\\}=e^{at}
\\qquad
\\mathcal{L}^{-1}\\left\\{\\frac{1}{(s-a)^2}\\right\\}=te^{at}`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\boxed{y(t)=e^{2t}-te^{2t}=(1-t)e^{2t}}`}
            </MathBlock>
          </Column>
        </Row>
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
