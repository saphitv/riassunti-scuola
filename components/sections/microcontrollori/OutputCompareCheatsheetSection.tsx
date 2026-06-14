import { Section, Row, Column, Box, MathBlock, CodeBlock } from "@/components/index";

export function OutputCompareCheatsheetSection() {
  return (
    <Section title="Output Compare / PWM">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Cos'e Output Compare">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                Il modulo <strong>Output Compare</strong> (OC) confronta il
                contatore di un timer con un valore programmato e modifica il
                pin di uscita quando i due coincidono.
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                E&apos; il modo standard di generare <strong>impulsi</strong>{" "}
                e <strong>PWM</strong> senza sprecare CPU.
              </p>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="Cos'e PWM">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                <strong>PWM</strong> = Pulse Width Modulation. Onda quadra
                periodica con <strong>duty cycle</strong> variabile.
              </p>
              <ul className="ref-list" style={{ marginTop: "0.35rem" }}>
                <li>
                  <strong>periodo</strong> fissato dal timer (<code>PRy</code>)
                </li>
                <li>
                  <strong>duty</strong> impostato dal registro{" "}
                  <code>OCxRS</code>
                </li>
                <li>
                  controllo di LED (luminosita), motori, audio
                </li>
              </ul>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="OC sul PIC32">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <strong>5 moduli</strong>: <code>OC1 - OC5</code>
              </li>
              <li>
                clock da <code>Timer2</code> o <code>Timer3</code>
              </li>
              <li>
                pin selezionabili tramite <strong>PPS</strong>{" "}
                (<code>RPxnR = nOCx</code>)
              </li>
              <li>
                modalita: single pulse, dual pulse, <strong>PWM</strong>
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
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>OCxCON</code>
                  </td>
                  <td>controllo del modulo</td>
                  <td>
                    <code>ON</code> avvia, <code>OCM</code> modalita,{" "}
                    <code>OCTSEL</code> sceglie Timer2 (0) o Timer3 (1)
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>OCxR</code>
                  </td>
                  <td>valore di confronto</td>
                  <td>
                    primo confronto con <code>TMRy</code>; in PWM = duty iniziale
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>OCxRS</code>
                  </td>
                  <td>secondario / duty live</td>
                  <td>
                    in PWM e il <strong>duty cycle</strong> aggiornabile
                    a runtime
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>PRy</code>
                  </td>
                  <td>periodo del timer associato</td>
                  <td>
                    determina la <strong>frequenza</strong> della PWM
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Modalita di OCxCON.OCM">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>0b000</code> - modulo disabilitato
              </li>
              <li>
                <code>0b001</code> - active-low one-shot
              </li>
              <li>
                <code>0b010</code> - active-high one-shot
              </li>
              <li>
                <code>0b011</code> - toggle ad ogni match
              </li>
              <li>
                <code>0b100</code> - single pulse
              </li>
              <li>
                <code>0b101</code> - continuous pulse
              </li>
              <li>
                <code>0b110</code> - <strong>PWM senza fault pin</strong>
              </li>
              <li>
                <code>0b111</code> - PWM con fault pin
              </li>
            </ul>
          </Box>

          <Box color="blue" border="left" title="Formula PWM">
            <MathBlock gap="sm" size="small">{`T = \\frac{(PR_y + 1) \\cdot \\text{Prescaler}}{PBCLK}`}</MathBlock>
            <MathBlock gap="sm" size="small">{`f_{PWM} = \\frac{F_{PB}}{(PR_y + 1) \\cdot \\text{Prescaler}}`}</MathBlock>
            <MathBlock gap="sm" size="small">{`\\text{duty} = \\frac{OCxRS}{PR_y + 1}`}</MathBlock>
            <MathBlock gap="sm" size="small">{`V_{medio} \\approx D \\cdot V_H`}</MathBlock>
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>OCxRS = 0</code> -&gt; pin sempre <strong>basso</strong>
              </li>
              <li>
                <code>OCxRS = PRy + 1</code> -&gt; pin sempre{" "}
                <strong>alto</strong>
              </li>
              <li>
                risoluzione PWM: circa <code>log2(PRy + 1)</code> bit
              </li>
            </ul>
          </Box>
        </Column>

        <Column width="half">
          <Box
            color="gray"
            border="left"
            title="Esempio C - PWM su OC1 con Timer2"
          >
            <CodeBlock language="c">{`void pwm_oc1_init(unsigned int duty)
{
    // pin: assegna OC1 a un pin via PPS, p.es. RPD0
    TRISDbits.TRISD0 = 0;
    RPD0R = 12;     // OC1 (vedi tabella PPS)

    // Timer2: base tempi della PWM
    T2CONbits.ON    = 0;
    T2CONbits.TCKPS = 0b010;   // prescaler 1:4
    PR2  = 999;                 // 1000 step di duty
    TMR2 = 0;

    // OC1 in modo PWM (no fault), clock dal Timer2
    OC1CONbits.ON     = 0;
    OC1CONbits.OCTSEL = 0;     // Timer2
    OC1CONbits.OCM    = 0b110; // PWM senza fault
    OC1R   = duty;             // valore iniziale
    OC1RS  = duty;             // duty cycle live

    OC1CONbits.ON = 1;
    T2CONbits.ON  = 1;
}

void pwm_oc1_set_duty(unsigned int d)
{
    if (d > PR2 + 1) d = PR2 + 1;
    OC1RS = d;                 // aggiornamento atomico
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Esempio numerico">
            <p style={{ fontSize: "var(--font-size-small)" }}>
              Con <code>PBCLK = 10 MHz</code>, prescaler <code>1</code> e
              frequenza PWM <code>52.08 kHz</code>:
            </p>
            <MathBlock gap="sm" size="small">{`PR_2 = \\frac{PBCLK}{f_{PWM} \\cdot PRESC} - 1 \\approx 191`}</MathBlock>
            <MathBlock gap="sm" size="small">{`\\log_2(192) \\approx 7.6\\ \\text{bit}`}</MathBlock>
            <p style={{ fontSize: "var(--font-size-small)" }}>
              Frequenza piu alta significa periodo piu corto e quindi meno
              valori distinti di duty.
            </p>
          </Box>
        </Column>

        <Column width="half">
          <Box color="green" border="left" title="Servo e motori">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <strong>Servo RC</strong>: impulso alto ogni <code>20 ms</code>.
              </li>
              <li>
                <code>Ton ~= 0.5 ms</code> a <code>2.5 ms</code> imposta la
                posizione.
              </li>
              <li>
                alimentare il servo con <strong>5 V esterni</strong>, non dalla
                sola USB.
              </li>
              <li>
                <strong>Motore DC</strong>: PWM su H-bridge per velocita e
                direzione.
              </li>
            </ul>
          </Box>
        </Column>
      </Row>

      <div className="no-print">
        <Row>
          <Column width="auto">
            <Box color="green" border="left" title="Tipico flusso di lavoro">
              <ul
                className="ref-list"
                style={{ fontSize: "var(--font-size-small)" }}
              >
                <li>
                  scegli un <strong>timer</strong> (T2 / T3) e calcola{" "}
                  <code>PRy</code> per la frequenza desiderata
                </li>
                <li>
                  configura il pin di uscita: <code>TRISx = 0</code> e
                  assegna il modulo OC tramite <strong>PPS</strong>
                </li>
                <li>
                  imposta <code>OCxCON</code> in modo PWM (<code>OCM = 6</code>)
                  e <code>OCTSEL</code>
                </li>
                <li>
                  avvia prima <code>OCx</code>, poi il timer
                </li>
                <li>
                  modifica <code>OCxRS</code> a runtime per cambiare il duty
                </li>
              </ul>
            </Box>
          </Column>
        </Row>
      </div>
    </Section>
  );
}
