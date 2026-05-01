import { Section, Row, Column, Box, MathBlock, CodeBlock } from "@/components/index";

export function SPICheatsheetSection() {
  return (
    <Section title="SPI">
      <div className="no-print">
        <Row>
          <Column width="third">
            <Box color="blue" border="left" title="Cos'e SPI">
              <div style={{ fontSize: "var(--font-size-small)" }}>
                <p>
                  <strong>SPI</strong> = Serial Peripheral Interface.
                </p>
                <ul className="ref-list" style={{ marginTop: "0.35rem" }}>
                  <li>
                    comunicazione <strong>seriale sincrona</strong>{" "}
                    (clock condiviso)
                  </li>
                  <li>
                    <strong>full-duplex</strong> - TX e RX insieme
                  </li>
                  <li>
                    architettura <strong>master / slave</strong>
                  </li>
                  <li>
                    veloce, rispetto a UART, ma serve <strong>piu fili</strong>
                  </li>
                </ul>
              </div>
            </Box>
          </Column>

          <Column width="third">
            <Box color="green" border="left" title="Linee">
              <ul
                className="ref-list"
                style={{ fontSize: "var(--font-size-small)" }}
              >
                <li>
                  <code>SCK</code> - clock generato dal master
                </li>
                <li>
                  <code>MOSI</code> (SDO) - master out, slave in
                </li>
                <li>
                  <code>MISO</code> (SDI) - master in, slave out
                </li>
                <li>
                  <code>SS</code> / <code>CS</code> - slave select (1 per
                  slave, attivo basso)
                </li>
              </ul>
              <p
                style={{
                  fontSize: "var(--font-size-small)",
                  marginTop: "0.35rem",
                }}
              >
                <strong>N slave</strong> -&gt; servono <strong>N CS</strong>{" "}
                separati.
              </p>
            </Box>
          </Column>

          <Column width="third">
            <Box color="yellow" border="left" title="Modalita (CPOL/CPHA)">
              <ul
                className="ref-list"
                style={{ fontSize: "var(--font-size-small)" }}
              >
                <li>
                  <strong>CPOL</strong> - polarita del clock a riposo (0 / 1)
                </li>
                <li>
                  <strong>CPHA</strong> - su quale fronte si campiona (0 / 1)
                </li>
                <li>
                  4 modalita: <code>(0,0)</code>, <code>(0,1)</code>,{" "}
                  <code>(1,0)</code>, <code>(1,1)</code>
                </li>
                <li>
                  master e slave devono usare la <strong>stessa</strong>{" "}
                  modalita
                </li>
              </ul>
            </Box>
          </Column>
        </Row>
      </div>

      <Row>
        <Column width="auto">
          <Box color="gray" border="left" title="Registri principali (PIC32)">
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
                  <td>
                    <code>SPIxCON</code>
                  </td>
                  <td>controllo principale</td>
                  <td>
                    <code>ON</code>, <code>MSTEN</code> (master),{" "}
                    <code>MODE16/32</code> (dimensione parola),{" "}
                    <code>CKP</code>, <code>CKE</code> (CPOL/CPHA),{" "}
                    <code>SMP</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>SPIxSTAT</code>
                  </td>
                  <td>flag di stato</td>
                  <td>
                    <code>SPITBE</code> (TX vuoto), <code>SPIRBF</code> (RX
                    pieno), <code>SPIBUSY</code>, <code>SPIROV</code>{" "}
                    (overflow)
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>SPIxBRG</code>
                  </td>
                  <td>divisore baud</td>
                  <td>
                    determina la frequenza di <code>SCK</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>SPIxBUF</code>
                  </td>
                  <td>buffer TX/RX</td>
                  <td>
                    scrivere = invio; leggere = dato ricevuto (registro
                    condiviso TX e RX)
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Frequenza SCK">
            <MathBlock gap="sm" size="small">{`F_{SCK} = \\frac{F_{PB}}{2 \\cdot (SPIxBRG + 1)}`}</MathBlock>
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>FPB</code> = peripheral bus clock
              </li>
              <li>
                <code>SPIxBRG</code> piu grande -&gt; clock <strong>piu lento</strong>
              </li>
            </ul>
            <p
              style={{
                fontSize: "var(--font-size-small)",
                marginTop: "0.35rem",
              }}
            >
              Esempio: <code>FPB = 80 MHz</code>, <code>SPIxBRG = 9</code>{" "}
              -&gt; <code>4 MHz</code>.
            </p>
          </Box>

          <Box
            color="blue"
            border="left"
            title="Sequenza tipica di una transazione"
          >
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                porta a <strong>basso</strong> il <code>CS</code> dello slave
              </li>
              <li>
                scrivi un byte in <code>SPIxBUF</code>
              </li>
              <li>
                attendi che <code>SPIRBF = 1</code> (dato ricevuto)
              </li>
              <li>
                leggi <code>SPIxBUF</code> (sblocca il buffer)
              </li>
              <li>
                ripeti per ogni byte; alla fine porta a{" "}
                <strong>alto</strong> il <code>CS</code>
              </li>
            </ul>
          </Box>
        </Column>

        <Column width="half">
          <Box color="gray" border="left" title="Esempio C - SPI1 master 8 bit">
            <CodeBlock language="c">{`void spi1_master_init(void)
{
    SPI1CONbits.ON = 0;        // spegni durante la config

    // pin via PPS: SDO1 e SDI1 (CS gestito a mano in GPIO)
    TRISBbits.TRISB10 = 0;     // SDO1 output
    RPB10R = 3;                // SDO1
    TRISBbits.TRISB11 = 1;     // SDI1 input
    SDI1R  = 3;                // SDI1

    TRISBbits.TRISB9 = 0;      // CS manuale
    LATBbits.LATB9   = 1;

    SPI1BRG = 9;               // ~4 MHz con FPB = 80 MHz
    SPI1CONbits.MSTEN  = 1;    // master
    SPI1CONbits.MODE16 = 0;    // 8 bit
    SPI1CONbits.MODE32 = 0;
    SPI1CONbits.CKP    = 0;    // mode 0,0
    SPI1CONbits.CKE    = 1;
    SPI1CONbits.SMP    = 0;

    SPI1CONbits.ON = 1;
}

unsigned char spi1_xfer(unsigned char tx)
{
    while (!SPI1STATbits.SPITBE);    // TX libero
    SPI1BUF = tx;
    while (!SPI1STATbits.SPIRBF);    // RX pronto
    return SPI1BUF;
}

void spi1_send(unsigned char b)
{
    LATBbits.LATB9 = 0;       // CS attivo
    spi1_xfer(b);
    LATBbits.LATB9 = 1;       // CS inattivo
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <div className="no-print">
        <Row>
          <Column width="half">
            <Box color="green" border="left" title="SPI vs UART vs I2C">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Bus</th>
                    <th>Sincrono?</th>
                    <th>Fili</th>
                    <th>Velocita</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>UART</td>
                    <td>asincrono</td>
                    <td>2 + GND</td>
                    <td>bassa</td>
                  </tr>
                  <tr>
                    <td>SPI</td>
                    <td>sincrono</td>
                    <td>3 + N CS</td>
                    <td>alta</td>
                  </tr>
                  <tr>
                    <td>I2C</td>
                    <td>sincrono</td>
                    <td>2 (SDA, SCL)</td>
                    <td>media</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Column>

          <Column width="half">
            <Box color="yellow" border="left" title="Errori tipici">
              <ul
                className="ref-list"
                style={{ fontSize: "var(--font-size-small)" }}
              >
                <li>
                  CPOL/CPHA <strong>diversi</strong> tra master e slave
                </li>
                <li>
                  CS dimenticato basso o tirato su <strong>troppo presto</strong>
                </li>
                <li>
                  letto <code>SPIxBUF</code> senza prima aver inviato un byte
                  fittizio
                </li>
                <li>
                  overflow: leggere il buffer prima di iniziare un nuovo
                  transfer per evitare <code>SPIROV = 1</code>
                </li>
                <li>
                  pin non configurati come digitali (<code>ANSEL</code> a 0)
                </li>
              </ul>
            </Box>
          </Column>
        </Row>
      </div>
    </Section>
  );
}
