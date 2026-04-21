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
    <Section title="Fondamenti di Probabilita" forceFirstPage>
      <Row>
        <Column width="half">
          <Definition term="Spazio campionario">
            Lo spazio campionario <Math>{"\\Omega"}</Math> e l&apos;insieme di
            tutti gli esiti possibili di un esperimento aleatorio.
          </Definition>
        </Column>
        <Column width="half">
          <Definition term="Evento">
            Un evento e un sottoinsieme di <Math>{"\\Omega"}</Math>. Si verifica
            quando l&apos;esito osservato appartiene a quel sottoinsieme.
          </Definition>
        </Column>
      </Row>

      <Box color="blue" border="left" title="Assiomi di probabilita">
        <MathBlock>
          {`0 \\leq P(E) \\leq 1 \\qquad P(\\varnothing) = 0 \\qquad P(\\Omega) = 1`}
        </MathBlock>
        <MathBlock>
          {`E_i \\cap E_j = \\varnothing \\; (i \\neq j) \\Rightarrow P(E_1 \\cup \\cdots \\cup E_n) = P(E_1) + \\cdots + P(E_n)`}
        </MathBlock>
        <p style={{ marginTop: "0.5rem" }}>
          Dagli assiomi si ricavano subito:
        </p>
        <MathBlock>
          {`P(\\overline{E}) = 1 - P(E) \\qquad P(E \\cup F) = P(E) + P(F) - P(E \\cap F)`}
        </MathBlock>
      </Box>

      <Row>
        <Column width="half">
          <Example title="Esempio: lancio di un dado" color="yellow">
            <MathBlock>{"\\Omega = \\{1,2,3,4,5,6\\}"}</MathBlock>
            <p>
              Se <Math>{"E"}</Math> = &quot;numero dispari&quot;, allora
            </p>
            <MathBlock>{"E = \\{1,3,5\\}"}</MathBlock>
          </Example>
        </Column>
        <Column width="half">
          <Example title="Esempio: lancio di due monete" color="green">
            <MathBlock>
              {"\\Omega = \\{(T,T),(T,C),(C,T),(C,C)\\}"}
            </MathBlock>
            <p>
              Se <Math>{"E"}</Math> = &quot;almeno una testa&quot;, allora
            </p>
            <MathBlock>{"E = \\{(T,T),(T,C),(C,T)\\}"}</MathBlock>
          </Example>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Relazioni tra eventi">
            <p>
              <Math>{"E \\cup F"}</Math>: esiti che stanno in <Math>{"E"}</Math>{" "}
              oppure in <Math>{"F"}</Math>.
            </p>
            <p>
              <Math>{"E \\cap F"}</Math>: esiti che stanno sia in{" "}
              <Math>{"E"}</Math> sia in <Math>{"F"}</Math>.
            </p>
            <p>
              <Math>{"\\overline{E}"}</Math>: esiti che non appartengono a{" "}
              <Math>{"E"}</Math>.
            </p>
            <MathBlock>
              {`E \\cap \\overline{E} = \\varnothing \\qquad E \\cup \\overline{E} = \\Omega`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Eventi disgiunti">
            <p>
              Due eventi <Math>{"E"}</Math> e <Math>{"F"}</Math> sono disgiunti
              se non possono verificarsi insieme:
            </p>
            <MathBlock>{"E \\cap F = \\varnothing"}</MathBlock>
            <p>
              In questo caso la probabilita dell&apos;unione si ottiene sommando
              le probabilita dei singoli eventi.
            </p>
          </Box>
        </Column>
      </Row>

      <Note>
        I diagrammi di Venn rappresentano graficamente lo spazio campionario
        come un rettangolo e gli eventi come cerchi o ovali, rendendo immediati
        unione, intersezione e complementare.
      </Note>
    </Section>
  );
}
