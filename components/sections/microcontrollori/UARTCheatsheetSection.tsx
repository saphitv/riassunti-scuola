import { Section, Row, Column, Box, MathBlock, CodeBlock } from "@/components/index";

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
        <Column width="half">
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

        <Column width="half">
          <Box color="purple" border="left" title="UxBRG + esempio @ 9600 baud">
            <MathBlock gap="sm" size="small">{`U_xBRG = \\frac{F_{PB}}{M \\cdot B} - 1`}</MathBlock>
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li><code>FPB</code> = peripheral bus clock</li>
              <li><code>B</code> = baud rate desiderato</li>
              <li><code>M = 4</code> se <code>BRGH = 1</code></li>
              <li><code>M = 16</code> se <code>BRGH = 0</code></li>
              <li>1 bit ~ <strong>104 µs</strong></li>
              <li>1 frame (8 dati + start + stop) ~ <strong>1 ms</strong></li>
              <li>esempio classico: <code>9600</code> baud</li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="third">
          <Box color="gray" border="left" title="Registri usati qui">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li><code>UxMODE</code> - formato frame, pin, baud mode</li>
              <li><code>UxSTA</code> - abilita TX / RX, flag di stato</li>
              <li><code>UxBRG</code> - divisore baud-rate</li>
              <li><code>UxTXREG</code> - scrittura dati TX</li>
              <li><code>UxRXREG</code> - lettura dati RX</li>
            </ul>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="Bit di UxMODE">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li><code>ON</code> (1 bit) - <code>0 = OFF</code>, <code>1 = ON</code></li>
              <li><code>UEN</code> - seleziona quali pin UART usare</li>
              <li><code>BRGH</code> - modo baud (<code>M = 4</code> o <code>16</code>)</li>
              <li><code>PDSEL</code> - data bits + parity</li>
              <li><code>STSEL</code> (1 bit) - <code>0 = 1 stop</code>, <code>1 = 2 stop</code></li>
            </ul>
          </Box>
        </Column>

        <Column width="third">
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
    // BasysMX3: RF12 -> U4TX, RF13 -> U4RX via PPS
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
    // U4MODE: formato frame, pin UART, baud mode
    U4MODEbits.ON     = 0; // spegne la UART durante la configurazione
    U4MODEbits.SIDL   = 0; // continua a funzionare anche in Idle mode
    U4MODEbits.IREN   = 0; // disabilita la modalita IrDA
    U4MODEbits.RTSMD  = 0;
    U4MODEbits.UEN0   = 0; // usa solo i pin UxTX e UxRX
    U4MODEbits.UEN1   = 0; // usa solo i pin UxTX e UxRX
    U4MODEbits.WAKE   = 0; // disabilita il wake-up su start bit
    U4MODEbits.LPBACK = 0; // disabilita il loopback interno
    U4MODEbits.ABAUD  = 0; // disabilita l'autobaud
    U4MODEbits.RXINV  = 0; // RX non invertito, idle = 1
    U4MODEbits.PDSEL1 = 0; // insieme a PDSEL0 = 0 -> 8 bit, no parity
    U4MODEbits.PDSEL0 = 0; // insieme a PDSEL1 = 0 -> 8 bit, no parity
    U4MODEbits.STSEL  = 0; // 1 stop bit
    U4MODEbits.BRGH   = 0; // modalita standard baud-rate (clock / 16)

    // U4BRG: divisore del baud-rate
    UartBrg = (int)(
        ((float)PbusClock / (16 * baud) - 1) + 0.5
    );
    U4BRG = UartBrg; // carica il divisore del baud-rate

    // U4STA: abilita trasmissione e ricezione
    U4STAbits.UTXEN = 1; // abilita il trasmettitore
    U4STAbits.URXEN = 1; // abilita il ricevitore
    U4MODEbits.ON   = 1; // accende la UART
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
    // U4TXREG = transmit register
    while (U4STAbits.UTXBF == 1);
    U4TXREG = c;
    return c;
}

char getU4(void)
{
    // U4RXREG = receive register
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
