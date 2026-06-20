import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
  Definition,
  Example,
} from "@/components/index";

export function FondamentiProbabilitaSection() {
  return (
    <Section title="1. Elementi di probabilità" forceFirstPage allowPageBreak>
      <Row>
        <Column width="half">
          <Definition term="Spazio campionario ed evento">
            Lo spazio campionario <Math>{"\\Omega"}</Math> contiene tutti gli
            esiti possibili. Un evento <Math>{"E"}</Math> è un sottoinsieme di
            <Math>{" \\Omega"}</Math>; si verifica quando l&apos;esito osservato
            appartiene a <Math>{"E"}</Math>.
          </Definition>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Operazioni tra eventi">
            <MathBlock>
              {`E \\cup F \\quad E \\cap F \\quad \\bar E = \\Omega \\setminus E`}
            </MathBlock>
            <p>
              Disgiunti: <Math>{"E \\cap F=\\varnothing"}</Math>. Inclusione:
              <Math>{" E \\subseteq F"}</Math>. De Morgan:
            </p>
            <MathBlock>
              {`\\overline{E\\cup F}=\\bar E\\cap\\bar F \\qquad \\overline{E\\cap F}=\\bar E\\cup\\bar F`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <Box color="blue" border="left" title="Assiomi e conseguenze">
        <MathBlock>
          {`0\\le P(E)\\le1 \\qquad P(\\varnothing)=0 \\qquad P(\\Omega)=1`}
        </MathBlock>
        <MathBlock>
          {`E_i\\cap E_j=\\varnothing \\Rightarrow P\\!\\left(\\bigcup_i E_i\\right)=\\sum_iP(E_i)`}
        </MathBlock>
        <MathBlock>
          {`P(\\bar E)=1-P(E) \\qquad P(E\\cup F)=P(E)+P(F)-P(E\\cap F)`}
        </MathBlock>
      </Box>

      <Row>
        <Column width="half">
          <Box color="green" border="left" title="Spazi equiprobabili">
            <p>Se tutti gli esiti hanno la stessa probabilità:</p>
            <MathBlock>{`P(E)=\\frac{|E|}{|\\Omega|}`}</MathBlock>
            <p>
              Con ordine: <Math>{"n^k"}</Math> sequenze di <Math>{"k"}</Math>
              estrazioni con reinserimento. Senza ordine e senza reinserimento:
            </p>
            <MathBlock>{`\\binom nk=\\frac{n!}{k!(n-k)!}`}</MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Example title="Strategia: almeno uno" color="yellow">
            <p>
              È spesso più rapido calcolare il complementare. Se ogni prova
              fallisce con probabilità <Math>{"q"}</Math> e le prove sono
              indipendenti:
            </p>
            <MathBlock>{`P(\\text{almeno un successo})=1-q^n`}</MathBlock>
            <p>
              Prima di contare, chiarire sempre: ordine rilevante? reinserimento?
              esiti equiprobabili?
            </p>
          </Example>
        </Column>
      </Row>

      <Note>
        Nei sistemi affidabili indipendenti: componenti in serie funzionano tutti,
        quindi si moltiplicano le affidabilità; un blocco in parallelo funziona se
        almeno un componente funziona, quindi <Math>{"1-(1-r)^n"}</Math>.
      </Note>
    </Section>
  );
}
