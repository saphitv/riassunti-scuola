import { Section, Row, Column, Box, CodeBlock } from "@/components/index";

export function InterruptsCheatsheetSection() {
  return (
    <Section title="Interrupt" forceFirstPage>
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Cos'e un interrupt">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                Un <strong>interrupt</strong> e un segnale hardware che sospende
                il flusso normale del programma per servire un evento urgente
                tramite una <strong>ISR</strong> (Interrupt Service Routine).
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                Permette di reagire ad eventi esterni (pin, timer, periferiche)
                senza fare <strong>polling</strong> continuo.
              </p>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="Sorgenti tipiche">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <strong>External</strong> - pin <code>INTx</code>
              </li>
              <li>
                <strong>Change Notification</strong> - cambio livello GPIO
              </li>
              <li>
                <strong>Timer</strong> - <code>TxIF</code> ad ogni periodo
              </li>
              <li>
                <strong>UART / SPI / I2C</strong> - dato pronto / TX vuoto
              </li>
              <li>
                <strong>ADC</strong> - conversione completata
              </li>
              <li>
                <strong>Output / Input Compare</strong>
              </li>
            </ul>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="Vantaggi vs polling">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                CPU <strong>libera</strong> tra un evento e l&apos;altro
              </li>
              <li>
                <strong>latenza</strong> minima nel rispondere
              </li>
              <li>
                priorita - eventi importanti possono <strong>preempt</strong>
              </li>
              <li>
                meno consumo - si puo entrare in <strong>sleep</strong>
              </li>
            </ul>
          </Box>
        </Column>
      </Row>

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
                    <code>INTCON</code>
                  </td>
                  <td>controllo globale interrupt</td>
                  <td>
                    <code>MVEC</code> = 1 abilita modalita{" "}
                    <strong>multi-vector</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>IECx</code>
                  </td>
                  <td>Interrupt Enable</td>
                  <td>1 bit per sorgente: 1 = abilita</td>
                </tr>
                <tr>
                  <td>
                    <code>IFSx</code>
                  </td>
                  <td>Interrupt Flag Status</td>
                  <td>flag che si setta quando l&apos;evento accade</td>
                </tr>
                <tr>
                  <td>
                    <code>IPCx</code>
                  </td>
                  <td>Interrupt Priority Control</td>
                  <td>
                    <code>IP</code> 0-7 (priorita), <code>IS</code> 0-3
                    (sub-priorita)
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>IPL</code>
                  </td>
                  <td>livello priorita CPU</td>
                  <td>la CPU serve solo IRQ con priorita {">"} IPL</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Setup tipico">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>
                <code>INTCONbits.MVEC = 1</code> - abilita multi-vector
              </li>
              <li>
                <code>IPCxbits.XXIP = priorita</code> (1 - 7)
              </li>
              <li>
                <code>IPCxbits.XXIS = sub</code> (0 - 3)
              </li>
              <li>
                <code>IFSxbits.XXIF = 0</code> - azzera flag
              </li>
              <li>
                <code>IECxbits.XXIE = 1</code> - abilita sorgente
              </li>
              <li>
                <code>__builtin_enable_interrupts()</code>
              </li>
            </ul>
            <p
              style={{
                fontSize: "var(--font-size-small)",
                marginTop: "0.35rem",
              }}
            >
              <strong>Importante</strong>: dentro la ISR azzera sempre il flag{" "}
              <code>IFSxbits.XXIF = 0</code>, altrimenti l&apos;interrupt scatta
              di nuovo.
            </p>
          </Box>
        </Column>

        <Column width="half">
          <Box
            color="gray"
            border="left"
            title="Esempio C - ISR Timer2 (priorita 2)"
          >
            <CodeBlock language="c">{`void __ISR(_TIMER_2_VECTOR, IPL2SOFT) Timer2ISR(void)
{
    // azione periodica
    LATDbits.LATD0 = ~LATDbits.LATD0;

    // azzera SEMPRE il flag, altrimenti
    // l'interrupt si ripresenta subito
    IFS0bits.T2IF = 0;
}

void timer2_init_irq(void)
{
    T2CONbits.ON    = 0;
    T2CONbits.TCKPS = 0b111; // prescaler 1:256
    PR2  = 312;
    TMR2 = 0;

    INTCONbits.MVEC = 1;     // multi-vector
    IPC2bits.T2IP   = 2;     // priorita 2
    IPC2bits.T2IS   = 0;     // sub-priorita 0
    IFS0bits.T2IF   = 0;     // azzera flag
    IEC0bits.T2IE   = 1;     // abilita sorgente

    __builtin_enable_interrupts();
    T2CONbits.ON = 1;
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <div className="no-print">
        <Row>
          <Column width="auto">
            <Box color="green" border="left" title="Cosa fare in una ISR">
              <ul
                className="ref-list"
                style={{ fontSize: "var(--font-size-small)" }}
              >
                <li>
                  <strong>breve</strong> - solo l&apos;essenziale, zero ritardi
                </li>
                <li>
                  azzerare il <strong>flag</strong> della sorgente
                </li>
                <li>
                  aggiornare flag / contatori da leggere nel{" "}
                  <code>main</code> (variabili <code>volatile</code>)
                </li>
                <li>
                  evitare <code>printf</code>, allocazioni dinamiche, busy-wait
                </li>
              </ul>
            </Box>
          </Column>
        </Row>
      </div>
    </Section>
  );
}
