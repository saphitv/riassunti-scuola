import { Section, Row, Column, Box, MathBlock, CodeBlock } from "@/components/index";

export function I2CCheatsheetSection() {
  return (
    <Section title="I2C">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Bus a 2 fili">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                <strong>I2C</strong> e una comunicazione seriale sincrona per IC
                vicini. Il master genera il clock e indirizza gli slave.
              </p>
              <ul className="ref-list" style={{ marginTop: "0.35rem" }}>
                <li>
                  <code>SDA</code>: dati bidirezionali
                </li>
                <li>
                  <code>SCL</code>: clock
                </li>
                <li>
                  linee <strong>open-drain</strong>: servono pull-up
                </li>
                <li>
                  indirizzi slave a <strong>7 bit</strong> o 10 bit
                </li>
              </ul>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="Schema elettrico">
            <CodeBlock language="schema">{`3.3 V
 |        |
 Rp       Rp
 |        |
SDA------ SDA slave 1 --- SDA slave 2
SCL------ SCL slave 1 --- SCL slave 2
 |
PIC32 master

Nessuno forza alto: i dispositivi tirano solo basso.`}</CodeBlock>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="Eventi bus">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <strong>Idle</strong>: <code>SDA = 1</code>,{" "}
                <code>SCL = 1</code>
              </li>
              <li>
                <strong>Start</strong>: SDA scende mentre SCL e alto
              </li>
              <li>
                <strong>Data</strong>: SDA stabile quando SCL e alto
              </li>
              <li>
                <strong>ACK</strong>: ricevitore tira SDA bassa al 9o clock
              </li>
              <li>
                <strong>Stop</strong>: SDA sale mentre SCL e alto
              </li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="auto">
          <Box color="gray" border="left" title="Registri principali PIC32">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Registro</th>
                  <th>Funzione</th>
                  <th>Bit / uso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>I2CxCON</code>
                  </td>
                  <td>controllo master/slave</td>
                  <td>
                    <code>ON</code>, <code>SEN</code> start,{" "}
                    <code>RSEN</code> restart, <code>PEN</code> stop,{" "}
                    <code>ACKEN</code>, <code>ACKDT</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>I2CxSTAT</code>
                  </td>
                  <td>stato bus</td>
                  <td>
                    <code>TRSTAT</code> trasmissione in corso,{" "}
                    <code>ACKSTAT</code> = 1 se NACK
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>I2CxBRG</code>
                  </td>
                  <td>baud-rate generator</td>
                  <td>imposta 100 kHz o 400 kHz da PBCLK</td>
                </tr>
                <tr>
                  <td>
                    <code>I2CxTRN</code>
                  </td>
                  <td>byte in trasmissione</td>
                  <td>scrivere qui avvia l&apos;invio di 8 bit</td>
                </tr>
                <tr>
                  <td>
                    <code>I2CxRCV</code>
                  </td>
                  <td>byte ricevuto</td>
                  <td>leggere dopo ricezione completata</td>
                </tr>
                <tr>
                  <td>
                    <code>I2CxADD</code>, <code>I2CxMSK</code>
                  </td>
                  <td>indirizzo/mask slave</td>
                  <td>usati quando il PIC32 lavora da slave</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Transazioni standard">
            <p style={{ fontSize: "var(--font-size-small)" }}>
              <strong>Write registro</strong>
            </p>
            <CodeBlock language="schema">{`START
addr + W  ACK
reg       ACK
value     ACK
STOP`}</CodeBlock>

            <p style={{ fontSize: "var(--font-size-small)", marginTop: "0.35rem" }}>
              <strong>Read registro</strong>: prima si scrive l&apos;indirizzo
              del registro, poi repeated start e lettura. In I2C{" "}
              <code>R/W = 1</code> significa <strong>read</strong>.
            </p>
            <CodeBlock language="schema">{`START
addr + W  ACK
reg       ACK
RESTART
addr + R  ACK
data      NACK
STOP`}</CodeBlock>
          </Box>

          <Box color="blue" border="left" title="Formula baud rate">
            <MathBlock gap="sm" size="small">{`I2CxBRG = \\left[\\left(\\frac{1}{2F_{SCK}} - T_{PGD}\\right) \\cdot PBCLK\\right] - 2`}</MathBlock>
            <p style={{ fontSize: "var(--font-size-small)" }}>
              Se una periferica non risponde, controllare indirizzo, pull-up,
              velocita bus e se <code>ACKSTAT</code> segnala NACK.
            </p>
          </Box>
        </Column>

        <Column width="half">
          <Box color="gray" border="left" title="Esempio C - lettura MMA8652FC">
            <CodeBlock language="c">{`#define ACC_ADDR 0x1D      // indirizzo 7 bit

void i2c_master_setup(void)
{
    I2C2CONbits.ON = 0;
    I2C2BRG = 37;             // esempio: ~400 kHz con PBCLK adatto
    I2C2CONbits.ON = 1;
}

static void i2c_wait(void)
{
    while (I2C2CON & 0x1F);    // start/restart/stop/ack/recv busy
    while (I2C2STATbits.TRSTAT);
}

void i2c_start(void)   { I2C2CONbits.SEN = 1;  i2c_wait(); }
void i2c_restart(void) { I2C2CONbits.RSEN = 1; i2c_wait(); }
void i2c_stop(void)    { I2C2CONbits.PEN = 1;  i2c_wait(); }

int i2c_send(unsigned char byte)
{
    I2C2TRN = byte;
    i2c_wait();
    return I2C2STATbits.ACKSTAT;   // 0 = ACK, 1 = NACK
}

unsigned char i2c_recv(void)
{
    I2C2CONbits.RCEN = 1;
    while (!I2C2STATbits.RBF);
    return I2C2RCV;
}

void i2c_ack(int nack)
{
    I2C2CONbits.ACKDT = nack;      // 0 ACK, 1 NACK
    I2C2CONbits.ACKEN = 1;
    i2c_wait();
}

unsigned char accel_read(unsigned char reg)
{
    unsigned char value;

    i2c_start();
    i2c_send((ACC_ADDR << 1) | 0); // write: seleziona registro
    i2c_send(reg);

    i2c_restart();
    i2c_send((ACC_ADDR << 1) | 1); // read: legge dal registro
    value = i2c_recv();
    i2c_ack(1);                    // NACK: ultimo byte
    i2c_stop();

    return value;
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
