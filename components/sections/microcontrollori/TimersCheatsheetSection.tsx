import { Section, Row, Column, Box, MathBlock } from "@/components";

export function TimersCheatsheetSection() {
  return (
    <Section title="Timers - Cheat Sheet">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Cos'e un Timer">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                Un <strong>timer</strong> e un <strong>contatore</strong> che
                si incrementa ad ogni impulso di clock.
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                Usato per <strong>misurare tempi</strong>, generare{" "}
                <strong>ritardi</strong> e temporizzare eventi.
              </p>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="Timer in PIC32">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <ul className="ref-list">
                <li>
                  <strong>5 timer</strong> totali
                </li>
                <li>
                  <code>Timer1</code> - solo <strong>16-bit</strong>
                </li>
                <li>
                  <code>Timer2 - Timer5</code> - <strong>16-bit</strong>
                </li>
                <li>
                  accoppiabili a coppie -&gt; <strong>32-bit</strong>
                </li>
              </ul>
              <p style={{ marginTop: "0.35rem" }}>
                Limiti: <strong>16-bit</strong> = <code>0 - 65,535</code>,
                <strong> 32-bit</strong> = <code>0 - 4,294,967,295</code>
              </p>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="Come funziona">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>il timer <strong>conta in su</strong></li>
              <li>
                quando <code>TMRx == PRx</code>:
              </li>
              <li>- viene settato un <strong>flag</strong></li>
              <li>- il timer si <strong>azzera</strong></li>
              <li>- il conteggio <strong>riparte</strong></li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="auto">
          <Box color="gray" border="left" title="Registri principali">
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
                  <td><code>TMRx</code></td>
                  <td>valore corrente del contatore</td>
                  <td>si incrementa ad ogni impulso di clock</td>
                </tr>
                <tr>
                  <td><code>PRx</code></td>
                  <td>periodo / valore limite</td>
                  <td>
                    quando <code>TMRx == PRx</code> genera il <strong>flag</strong>
                  </td>
                </tr>
                <tr>
                  <td><code>TxCON</code></td>
                  <td>registro di configurazione</td>
                  <td>
                    <code>ON</code> avvia / ferma, <code>TCKPS</code> imposta
                    il prescaler, <code>TCS</code> sceglie clock interno o
                    esterno, <code>TSYNC</code> sincronizza il clock esterno,{" "}
                    <code>TGATE</code> abilita il gated mode
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Prescaler (Timer1)">
            <p style={{ fontSize: "var(--font-size-small)" }}>
              Il <strong>prescaler</strong> divide il clock -&gt;{" "}
              <strong>rallenta</strong> il timer.
            </p>
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li><code>1 : 1</code></li>
              <li><code>1 : 8</code></li>
              <li><code>1 : 64</code></li>
              <li><code>1 : 256</code></li>
            </ul>
            <p
              style={{
                fontSize: "var(--font-size-small)",
                marginTop: "0.35rem",
              }}
            >
              Si imposta tramite i bit <code>TCKPS</code> in <code>TxCON</code>.
            </p>
          </Box>
        </Column>

        <Column width="half">
          <Box color="purple" border="left" title="Formula del periodo">
            <MathBlock gap="sm" size="small">{`T = \\frac{\\text{Prescaler} \\cdot PR_x}{F_{clk}}`}</MathBlock>
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)", marginBottom: "0.5rem" }}
            >
              <li>
                <code>T</code> = periodo / delay generato dal timer
              </li>
              <li>
                <code>PRx</code> = valore del registro periodo, cioe il limite fino a cui conta il timer
              </li>
              <li>
                <code>Fclk</code> = frequenza del clock che alimenta il timer
              </li>
            </ul>
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>PRx</code> piu grande -&gt; delay <strong>maggiore</strong>
              </li>
              <li>
                <code>Prescaler</code> piu grande -&gt; delay{" "}
                <strong>maggiore</strong>
              </li>
              <li>
                <code>Fclk</code> piu alta -&gt; delay <strong>minore</strong>
              </li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="red" border="left" title="Configurazione in 6 passi">
            <ol
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                disabilita il timer (<code>ON = 0</code>)
              </li>
              <li>
                imposta il prescaler (<code>TCKPS</code>)
              </li>
              <li>
                scegli la sorgente di clock (<code>TCS</code>)
              </li>
              <li>
                carica <code>PRx</code>
              </li>
              <li>
                azzera <code>TMRx</code>
              </li>
              <li>
                abilita il timer (<code>ON = 1</code>)
              </li>
            </ol>
          </Box>
        </Column>

        <Column width="half">
          <Box color="blue" border="left" title="Modalita 32-bit">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>Timer2 + Timer3</code> oppure{" "}
                <code>Timer4 + Timer5</code>
              </li>
              <li>usata quando 16 bit non bastano</li>
              <li>
                il timer <strong>dispari</strong> fa da <strong>high word</strong>{" "}
                del timer pari
              </li>
              <li>
                si configura tramite il bit <code>T32</code> in{" "}
                <code>TxCON</code>
              </li>
            </ul>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
