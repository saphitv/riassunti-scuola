import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function GPIOCheatsheetSection() {
  return (
    <Section title="GPIO - Cheat Sheet">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Cos'e il GPIO">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                <strong>GPIO</strong> = General Purpose Input/Output
              </p>
              <p>Ogni pin puo essere:</p>
              <ul className="ref-list">
                <li><strong>input</strong> - legge un segnale</li>
                <li><strong>output</strong> - pilota un segnale</li>
              </ul>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="Livelli logici">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li><code>1</code> = high (VDD)</li>
              <li><code>0</code> = low (GND)</li>
              <li>
                <code>Z</code> = high impedance / tri-state (pin scollegato)
              </li>
            </ul>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="Input fisico">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>pin a <strong>GND</strong> -&gt; legge <code>0</code></li>
              <li>pin a <strong>VDD</strong> -&gt; legge <code>1</code></li>
            </ul>
          </Box>
        </Column>
      </Row>

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
                  <td>usa per <strong>scrivere</strong> l&apos;uscita</td>
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
          <Box color="red" border="left" title="Regola d'oro">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>PORT</code> = <strong>read</strong> - leggi lo stato del
                pin
              </li>
              <li>
                <code>LAT</code> = <strong>write</strong> - scrivi in uscita
                (evita problemi read-modify-write)
              </li>
              <li>
                <code>SET</code> / <code>CLR</code> / <code>INV</code> -
                registri atomici per modificare bit velocemente
              </li>
            </ul>
          </Box>

          <Box color="gray" border="left" title="Assembly / header">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>PIC32 usa architettura <strong>MIPS32</strong></li>
              <li>
                registri accessibili per nome (es. <code>TRISD</code>,{" "}
                <code>LATD</code>)
              </li>
              <li>
                header: <code>#include &lt;p32xxxx.h&gt;</code>
              </li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="green" border="left" title="Pulsanti">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <strong>active-low</strong>: premuto = <code>0</code>
              </li>
              <li>
                <strong>active-high</strong>: premuto = <code>1</code>
              </li>
            </ul>
            <p style={{ fontSize: "var(--font-size-small)" }}>
              Dipende da come e cablato con resistenza di pull-up / pull-down.
            </p>
          </Box>
        </Column>

        <Column width="half">
          <Box color="yellow" border="left" title="LED">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>a volte <code>1</code> = ON</li>
              <li>a volte <code>0</code> = ON</li>
            </ul>
            <p style={{ fontSize: "var(--font-size-small)" }}>
              Dipende dal cablaggio (anodo o catodo verso il pin).
            </p>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Setup base">
            <CodeBlock language="c">{`ANSELD = 0x0000;      // Port D tutta digitale
TRISD = 0x0001;       // RD0 input, gli altri pin output
TRISDbits.TRISD1 = 0; // RD1 configurato come output
LATDbits.LATD1 = 1;   // RD1 a livello alto`}</CodeBlock>
          </Box>
        </Column>

        <Column width="half">
          <Box color="purple" border="left" title="Toggle RD0">
            <CodeBlock language="c">{`LATDbits.LATD1 = ~LATDbits.LATD1;
// flip tra 0 e 1

if (PORTDbits.RD0 == 1)
{
    LATDbits.LATD1 = 1;
}
// PORT si usa per leggere il livello presente sul pin`}</CodeBlock>
          </Box>
        </Column>
      </Row>

    </Section>
  );
}
