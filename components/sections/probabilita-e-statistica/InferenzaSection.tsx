import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
  Example,
} from "@/components/index";

export function InferenzaSection() {
  return (
    <Section title="7. Stima, grandi numeri e limite centrale" allowPageBreak>
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Metodo dei momenti">
            <p>Si uguagliano momenti teorici e momenti empirici:</p>
            <MathBlock>
              {`\\mu_k=E[X^k] \\qquad \\widehat\\mu_{k,n}=\\frac1n\\sum_{i=1}^nX_i^k`}
            </MathBlock>
            <p>In particolare <Math>{"\\widehat\\mu=\\bar X"}</Math>.</p>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Legge dei grandi numeri">
            <p>Per variabili i.i.d. con media finita:</p>
            <MathBlock>{`P(|\\bar X_n-\\mu|<\\varepsilon)\\to1`}</MathBlock>
            <p>La media campionaria converge in probabilità alla media vera.</p>
          </Box>
        </Column>
      </Row>

      <Box color="purple" border="left" title="Teorema del limite centrale">
        <p>
          Per variabili i.i.d. con media <Math>{"\\mu"}</Math> e varianza finita
          <Math>{" \\sigma^2"}</Math>:
        </p>
        <MathBlock>
          {`Z_n=\\frac{S_n-n\\mu}{\\sigma\\sqrt n}=\\frac{\\bar X_n-\\mu}{\\sigma/\\sqrt n}\\xrightarrow{d}N(0,1)`}
        </MathBlock>
        <MathBlock>{`\\bar X_n\\approx N\\!\\left(\\mu,\\frac{\\sigma^2}{n}\\right)`}</MathBlock>
        <p>
          La legge dei grandi numeri dice dove converge la media; il TLC descrive
          approssimativamente la distribuzione del suo errore.
        </p>
      </Box>

      <Box color="yellow" border="left" title="Intervallo per una media">
        <p>Con deviazione standard della popolazione nota (o campione grande):</p>
        <MathBlock>
          {`IC_{1-\\alpha}:\\quad \\bar X\\pm z_{1-\\alpha/2}\\frac{\\sigma}{\\sqrt n}`}
        </MathBlock>
        <p>
          Quantili: 1.64 (90%), 1.96 (95%), 2.58 (99%). Il margine
          <Math>{" E=z\\sigma/\\sqrt n"}</Math> diminuisce come
          <Math>{" 1/\\sqrt n"}</Math>; per progettare il campione:
        </p>
        <MathBlock>{`n\\ge\\left(\\frac{z_{1-\\alpha/2}\\sigma}{E}\\right)^2`}</MathBlock>
      </Box>

      <Row>
        <Column width="half">
          <Box color="gray" border="left" title="Intervallo per una proporzione">
            <MathBlock>
              {`\\hat p\\pm z_{1-\\alpha/2}\\sqrt{\\frac{\\hat p(1-\\hat p)}n}`}
            </MathBlock>
            <p>
              Verificare che <Math>{"n\\hat p"}</Math> e
              <Math>{" n(1-\\hat p)"}</Math> non siano piccoli. Se
              <Math>{" p"}</Math> è ignota, per margine massimo
              <Math>{" E"}</Math> usare il caso conservativo:
            </p>
            <MathBlock>{`n\\ge\\frac{z_{1-\\alpha/2}^2}{4E^2}`}</MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Example title="Intervalli per momenti trasformati" color="blue">
            <p>
              Per stimare <Math>{"E[X^2]"}</Math>, porre
              <Math>{" Y=X^2"}</Math>. Allora la stima è
              <Math>{" m_2"}</Math> e la varianza stimata di
              <Math>{" Y"}</Math> è <Math>{"m_4-m_2^2"}</Math>:
            </p>
            <MathBlock>
              {`m_2\\pm z_{1-\\alpha/2}\\sqrt{\\frac{m_4-m_2^2}{n}}`}
            </MathBlock>
          </Example>
        </Column>
      </Row>

      <Note>
        Interpretazione frequentista: il parametro è fisso; è il metodo che, su
        campioni ripetuti, produce una frazione <Math>{"1-\\alpha"}</Math> di
        intervalli contenenti il parametro. Con <Math>{"\\sigma"}</Math> ignota e
        campione piccolo serve la distribuzione t di Student, non trattata nelle slide.
      </Note>
    </Section>
  );
}
