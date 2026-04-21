import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
  Definition,
  Theorem,
} from "@/components/index";

export function ProbabilitaCondizionataSection() {
  return (
    <Section title="Probabilita Condizionata, Bayes e Indipendenza">
      <Row>
        <Column width="half">
          <Definition term="Probabilita condizionata">
            Se l&apos;evento <Math>{"F"}</Math> si e verificato e{" "}
            <Math>{"P(F) > 0"}</Math>, allora la probabilita di{" "}
            <Math>{"E"}</Math> dato <Math>{"F"}</Math> e
          </Definition>
          <MathBlock>{"P(E\\mid F) = \\frac{P(E \\cap F)}{P(F)}"}</MathBlock>
          <p>
            L&apos;evento <Math>{"F"}</Math> diventa il nuovo spazio
            campionario &quot;ridotto&quot;.
          </p>
        </Column>
        <Column width="half">
          <Box color="blue" border="left" title="Prodotto">
            <p>Dalla definizione segue subito:</p>
            <MathBlock>{"P(E \\cap F) = P(E \\mid F) \\cdot P(F)"}</MathBlock>
            <p>
              Questa formula e utile quando conviene descrivere un evento come
              intersezione tra un evento principale e una condizione gia nota.
            </p>
          </Box>
        </Column>
      </Row>

      <Theorem title="Fattorizzazione di un evento">
        <MathBlock>{"E = (E \\cap F) \\cup (E \\cap \\overline{F})"}</MathBlock>
        <p>
          Poiche i due eventi sono disgiunti, si ottiene la legge del caso
          totale su due casi:
        </p>
        <MathBlock>
          {`P(E) = P(E \\mid F)P(F) + P(E \\mid \\overline{F})P(\\overline{F})`}
        </MathBlock>
      </Theorem>

      <Box color="green" border="left" title="Formula di Bayes">
        <p>
          Se <Math>{"F_1, \\ldots, F_n"}</Math> sono eventi disgiunti che
          formano una partizione di <Math>{"\\Omega"}</Math>, allora
        </p>
        <MathBlock>
          {`P(E) = P(E \\mid F_1)P(F_1) + \\cdots + P(E \\mid F_n)P(F_n)`}
        </MathBlock>
        <p>e per ogni indice <Math>{"j"}</Math> vale:</p>
        <MathBlock>
          {`P(F_j \\mid E) = \\frac{P(E \\mid F_j)P(F_j)}{P(E)}`}
        </MathBlock>
        <Note>
          Bayes serve a &quot;invertire&quot; il condizionamento: da{" "}
          <Math>{"P(E \\mid F_j)"}</Math> si passa a{" "}
          <Math>{"P(F_j \\mid E)"}</Math>.
        </Note>
      </Box>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Indipendenza tra due eventi">
            <p>
              Gli eventi <Math>{"E"}</Math> e <Math>{"F"}</Math> sono
              indipendenti se
            </p>
            <MathBlock>{"P(E \\cap F) = P(E) \\cdot P(F)"}</MathBlock>
            <p>In questo caso conoscere uno dei due eventi non cambia l&apos;altro:</p>
            <MathBlock>
              {"P(E \\mid F) = P(E) \\qquad P(F \\mid E) = P(F)"}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="gray" border="left" title="Indipendenza di piu eventi">
            <p>
              Gli eventi <Math>{"F_1, \\ldots, F_n"}</Math> sono indipendenti se
            </p>
            <MathBlock>
              {`P(F_1 \\cap \\cdots \\cap F_n) = P(F_1) \\cdots P(F_n)`}
            </MathBlock>
            <p>
              La probabilita congiunta e quindi il prodotto delle probabilita
              singole.
            </p>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
