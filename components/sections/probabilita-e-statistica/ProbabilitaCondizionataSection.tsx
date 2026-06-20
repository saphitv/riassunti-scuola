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

export function ProbabilitaCondizionataSection() {
  return (
    <Section title="2. Probabilità condizionata, Bayes e indipendenza" allowPageBreak>
      <Row>
        <Column width="half">
          <Definition term="Probabilità condizionata">
            Sapendo che <Math>{"F"}</Math> si è verificato, lo spazio campionario
            si restringe a <Math>{"F"}</Math>:
          </Definition>
          <MathBlock>{`P(E\\mid F)=\\frac{P(E\\cap F)}{P(F)},\\quad P(F)>0`}</MathBlock>
        </Column>
        <Column width="half">
          <Box color="blue" border="left" title="Regola del prodotto">
            <MathBlock>{`P(E\\cap F)=P(E\\mid F)P(F)`}</MathBlock>
            <MathBlock>
              {`P(E_1\\cap\\cdots\\cap E_n)=P(E_1)\\prod_{i=2}^nP(E_i\\mid E_1\\cap\\cdots\\cap E_{i-1})`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <Box color="green" border="left" title="Probabilità totale e formula di Bayes">
        <p>
          Se <Math>{"F_1,\\ldots,F_n"}</Math> è una partizione di
          <Math>{" \\Omega"}</Math>, allora:
        </p>
        <MathBlock>
          {`P(E)=\\sum_{i=1}^nP(E\\mid F_i)P(F_i)`}
        </MathBlock>
        <MathBlock>
          {`P(F_j\\mid E)=\\frac{P(E\\mid F_j)P(F_j)}{\\sum_iP(E\\mid F_i)P(F_i)}`}
        </MathBlock>
      </Box>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Indipendenza">
            <MathBlock>{`P(E\\cap F)=P(E)P(F)`}</MathBlock>
            <p>
              Equivalentemente, se le probabilità sono positive,
              <Math>{" P(E\\mid F)=P(E)"}</Math>. L&apos;indipendenza non è la
              disgiunzione: due eventi disgiunti non banali sono dipendenti.
            </p>
          </Box>
        </Column>
        <Column width="half">
          <Example title="Test diagnostico" color="red">
            <p>
              Con prevalenza <Math>{"P(M)"}</Math>, sensibilità
              <Math>{" P(T^+\\mid M)"}</Math> e specificità
              <Math>{" P(T^-\\mid\\bar M)"}</Math>, prima trovare
              <Math>{" P(T^+)"}</Math> col caso totale, poi applicare Bayes.
            </p>
            <MathBlock>
              {`P(M\\mid T^+)=\\frac{P(T^+\\mid M)P(M)}{P(T^+)}`}
            </MathBlock>
          </Example>
        </Column>
      </Row>

      <Note>
        Per gli esercizi costruire un albero: probabilità iniziali sui primi rami,
        condizionate sui secondi; moltiplicare lungo un percorso, sommare percorsi
        alternativi. Bayes inverte la direzione del condizionamento.
      </Note>
    </Section>
  );
}
