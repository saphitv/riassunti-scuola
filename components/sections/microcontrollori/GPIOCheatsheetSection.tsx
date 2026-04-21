import { Section, Row, Column, Box, CodeBlock } from "@/components/index";

export function GPIOCheatsheetSection() {
  return (
    <Section title="GPIO">
      <Row>
        <Column width="two-thirds">
          <Box color="gray" border="left" title="Registri principali - SFR (Special Function Registers)">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Registro</th>
                  <th>Funzione</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>ANSELx</code></td>
                  <td>analogico / digitale</td>
                  <td>1 = analogico, 0 = digitale</td>
                </tr>
                <tr>
                  <td><code>TRISx</code></td>
                  <td>direzione del pin</td>
                  <td>1 = input, 0 = output</td>
                </tr>
                <tr>
                  <td><code>PORTx</code></td>
                  <td>lettura pin</td>
                  <td>usa per <strong>leggere</strong> il livello</td>
                </tr>
                <tr>
                  <td><code>LATx</code></td>
                  <td>scrittura pin</td>
                  <td>
                    usa per <strong>scrivere</strong> l&apos;uscita;{" "}
                    <code>LATxSET</code>, <code>LATxCLR</code> e{" "}
                    <code>LATxINV</code> modificano bit in modo atomico
                  </td>
                </tr>
                <tr>
                  <td><code>ODCx</code></td>
                  <td>open-drain</td>
                  <td>abilita uscita open-drain</td>
                </tr>
                <tr>
                  <td><code>CNCON</code></td>
                  <td>change notification</td>
                  <td>interrupt su cambio livello</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>

        <Column width="third">
          <Box color="blue" border="left" title="Setup base">
            <CodeBlock language="c">{`ANSELD = 0x0000;      // Port D tutta digitale
TRISD = 0x0001;       // RD0 input, gli altri pin output
TRISDbits.TRISD1 = 0; // RD1 configurato come output
LATDbits.LATD1 = 1;   // RD1 a livello alto`}</CodeBlock>
          </Box>

          <Box color="purple" border="left" title="Toggle RD0">
            <CodeBlock language="c">{`LATDbits.LATD1 = ~LATDbits.LATD1; // flip tra 0 e 1
if (PORTDbits.RD0 == 1)
{
    LATDbits.LATD1 = 1;
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

    </Section>
  );
}
