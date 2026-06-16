import { Section, Row, Column, Box, MathBlock, CodeBlock } from "@/components/index";

export function ADCTest2Section() {
  return (
    <Section title="ADC">
      {adcOverviewCards}
      {adcRegistersTable}
      {adcConversionAndCode}
      {adcVoltageExample}
    </Section>
  );
}

const adcOverviewCards = (
  <Row>
    <Column width="fourth">
      <Box color="blue" border="left" title="Informazioni generali">
        <div style={{ fontSize: "var(--font-size-small)" }}>
          <p>
            <strong>ADC</strong> = Analog to Digital Converter. Converte una{" "}
            <strong>tensione analogica</strong> in un{" "}
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

    <Column width="fourth">
      <Box color="purple" border="left" title="Campionamento">
        <p style={{ fontSize: "var(--font-size-small)" }}>
          Il <strong>campionamento</strong> misura il segnale in istanti
          discreti: l&apos;ADC prende un valore ogni periodo{" "}
          <code>T<sub>s</sub></code>, quindi con frequenza{" "}
          <code>f<sub>s</sub></code>.
        </p>
        <p style={{ fontSize: "var(--font-size-small)", marginTop: "0.35rem" }}>
          Nel PIC il <strong>sample-and-hold</strong> carica una capacita alla
          tensione del pin selezionato, poi la isola durante la conversione. Il
          tempo di acquisizione deve bastare per caricarla correttamente.
        </p>
        <MathBlock gap="sm" size="small">{`f_s=\\frac{1}{T_s}`}</MathBlock>
      </Box>
    </Column>

    <Column width="half">
      <Box color="green" border="left" title="Fondo scala & risoluzione">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.35rem 0.6rem",
            fontSize: "var(--font-size-small)",
          }}
        >
          <p>
            <strong>Fondo scala:</strong> intervallo di tensioni codificabile,
            da <code>V<sub>REF-</sub></code> a{" "}
            <code>V<sub>REF+</sub></code>.
          </p>
          <p>
            <strong>Saturazione:</strong> sotto <code>V<sub>REF-</sub></code>{" "}
            si legge circa <code>0</code>; sopra{" "}
            <code>V<sub>REF+</sub></code> il codice massimo.
          </p>
          <p>
            <strong>Risoluzione:</strong> con <code>n</code> bit ci sono{" "}
            <code>2^n</code> codici, numerati da <code>0</code> a{" "}
            <code>2^n - 1</code>.
          </p>
          <p>
            <strong>LSB:</strong> salto di tensione tra due codici consecutivi;
            piu bit significa passo piu piccolo.
          </p>
          <p style={{ gridColumn: "1 / -1" }}>
            <strong>PIC32 10 bit:</strong> codici <code>0..1023</code>; con{" "}
            <code>V<sub>FS</sub> = 3.3 V</code>,{" "}
            <code>1 LSB ~= 3.22 mV</code>. Per stimare la tensione si scala il
            codice letto sul codice massimo.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            columnGap: "0.6rem",
          }}
        >
          <div>
            <MathBlock gap="sm" size="small">{`V_{FS}=V_{REF+}-V_{REF-}`}</MathBlock>
            <MathBlock gap="sm" size="small">{`1\\,LSB \\approx \\frac{V_{FS}}{2^n}`}</MathBlock>
          </div>
          <MathBlock gap="sm" size="small">{`V_{in} \\approx V_{REF-}+\\frac{ADC}{2^n-1}V_{FS}`}</MathBlock>
        </div>
      </Box>
    </Column>
  </Row>
);

const adcRegistersTable = (
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
                <code>ADRC</code> (clock interno), <code>SAMC</code> (tempo di
                sampling), <code>ADCS</code> (divisore clock di conversione)
              </td>
            </tr>
            <tr>
              <td>
                <code>AD1CHS</code>
              </td>
              <td>multiplexer di ingresso</td>
              <td>
                <code>CH0SA</code> = canale per il sample-and-hold principale
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
                <code>ANSEL/TRIS</code>
              </td>
              <td>config pin</td>
              <td>
                pin analogico e in input prima di leggere il canale{" "}
                <code>ANx</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>ADC1BUF0..F</code>
              </td>
              <td>16 buffer di lettura</td>
              <td>
                contengono il risultato della conversione (10 bit, allineati a
                destra)
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Column>
  </Row>
);

const adcConversionAndCode = (
  <Row>
    <Column width="half">
      <Box color="red" border="left" title="Errori non ideali">
        <table className="comparison-table">
          <tbody>
            <tr>
              <td>
                <strong>Offset</strong>
              </td>
              <td>curva traslata rispetto allo zero ideale</td>
            </tr>
            <tr>
              <td>
                <strong>Gain</strong>
              </td>
              <td>pendenza errata: fondo scala prima/dopo l&apos;ideale</td>
            </tr>
            <tr>
              <td>
                <strong>DNL</strong>
              </td>
              <td>ampiezza dei codici non uniforme</td>
            </tr>
            <tr>
              <td>
                <strong>INL</strong>
              </td>
              <td>deviazione cumulata dalla retta ideale</td>
            </tr>
          </tbody>
        </table>
      </Box>

      <Box color="purple" border="left" title="Sequenza di conversione">
        <ul className="ref-list" style={{ fontSize: "var(--font-size-small)" }}>
          <li>
            <strong>Sampling</strong>: la capacita interna si carica al valore
            di ingresso per <code>SAMC</code> cicli
          </li>
          <li>
            <strong>Hold</strong>: il sample &amp; hold si stacca
            dall&apos;ingresso
          </li>
          <li>
            <strong>Conversione</strong>: il SAR prova i bit da MSB a LSB con
            DAC + comparatore, come una ricerca binaria
          </li>
          <li>
            a fine: <code>DONE = 1</code>, risultato in <code>ADC1BUF0</code>,
            flag <code>AD1IF</code>
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
);

const adcVoltageExample = (
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
            <code>3.3 / 1024 ~= 3.22 mV</code>: e la risoluzione minima.
          </p>
        </Box>
      </Column>
    </Row>
  </div>
);
