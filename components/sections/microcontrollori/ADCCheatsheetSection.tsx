import { Section, Row, Column, Box, MathBlock, CodeBlock } from "@/components/index";

export function ADCCheatsheetSection() {
  return (
    <Section title="ADC">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Cos'e un ADC">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                <strong>ADC</strong> = Analog to Digital Converter. Converte
                una <strong>tensione analogica</strong> in un{" "}
                <strong>numero intero</strong> proporzionale.
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                Sul PIC32 usato dal corso e un ADC <strong>10-bit</strong> a
                <strong> approssimazioni successive</strong> (SAR), con un{" "}
                <strong>multiplexer</strong> che seleziona uno tra i pin{" "}
                <code>ANx</code>.
              </p>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="Risoluzione & range">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <strong>10 bit</strong> -&gt; valori da{" "}
                <code>0</code> a <code>1023</code>
              </li>
              <li>
                riferimento di default:{" "}
                <code>V<sub>REF+</sub> = AVDD</code>,{" "}
                <code>V<sub>REF-</sub> = AVSS</code>
              </li>
              <li>
                <code>0 V</code> -&gt; <code>0</code>,{" "}
                <code>3.3 V</code> -&gt; <code>1023</code>
              </li>
            </ul>
            <MathBlock gap="sm" size="small">{`V_{in} = \\frac{ADC \\cdot V_{REF}}{1023}`}</MathBlock>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="Pin & setup base">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>ANSELxbits.ANSELx = 1</code> - pin{" "}
                <strong>analogico</strong>
              </li>
              <li>
                <code>TRISxbits.TRISx = 1</code> - pin in{" "}
                <strong>input</strong>
              </li>
              <li>
                seleziona il canale tramite <code>AD1CHSbits.CH0SA</code>
              </li>
              <li>
                <code>AD1CON1bits.ON = 1</code> per accendere il modulo
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
                  <th>Bit / Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>AD1CON1</code>
                  </td>
                  <td>controllo principale</td>
                  <td>
                    <code>ON</code>, <code>SAMP</code> (avvia sample),{" "}
                    <code>DONE</code> (conversione finita), <code>SSRC</code>{" "}
                    (sorgente trigger), <code>FORM</code> (formato risultato)
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>AD1CON2</code>
                  </td>
                  <td>riferimento e scansione</td>
                  <td>
                    <code>VCFG</code> (Vref), <code>CSCNA</code> (scan dei
                    canali), <code>SMPI</code> (numero campioni per IRQ)
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>AD1CON3</code>
                  </td>
                  <td>timing</td>
                  <td>
                    <code>ADRC</code> (clock interno),{" "}
                    <code>SAMC</code> (tempo di sampling), <code>ADCS</code>{" "}
                    (divisore clock di conversione)
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>AD1CHS</code>
                  </td>
                  <td>multiplexer di ingresso</td>
                  <td>
                    <code>CH0SA</code> = canale per il sample-and-hold
                    principale
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>AD1PCFG</code>
                  </td>
                  <td>config pin analogico</td>
                  <td>1 = digitale, 0 = analogico (logica invertita!)</td>
                </tr>
                <tr>
                  <td>
                    <code>ADC1BUF0..F</code>
                  </td>
                  <td>16 buffer di lettura</td>
                  <td>
                    contengono il risultato della conversione (10 bit, allineati
                    a destra)
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Sequenza di conversione">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <strong>Sampling</strong>: la capacita interna si carica
                al valore della tensione di ingresso (dura{" "}
                <code>SAMC</code> cicli)
              </li>
              <li>
                <strong>Hold</strong>: il sample &amp; hold si stacca
                dall&apos;ingresso
              </li>
              <li>
                <strong>Conversione</strong>: SAR a 10 bit, un bit per ciclo
              </li>
              <li>
                a fine: <code>DONE = 1</code>, risultato in{" "}
                <code>ADC1BUF0</code>, flag <code>AD1IF</code>
              </li>
            </ul>
            <p
              style={{
                fontSize: "var(--font-size-small)",
                marginTop: "0.35rem",
              }}
            >
              Trigger di fine sample (<code>SSRC</code>): manuale (
              <code>SAMP = 0</code>), Timer3 match, output compare, auto.
            </p>
          </Box>
        </Column>

        <Column width="half">
          <Box color="gray" border="left" title="Esempio C - lettura singola AN0">
            <CodeBlock language="c">{`void adc_init(void)
{
    AD1PCFGbits.PCFG0   = 0; // AN0 analogico
    TRISBbits.TRISB0    = 1; // input
    ANSELBbits.ANSB0    = 1; // analogico (PIC32MX3xx)

    AD1CON1bits.ON      = 0;
    AD1CON1bits.FORM    = 0; // intero unsigned 16-bit
    AD1CON1bits.SSRC    = 7; // auto-convert
    AD1CON1bits.ASAM    = 0; // sampling manuale
    AD1CON2bits.VCFG    = 0; // Vref = AVdd / AVss
    AD1CON2bits.SMPI    = 0; // 1 sample per IRQ
    AD1CON3bits.ADRC    = 0;
    AD1CON3bits.SAMC    = 16; // 16 Tad di sampling
    AD1CON3bits.ADCS    = 2;  // Tad = Tpb*(2*(ADCS+1))
    AD1CHSbits.CH0SA    = 0;  // canale AN0

    AD1CON1bits.ON      = 1;
}

unsigned int adc_read(void)
{
    AD1CON1bits.SAMP = 1;            // start sampling
    while (!AD1CON1bits.DONE);       // attesa conversione
    AD1CON1bits.DONE = 0;
    return ADC1BUF0;                 // 0..1023
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <div className="no-print">
        <Row>
          <Column width="auto">
            <Box color="blue" border="left" title="Conversione valore -> tensione">
              <p style={{ fontSize: "var(--font-size-small)" }}>
                Con <code>V<sub>REF</sub> = 3.3 V</code> e{" "}
                <code>ADC1BUF0 = 512</code>:
              </p>
              <MathBlock gap="sm" size="small">{`V_{in} = \\frac{512 \\cdot 3.3}{1023} \\approx 1.65\\,V`}</MathBlock>
              <p style={{ fontSize: "var(--font-size-small)" }}>
                <strong>LSB</strong> (un quanto) ={" "}
                <code>3.3 / 1023 ~= 3.22 mV</code>: e la risoluzione minima.
              </p>
            </Box>
          </Column>
        </Row>
      </div>
    </Section>
  );
}
