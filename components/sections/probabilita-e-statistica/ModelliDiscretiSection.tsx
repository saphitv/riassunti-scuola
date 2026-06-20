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

export function ModelliDiscretiSection() {
  return (
    <Section title="4. Modelli discreti" allowPageBreak>
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Bernoulli">
            <p><Math>{"X\\sim B(1,p)"}</Math>: una prova, successo 1 o insuccesso 0.</p>
            <MathBlock>{`P(X=1)=p,\\quad P(X=0)=1-p`}</MathBlock>
            <MathBlock>{`E[X]=p,\\quad Var(X)=p(1-p)`}</MathBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="green" border="left" title="Binomiale">
            <p><Math>{"X\\sim B(n,p)"}</Math>: numero di successi in <Math>{"n"}</Math> prove Bernoulli indipendenti.</p>
            <MathBlock>{`P(X=k)=\\binom nkp^k(1-p)^{n-k}`}</MathBlock>
            <MathBlock>{`E[X]=np,\\quad Var(X)=np(1-p)`}</MathBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="purple" border="left" title="Poisson">
            <p>
              <Math>{"X\\sim P(\\lambda)"}</Math>: conteggio di eventi di un
              processo con tasso costante e incrementi indipendenti.
            </p>
            <MathBlock>{`P(X=k)=e^{-\\lambda}\\frac{\\lambda^k}{k!}`}</MathBlock>
            <MathBlock>{`E[X]=Var(X)=\\lambda`}</MathBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Example title="Scegliere il modello" color="yellow">
            <ul>
              <li>Una prova sì/no: Bernoulli.</li>
              <li>Numero di successi su un totale fisso: binomiale.</li>
              <li>Numero di arrivi in tempo/spazio con tasso costante: Poisson.</li>
            </ul>
            <p>
              Con <Math>{"n"}</Math> grande, <Math>{"p"}</Math> piccolo e
              <Math>{" \\lambda=np"}</Math>, <Math>{"B(n,p)\\approx P(\\lambda)"}</Math>.
            </p>
          </Example>
        </Column>
        <Column width="half">
          <Box color="gray" border="left" title="Cambio di intervallo e somme">
            <p>
              Se il tasso è <Math>{"r"}</Math> per unità, su durata
              <Math>{" t"}</Math> usare <Math>{"\\lambda=rt"}</Math>. Per Poisson
              indipendenti:
            </p>
            <MathBlock>{`X_i\\sim P(\\lambda_i)\\Rightarrow\\sum_iX_i\\sim P\\!\\left(\\sum_i\\lambda_i\\right)`}</MathBlock>
          </Box>
        </Column>
      </Row>

      <Box color="red" border="left" title="Ipergeometrica: estrazioni senza reinserimento">
        <p>
          Da una popolazione di <Math>{"N"}</Math> elementi con
          <Math>{" K"}</Math> successi, estraendo <Math>{"n"}</Math> elementi senza
          reinserimento, il numero di successi <Math>{"X"}</Math> soddisfa:
        </p>
        <MathBlock>
          {`P(X=k)=\\frac{\\binom Kk\\binom{N-K}{n-k}}{\\binom Nn}`}
        </MathBlock>
        <MathBlock>
          {`E[X]=n\\frac KN \\qquad Var(X)=n\\frac KN\\left(1-\\frac KN\\right)\\frac{N-n}{N-1}`}
        </MathBlock>
        <p>
          La binomiale con <Math>{"p=K/N"}</Math> è un&apos;approssimazione solo
          quando il campione è piccolo rispetto alla popolazione.
        </p>
      </Box>

      <Note>
        Tradurre con precisione: “al massimo <Math>{"m"}</Math>” significa
        <Math>{" P(X\\le m)"}</Math>; “almeno <Math>{"m"}</Math>” significa
        <Math>{" P(X\\ge m)"}</Math>; per le code usare il complementare, ad esempio
        <Math>{" P(X\\ge2)=1-P(X=0)-P(X=1)"}</Math>.
      </Note>
    </Section>
  );
}
