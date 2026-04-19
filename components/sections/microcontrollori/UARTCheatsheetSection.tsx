import { Section, Row, Column, Box, MathBlock, CodeBlock } from "@/components";

export function UARTCheatsheetSection() {
  return (
    <Section title="UART - Cheat Sheet">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Cos'e UART">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                <strong>UART</strong> = Universal Asynchronous Receiver
                Transmitter
              </p>
              <ul className="ref-list">
                <li>comunicazione <strong>seriale</strong></li>
                <li>
                  <strong>asincrona</strong> - niente linea di clock
                </li>
                <li>
                  <strong>full-duplex</strong> - TX e RX insieme
                </li>
                <li>i due dispositivi devono concordare il <strong>baud rate</strong></li>
              </ul>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="Segnali">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li><code>TX</code> - trasmissione</li>
              <li><code>RX</code> - ricezione</li>
              <li><code>GND</code> - massa condivisa</li>
              <li>
                <code>RTS</code> / <code>CTS</code> - flow control hw (opzionali)
              </li>
            </ul>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="Collegamento">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>TX</code> di uno -&gt; <code>RX</code> dell&apos;altro
              </li>
              <li><code>GND</code> in comune</li>
              <li>stesso <strong>baud rate</strong> concordato</li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="two-thirds">
          <Box color="gray" border="left" title="Struttura del frame">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <ul className="ref-list">
                <li>linea a riposo (<strong>idle</strong>) = <code>high</code></li>
                <li>
                  <strong>1 start bit</strong> = <code>low</code> (inizio frame)
                </li>
                <li>
                  <strong>bit dati</strong> - inviati <strong>LSB first</strong>
                </li>
                <li>
                  <strong>parity bit</strong> opzionale (even / odd / none)
                </li>
                <li>
                  <strong>1 o 2 stop bit</strong> = <code>high</code> (fine frame)
                </li>
              </ul>
              <p style={{ marginTop: "0.35rem" }}>
                Start, parity e stop sono <strong>bit di controllo</strong>, non dati.
              </p>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="red" border="left" title="Timing @ 9600 baud">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>1 bit ~ <strong>104 µs</strong></li>
              <li>1 frame (8 dati + start + stop) ~ <strong>1 ms</strong></li>
              <li>velocita tipiche: <code>9600</code>, <code>19200</code>, ...</li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Box color="purple" border="left" title="Formula baud-rate UxBRG">
        <MathBlock gap="sm" size="small">{`U_xBRG = \\frac{F_{PB}}{M \\cdot B} - 1`}</MathBlock>
        <ul
          className="ref-list"
          style={{ fontSize: "var(--font-size-small)" }}
        >
          <li><code>FPB</code> = peripheral bus clock</li>
          <li><code>B</code> = baud rate desiderato</li>
          <li><code>M = 4</code> se <code>BRGH = 1</code></li>
          <li><code>M = 16</code> se <code>BRGH = 0</code></li>
        </ul>
      </Box>

      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Feature PIC32MX">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>trasmissione <strong>8 o 9 bit</strong></li>
              <li>parity <strong>even / odd / none</strong></li>
              <li><strong>1 o 2 stop bit</strong></li>
              <li>flow control hw</li>
              <li>baud-rate generator</li>
              <li>FIFO TX e RX</li>
              <li>interrupt separati TX / RX</li>
              <li>loopback, IrDA</li>
            </ul>
          </Box>
        </Column>

        <Column width="two-thirds">
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
                  <td><code>UxMODE</code></td>
                  <td>configurazione</td>
                  <td>abilita UART, sceglie pin, baud mode, parity, stop</td>
                </tr>
                <tr>
                  <td><code>UxSTA</code></td>
                  <td>stato e controllo</td>
                  <td>abilita TX / RX, flag di stato e di errore</td>
                </tr>
                <tr>
                  <td><code>UxTXREG</code></td>
                  <td>transmit register</td>
                  <td>scrivi qui per <strong>trasmettere</strong></td>
                </tr>
                <tr>
                  <td><code>UxRXREG</code></td>
                  <td>receive register</td>
                  <td>leggi qui per <strong>ricevere</strong></td>
                </tr>
                <tr>
                  <td><code>UxBRG</code></td>
                  <td>baud-rate generator</td>
                  <td>imposta il divisore per il baud</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="green" border="left" title="Bit di UxMODE">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li><code>ON</code> - abilita la UART</li>
              <li><code>UEN</code> - seleziona quali pin UART usare</li>
              <li><code>BRGH</code> - modo baud (<code>M = 4</code> o <code>16</code>)</li>
              <li><code>PDSEL</code> - data bits + parity</li>
              <li><code>STSEL</code> - 1 o 2 stop bit</li>
            </ul>
          </Box>
        </Column>

        <Column width="half">
          <Box color="yellow" border="left" title="Bit di UxSTA">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li><code>URXEN</code> / <code>UTXEN</code> - abilita RX / TX</li>
              <li><code>UTXBF</code> - TX buffer pieno</li>
              <li><code>TRMT</code> - transmitter vuoto</li>
              <li><code>URXDA</code> - dato RX disponibile</li>
              <li>
                <code>PERR</code> / <code>FERR</code> / <code>OERR</code> - errori parity / framing / overrun
              </li>
              <li>
                <code>UTXISEL</code> / <code>URXISEL</code> - condizioni di interrupt
              </li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Pin UART4 su BasysMX3">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li><code>RF12</code> -&gt; <code>U4TX</code></li>
              <li><code>RF13</code> -&gt; <code>U4RX</code></li>
            </ul>
            <p style={{ fontSize: "var(--font-size-small)", marginTop: "0.35rem" }}>
              I pin vanno <strong>mappati</strong> alla periferica tramite PPS.
            </p>
          </Box>
        </Column>

        <Column width="half">
          <Box color="red" border="left" title="Procedura in 5 passi">
            <ol
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>configura i pin (TRIS + PPS)</li>
              <li>configura i registri UART4</li>
              <li>calcola e imposta <code>U4BRG</code></li>
              <li>abilita TX e RX (<code>UTXEN</code>, <code>URXEN</code>)</li>
              <li>scrivi / leggi caratteri</li>
            </ol>
          </Box>
        </Column>
      </Row>

      <Box color="gray" border="left" title="Esempio C - UART4">
        <Row gap="sm">
          <Column width="third">
            <p
              style={{
                fontSize: "var(--font-size-small)",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}
            >
              Configura pin
            </p>
            <CodeBlock language="c">{`void UART_ConfigurePins(void)
{
    TRISFbits.TRISF12 = 0;
    RPF12R = 2;     // U4TX su RPF12
    TRISFbits.TRISF13 = 1;
    U4RXR  = 9;     // U4RX su RPF13
}`}</CodeBlock>
          </Column>

          <Column width="third">
            <p
              style={{
                fontSize: "var(--font-size-small)",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}
            >
              Configura UART
            </p>
            <CodeBlock language="c">{`void UART_ConfigureUart(int baud)
{
    U4MODEbits.ON     = 0;
    U4MODEbits.SIDL   = 0;
    U4MODEbits.IREN   = 0;
    U4MODEbits.RTSMD  = 0;
    U4MODEbits.UEN0   = 0;
    U4MODEbits.UEN1   = 0;
    U4MODEbits.WAKE   = 0;
    U4MODEbits.LPBACK = 0;
    U4MODEbits.ABAUD  = 0;
    U4MODEbits.RXINV  = 0;
    U4MODEbits.PDSEL1 = 0;
    U4MODEbits.PDSEL0 = 0;
    U4MODEbits.STSEL  = 0;
    U4MODEbits.BRGH   = 0;

    UartBrg = (int)(
        ((float)PbusClock / (16 * baud) - 1) + 0.5
    );
    U4BRG = UartBrg;

    U4STAbits.UTXEN = 1;
    U4STAbits.URXEN = 1;
    U4MODEbits.ON   = 1;
}`}</CodeBlock>
          </Column>

          <Column width="third">
            <p
              style={{
                fontSize: "var(--font-size-small)",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}
            >
              TX/RX e stringhe
            </p>
            <CodeBlock language="c">{`int putU4(int c)
{
    while (U4STAbits.UTXBF == 1);
    U4TXREG = c;
    return c;
}

char getU4(void)
{
    while (!U4STAbits.URXDA);
    return U4RXREG;
}

void putU4_string(char szData[])
{
    char *pData = szData;
    while (*pData)
    {
        putU4(*pData++);
    }
}`}</CodeBlock>
          </Column>
        </Row>
      </Box>

    </Section>
  );
}
