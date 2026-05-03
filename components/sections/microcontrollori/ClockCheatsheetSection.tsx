import { Section, Row, Column, Box, MathBlock, CodeBlock } from "@/components/index";

export function ClockCheatsheetSection() {
  return (
    <Section title="Clock CPU PIC32" forceFirstPage>
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Perche serve">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>un sistema digitale non funziona senza clock</li>
              <li>clock piu alto -&gt; elaborazione piu veloce</li>
              <li>clock piu alto -&gt; consumo maggiore</li>
              <li>nei sistemi embedded conta il compromesso prestazioni/risparmio</li>
              <li>la frequenza puo essere adattata dinamicamente</li>
              <li>possono esserci fail-safe e sorgenti interne/esterne</li>
            </ul>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="Sorgenti di clock">
            <table className="comparison-table">
              <tbody>
                <tr>
                  <td><code>FRC</code></td>
                  <td>Fast RC interno, <strong>8 MHz</strong>, medio/low power, circa +/-2%</td>
                </tr>
                <tr>
                  <td><code>LPRC</code></td>
                  <td>Low Power RC interno, <strong>31.25/32 kHz</strong>, basso consumo</td>
                </tr>
                <tr>
                  <td><code>POSC</code></td>
                  <td>oscillatore primario esterno, fino a <strong>20 MHz</strong>, pin <code>OSCI/OSCO</code></td>
                </tr>
                <tr>
                  <td><code>SOSC</code></td>
                  <td>secondario esterno, <strong>32.768 kHz</strong>, pin <code>SOSCI/SOSCO</code>, usato per <code>RTCC</code></td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="Uscite principali">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>SYSCLK</code>: clock di sistema della CPU
              </li>
              <li>
                <code>USB clock</code>: deve essere esattamente <strong>48 MHz</strong>
              </li>
              <li>
                <code>PBCLK</code>: clock periferiche, derivato da <code>SYSCLK</code> tramite postscaler
              </li>
            </ul>
            <p style={{ fontSize: "var(--font-size-small)", marginTop: "0.35rem" }}>
              La frequenza finale non e sempre quella grezza dell&apos;oscillatore:
              puo passare da divisori, moltiplicatori e postscaler.
            </p>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="PLL - Phase Locked Loop">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                Il <strong>PLL</strong> genera una frequenza che e un multiplo
                esatto della frequenza di ingresso.
              </p>
              <ul className="ref-list" style={{ marginTop: "0.35rem" }}>
                <li>
                  <strong>Input divider</strong>: divide l&apos;ingresso per <code>N</code>
                </li>
                <li>
                  <strong>VCO / multiplier</strong>: moltiplica la frequenza
                </li>
                <li>
                  <strong>Output divider</strong>: divide il risultato per <code>M</code>
                </li>
              </ul>
              <p style={{ marginTop: "0.35rem" }}>
                Regola importante: l&apos;ingresso del PLL/VCO deve stare nel range
                valido, circa <strong>4-5 MHz</strong>.
              </p>
            </div>
          </Box>
        </Column>

        <Column width="half">
          <Box color="gray" border="left" title="Formula">
            <MathBlock gap="sm" size="small">{`F_{PLL,in} = \\frac{F_{osc}}{N}`}</MathBlock>
            <MathBlock gap="sm" size="small">{`F_{out} = \\frac{F_{osc}}{N} \\cdot MUL \\cdot \\frac{1}{M}`}</MathBlock>
            <MathBlock gap="sm" size="small">{`8\\,MHz \\div 2 \\cdot 24 \\div 2 = 48\\,MHz`}</MathBlock>
            <p style={{ fontSize: "var(--font-size-small)", marginTop: "0.35rem" }}>
              Per USB serve <strong>48 MHz</strong>: si puo ottenere dal PLL
              oppure da un oscillatore primario esterno a <strong>48 MHz</strong>.
            </p>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Da dove puo arrivare SYSCLK">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li><code>POSC</code> diretto</li>
              <li><code>POSC</code> tramite PLL</li>
              <li><code>FRC</code> diretto</li>
              <li><code>FRC</code> tramite PLL</li>
              <li><code>FRC</code> tramite divisore</li>
              <li><code>FRC / 16</code></li>
              <li><code>LPRC</code> diretto</li>
              <li><code>SOSC</code> diretto</li>
            </ul>
            <p style={{ fontSize: "var(--font-size-small)", marginTop: "0.35rem" }}>
              La scelta dipende da prestazioni richieste, consumo e periferiche
              da alimentare.
            </p>
          </Box>
        </Column>

        <Column width="half">
          <Box color="gray" border="left" title="Registri importanti">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Registro</th>
                  <th>Funzione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>OSCCON</code></td>
                  <td>controllo oscillatore, clock switching, stato, PLL lock, fail condition</td>
                </tr>
                <tr>
                  <td><code>OSCTUN</code></td>
                  <td>tuning del <code>FRC</code>, circa +/-12%</td>
                </tr>
                <tr>
                  <td><code>OSCCONCLR</code></td>
                  <td>clear atomico dei bit in <code>OSCCON</code></td>
                </tr>
                <tr>
                  <td><code>DEVCFG1</code></td>
                  <td>configuration bits per selezione oscillatore</td>
                </tr>
                <tr>
                  <td><code>DEVCFG2</code></td>
                  <td>configuration bits per PLL/divisori</td>
                </tr>
                <tr>
                  <td><code>REFOCON</code></td>
                  <td>controllo uscita reference oscillator</td>
                </tr>
                <tr>
                  <td><code>REFOTRIM</code></td>
                  <td>trim dei bit del divisore reference clock</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Prima di configurare">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>definisci il clock target</li>
              <li>scegli quale registro scrivere</li>
              <li>controlla quali bit impostano l&apos;opzione</li>
              <li>verifica le combinazioni ammesse</li>
              <li>rispetta il range di ingresso del PLL</li>
              <li>usa la sequenza di unlock per i registri protetti</li>
            </ul>
          </Box>
        </Column>

        <Column width="half">
          <Box color="red" border="left" title="Registri protetti">
            <CodeBlock language="c">{`SYSKEY = 0xAA996655;
SYSKEY = 0x556699AA;

// modifica registri protetti: OSCCON, clock switch, ecc.

SYSKEY = 0x00000000;`}</CodeBlock>
            <p style={{ fontSize: "var(--font-size-small)", marginTop: "0.35rem" }}>
              I bit esatti dipendono dal PIC32 specifico: controlla datasheet e
              reference manual prima di scrivere la configurazione.
            </p>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="auto">
          <Box color="green" border="left" title="Documentazione e strumenti">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>datasheet: riferimento per oscillator configuration e special features</li>
              <li>Microchip Oscillator Configuration reference manual, es. <code>DS60001112</code></li>
              <li>tabella Excel Microchip per scegliere divisori/moltiplicatori</li>
              <li><code>MPLAB X MCC</code>: genera codice di inizializzazione XC32</li>
            </ul>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
