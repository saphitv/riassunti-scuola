import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
  Definition,
} from "@/components/index";

export function VariabiliAleatorieSection() {
  return (
    <Section title="3. Variabili aleatorie" allowPageBreak>
      <Definition term="Variabile aleatoria">
        È una funzione <Math>{"X:\\Omega\\to\\mathbb R"}</Math> che associa un
        numero a ogni esito. La funzione di ripartizione è
        <Math>{" F_X(x)=P(X\\le x)"}</Math>: è non decrescente, continua da
        destra, tende a 0 per <Math>{"x\\to-\\infty"}</Math> e a 1 per
        <Math>{"x\\to+\\infty"}</Math>.
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Variabile discreta">
            <p>
              <Math>{"p_i=P(X=x_i)"}</Math>, con <Math>{"p_i\\ge0"}</Math> e
              <Math>{" \\sum_i p_i=1"}</Math>.
            </p>
            <MathBlock>{`F_X(x)=\\sum_{x_i\\le x}p_i`}</MathBlock>
            <MathBlock>{`E[g(X)]=\\sum_i g(x_i)p_i`}</MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Variabile continua">
            <p>
              Una densità soddisfa <Math>{"f_X(x)\\ge0"}</Math> e
              <Math>{" \\int_{-\\infty}^{\\infty}f_X(x)dx=1"}</Math>.
            </p>
            <MathBlock>
              {`F_X(x)=\\int_{-\\infty}^x f_X(t)dt \\qquad P(a\\le X\\le b)=\\int_a^b f_X(x)dx`}
            </MathBlock>
            <p><Math>{"P(X=x)=0"}</Math>: gli estremi inclusi o esclusi non cambiano la probabilità.</p>
          </Box>
        </Column>
      </Row>

      <Box color="purple" border="left" title="Momenti e trasformazioni lineari">
        <MathBlock>
          {`E[X]=\\sum_i x_ip_i \\;\\text{o}\\; \\int_{-\\infty}^{\\infty}xf_X(x)dx`}
        </MathBlock>
        <MathBlock>
          {`\\operatorname{Var}(X)=E[(X-\\mu)^2]=E[X^2]-E[X]^2 \\qquad \\sigma_X=\\sqrt{\\operatorname{Var}(X)}`}
        </MathBlock>
        <MathBlock>
          {`E[aX+b]=aE[X]+b \\qquad \\operatorname{Var}(aX+b)=a^2\\operatorname{Var}(X)`}
        </MathBlock>
        <MathBlock>
          {`\\operatorname{Var}(X+Y)=\\operatorname{Var}(X)+\\operatorname{Var}(Y)+2\\operatorname{Cov}(X,Y)`}
        </MathBlock>
        <p>
          Se <Math>{"X"}</Math> e <Math>{"Y"}</Math> sono indipendenti, la
          covarianza è zero e le varianze si sommano.
        </p>
      </Box>

      <Note>
        Procedura da una densità incognita: (1) imporre area totale 1 per trovare
        la costante; (2) integrare a tratti per ottenere la CDF; (3) calcolare
        <Math>{" E[X]"}</Math> ed <Math>{"E[X^2]"}</Math>; (4) usare
        <Math>{" Var(X)=E[X^2]-E[X]^2"}</Math>.
      </Note>
    </Section>
  );
}
