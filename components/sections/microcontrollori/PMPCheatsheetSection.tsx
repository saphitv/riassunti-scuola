import { Section, Row, Column, Box, CodeBlock } from "@/components/index";

export function PMPCheatsheetSection() {
  return (
    <Section title="Parallel Master Port / LCD">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="A cosa serve">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                Il <strong>PMP</strong> e una porta parallela configurabile a{" "}
                <strong>8 o 16 bit</strong> per parlare con periferiche esterne:
                LCD, memorie, altri microcontrollori o interfacce di
                comunicazione.
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                Nel laboratorio viene usato come bus a 8 bit verso il controller
                di un <strong>LCD 2x16</strong>.
              </p>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="Collegamento LCD">
            <CodeBlock language="schema">{`PIC32 PMP                 LCD 2x16
PMD0..PMD7  ----------->  D0..D7
PMA0        ----------->  RS  (0 cmd, 1 data)
RD5         ----------->  R/W (0 write, 1 read)
RD4         ----------->  E   (enable strobe)
GND, 5 V, V0 ---------->  power + contrast`}</CodeBlock>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="Idea temporale">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                LCD lento: inserire <strong>wait state</strong> generosi.
              </li>
              <li>
                <code>PMA0</code> sceglie registro istruzioni/dati.
              </li>
              <li>
                <code>PMD0..7</code> porta il byte.
              </li>
              <li>
                <code>RD4</code> genera lo strobe di enable.
              </li>
              <li>
                Non scrivere se il <strong>busy flag</strong> e alto.
              </li>
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
                  <th>Uso tipico con LCD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>PMCON</code>
                  </td>
                  <td>abilitazione e linee di controllo</td>
                  <td>
                    <code>ON</code>, modo master, enable attivo alto, linee{" "}
                    <code>RD</code>/<code>WR</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>PMMODE</code>
                  </td>
                  <td>larghezza bus e wait states</td>
                  <td>
                    <code>MODE16 = 0</code>, <code>WAITB</code>,{" "}
                    <code>WAITM</code>, <code>WAITE</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>PMADDR</code>
                  </td>
                  <td>indirizzo periferica</td>
                  <td>
                    bit <code>PMA0</code>: <code>0</code> comandi,{" "}
                    <code>1</code> dati
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>PMDIN</code>/<code>PMDOUT</code>
                  </td>
                  <td>dato letto/scritto sul bus</td>
                  <td>byte verso/da LCD</td>
                </tr>
                <tr>
                  <td>
                    <code>PMSTAT</code>
                  </td>
                  <td>stato FIFO/bus</td>
                  <td>
                    controlla se PMP e occupato prima di leggere o scrivere
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>PMAEN</code>
                  </td>
                  <td>abilita pin indirizzo</td>
                  <td>
                    abilita <code>PMA0</code> come register-select LCD
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Scrittura verso LCD">
            <ol
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                attendi che il controller LCD non sia <strong>busy</strong>
              </li>
              <li>
                imposta <code>PMADDRbits.ADDR = 0</code> per comando oppure{" "}
                <code>1</code> per dato
              </li>
              <li>
                scrivi il byte in <code>PMDIN</code>/<code>PMDOUT</code>
              </li>
              <li>
                il PMP mette dati e segnali sul bus e genera lo strobe
              </li>
              <li>aspetta la fine del ciclo prima della prossima operazione</li>
            </ol>
          </Box>

          <Box color="blue" border="left" title="Mini API da ricordare">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>LCDinit()</code>: configura PMP e inizializza display.
              </li>
              <li>
                <code>busyLCD()</code>: legge il busy flag.
              </li>
              <li>
                <code>cmdLCD()</code>: invia comandi come clear/home.
              </li>
              <li>
                <code>putLCD()</code>, <code>putsLCD()</code>: scrivono testo.
              </li>
            </ul>
          </Box>
        </Column>

        <Column width="half">
          <Box color="gray" border="left" title="Esempio C - PMP + LCD 2x16">
            <CodeBlock language="c">{`#define LCD_CMD   0
#define LCD_DATA  1

static void lcd_wait_pmp(void)
{
    while (PMMODEbits.BUSY);       // ciclo PMP ancora attivo
}

void lcd_pmp_init(void)
{
    PMCONbits.ON = 0;

    PMCONbits.PTWREN = 1;          // abilita write strobe
    PMCONbits.PTRDEN = 1;          // abilita read strobe
    PMCONbits.CSF = 0;             // no chip select
    PMCONbits.ADRMUX = 0;          // indirizzi e dati separati

    PMMODEbits.MODE16 = 0;         // bus dati 8 bit
    PMMODEbits.MODE = 0b10;        // master mode 2
    PMMODEbits.WAITB = 3;          // setup before strobe
    PMMODEbits.WAITM = 15;         // durata strobe
    PMMODEbits.WAITE = 3;          // hold after strobe

    PMAENbits.PTEN0 = 1;           // PMA0 = RS LCD
    PMADDRbits.ADDR = LCD_CMD;
    PMCONbits.ON = 1;
}

unsigned char read_lcd(unsigned char reg)
{
    PMADDRbits.ADDR = reg;         // 0 = status, 1 = data
    lcd_wait_pmp();
    return PMDIN;                  // avvia lettura PMP
}

int busy_lcd(void)
{
    return (read_lcd(LCD_CMD) & 0x80) != 0;
}

void write_lcd(unsigned char reg, unsigned char value)
{
    while (busy_lcd());
    PMADDRbits.ADDR = reg;
    PMDIN = value;                 // avvia scrittura PMP
    lcd_wait_pmp();
}

void cmd_lcd(unsigned char cmd)  { write_lcd(LCD_CMD, cmd); }
void put_lcd(char c)             { write_lcd(LCD_DATA, c);  }

void puts_lcd(const char *s)
{
    while (*s) put_lcd(*s++);
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
