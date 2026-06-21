import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
} from "@/components/index";

export function ModelliContinuiSection() {
  return (
    <Section title="5. Modelli continui" allowPageBreak>
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Uniforme">
            <p><Math>{"X\\sim U([a,b])"}</Math>: stessa densità in tutto l&apos;intervallo.</p>
            <MathBlock>{`f(x)=\\frac1{b-a},\\ a\\le x\\le b`}</MathBlock>
            <MathBlock>{`E[X]=\\frac{a+b}{2} \\qquad Var(X)=\\frac{(b-a)^2}{12}`}</MathBlock>
            <MathBlock>{`P(c\\le X\\le d)=\\frac{d-c}{b-a},\\quad a\\le c\\le d\\le b`}</MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Esponenziale">
            <p><Math>{"X\\sim Exp(\\lambda)"}</Math>, <Math>{"x\\ge0"}</Math>: tempo d&apos;attesa fra eventi Poisson.</p>
            <MathBlock>{`f(x)=\\lambda e^{-\\lambda x},\\quad F(x)=1-e^{-\\lambda x}`}</MathBlock>
            <MathBlock>{`E[X]=\\frac1\\lambda \\qquad Var(X)=\\frac1{\\lambda^2}`}</MathBlock>
            <MathBlock>{`P(X>s+t\\mid X>s)=P(X>t)`}</MathBlock>
          </Box>
        </Column>
      </Row>

      <Box color="purple" border="left" title="Normale e standardizzazione">
        <p>
          <Math>{"X\\sim N(\\mu,\\sigma^2)"}</Math> è simmetrica rispetto a
          <Math>{" \\mu"}</Math>, con media <Math>{"\\mu"}</Math> e varianza
          <Math>{" \\sigma^2"}</Math>.
        </p>
        <MathBlock>
          {`f_X(x)=\\frac1{\\sqrt{2\\pi}\\sigma}\\exp\\!\\left[-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right]`}
        </MathBlock>
        <MathBlock>
          {`Z=\\frac{X-\\mu}{\\sigma}\\sim N(0,1)`}
        </MathBlock>
        <p>
          Simmetria: <Math>{"\\Phi(-z)=1-\\Phi(z)"}</Math>. Quantile:
          <Math>{" x_q=\\mu+\\sigma z_q"}</Math> se <Math>{"P(X\\le x_q)=q"}</Math>.
        </p>
      </Box>

      <Box color="red" border="left" title="Phi e code della normale">
        <p>
          <Math>{"\\Phi"}</Math> è la funzione di ripartizione della normale
          standard: indica sempre l&apos;area a sinistra di <Math>{"z"}</Math>.
        </p>
        <MathBlock>{`\\Phi(z)=P(Z\\le z)`}</MathBlock>
        <Row>
          <Column width="half">
            <p><strong>Coda sinistra:</strong></p>
            <MathBlock>
              {`P(X\\le x)=\\Phi\\!\\left(\\frac{x-\\mu}{\\sigma}\\right)`}
            </MathBlock>
          </Column>
          <Column width="half">
            <p><strong>Coda destra:</strong></p>
            <MathBlock>
              {`P(X>x)=1-\\Phi\\!\\left(\\frac{x-\\mu}{\\sigma}\\right)`}
            </MathBlock>
          </Column>
        </Row>
        <p><strong>Area tra due valori:</strong></p>
        <MathBlock>
          {`P(a<X\\le b)=\\Phi\\!\\left(\\frac{b-\\mu}{\\sigma}\\right)-\\Phi\\!\\left(\\frac{a-\\mu}{\\sigma}\\right)`}
        </MathBlock>
        <p>
          Controllo rapido: se <Math>{"z>0"}</Math>, allora la coda destra
          <Math>{" 1-\\Phi(z)"}</Math> deve essere minore di <Math>{"0.5"}</Math>.
        </p>
      </Box>

      <Row>
        <Column width="half">
          <Box color="gray" border="left" title="Somme di normali indipendenti">
            <MathBlock>
              {`X_i\\sim N(\\mu_i,\\sigma_i^2)\\Rightarrow\\sum_iX_i\\sim N\\!\\left(\\sum_i\\mu_i,\\sum_i\\sigma_i^2\\right)`}
            </MathBlock>
            <p>Si sommano le varianze, non le deviazioni standard.</p>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Minimo di esponenziali">
            <MathBlock>
              {`X_i\\sim Exp(\\lambda_i)\\Rightarrow\\min_iX_i\\sim Exp\\!\\left(\\sum_i\\lambda_i\\right)`}
            </MathBlock>
            <p>Vale quando le variabili sono indipendenti.</p>
          </Box>
        </Column>
      </Row>

      <Note>
        Nei problemi normali disegnare la coda o l&apos;intervallo prima di usare la
        tabella. Nei problemi esponenziali distinguere il tasso
        <Math>{" \\lambda"}</Math> dal tempo medio <Math>{"1/\\lambda"}</Math>.
      </Note>
    </Section>
  );
}
