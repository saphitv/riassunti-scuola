import {
  Box,
  Column,
  Math,
  MathBlock,
  Row,
  Section,
} from "@/components/index";

export function DerivateEssenzialiSection() {
  return (
    <Section title="Richiamo derivate essenziali" allowPageBreak>
      <Row gap="sm">
        <Column width="two-thirds">
          <Box color="yellow" border="left" title="Regole da tenere sott'occhio">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Regola</th>
                  <th>Formula</th>
                  <th>Quando usarla</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Prodotto</td>
                  <td><Math>{"(fg)'=f'g+fg'"}</Math></td>
                  <td>Non derivare entrambi insieme: uno derivato, l&apos;altro no, poi scambi.</td>
                </tr>
                <tr>
                  <td>Quoziente</td>
                  <td><Math>{"\\left(\\frac{f}{g}\\right)'=\\frac{f'g-fg'}{g^2}"}</Math></td>
                  <td>Sopra: derivata del numeratore per denominatore meno numeratore per derivata del denominatore.</td>
                </tr>
                <tr>
                  <td>Catena</td>
                  <td><Math>{"(f(g(x)))'=f'(g(x))g'(x)"}</Math></td>
                  <td>Deriva la funzione esterna e moltiplica per la derivata dell&apos;interno.</td>
                </tr>
                <tr>
                  <td>Potenza composta</td>
                  <td><Math>{"(u^n)'=n u^{n-1}u'"}</Math></td>
                  <td>Usala quando la base non e solo <Math>{"x"}</Math>.</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>

        <Column width="third">
          <Box color="gray" border="left" title="Formule composte">
            <MathBlock gap="sm" size="small">
              {`(e^u)'=e^u u'
\\qquad
(\\ln u)'=\\frac{u'}{u}`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`(\\sin u)'=\\cos(u)u'
\\qquad
(\\cos u)'=-\\sin(u)u'`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`\\int \\frac{1}{a^2+\\omega^2}\\,d\\omega
=\\frac{1}{a}\\arctan\\left(\\frac{\\omega}{a}\\right)`}
            </MathBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
