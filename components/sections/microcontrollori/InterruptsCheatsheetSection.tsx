import { Section, Row, Column, Box, CodeBlock } from "@/components/index";

export function InterruptsCheatsheetSection() {
  return (
    <Section title="Interrupt" forceFirstPage>
      <Row>
        <Column width="two-thirds">
          <Box color="blue" border="left" title="Cos'e un interrupt">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                Un <strong>interrupt</strong> e un evento interno o esterno che
                richiede attenzione immediata della CPU.
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                La CPU sospende il codice corrente, esegue la{" "}
                <strong>ISR</strong> (Interrupt Service Routine), poi riprende
                dal punto in cui era stata interrotta.
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                <strong>IRQ</strong> (Interrupt Request) e la richiesta inviata
                alla CPU; <strong>ISR</strong> e la funzione che gestisce quella
                richiesta.
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                Dentro una ISR fai solo operazioni brevi: evita chiamate a
                funzioni lente, <code>printf</code>, delay e busy-wait.
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                Il controller interrupt raccoglie IRQ, decide priorita e li
                invia alla CPU in ordine.
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                Su PIC32 gestisce fino a 96 sorgenti, 64 vettori, 7 priorita e
                4 sub-priorita.
              </p>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="Cosa succede su IRQ">
            <ul
              className="ref-list"
              style={{ fontSize: "var(--font-size-small)" }}
            >
              <li>salva il contesto corrente</li>
              <li>legge la Interrupt Vector Table</li>
              <li>salta alla ISR corretta</li>
              <li>esegue la ISR e ripristina il contesto</li>
              <li>continua il programma interrotto</li>
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
                    <code>INTSTAT</code>
                  </td>
                  <td>stato IRQ verso CPU</td>
                  <td>vettore e livello interrupt corrente</td>
                </tr>
                <tr>
                  <td>
                    <code>IPTMR</code>
                  </td>
                  <td>proximity timer</td>
                  <td>contatore usato dal controller interrupt</td>
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
                  <td>si setta anche se la sorgente non e abilitata</td>
                </tr>
                <tr>
                  <td>
                    <code>IPCx</code>
                  </td>
                  <td>Interrupt Priority Control</td>
                  <td>
                    <code>IP</code> 1-7, <code>IP=0</code> disabilita;{" "}
                    <code>IS</code> 0-3
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
          <Box color="purple" border="left" title="Esempio C">
            <CodeBlock language="c">{`#include <sys/attribs.h>

// Single-vector: una sola ISR per tutte le sorgenti.
// Dentro controlli i flag per capire quale interrupt e arrivato.
void __attribute__((interrupt(single), vector(0))) SingleVectorHandler(void)
{
    if (IFS0bits.T2IF) {
        // ...
        IFS0bits.T2IF = 0;
    }
}

// Multi-vector, alternativa 1: macro __ISR.
// 8 = Timer2 interrupt vector.
void __ISR(8, ipl1) Timer2IntHandler(void)
{
    // ...
    IFS0bits.T2IF = 0;
}

// Multi-vector, alternativa 2: attributi interrupt/vector.
void __attribute__((interrupt(ipl1), vector(8))) Timer2IntHandler(void)
{
    // ...
    IFS0bits.T2IF = 0;
}

// Multi-vector, alternativa 3: pragma interrupt.
#pragma interrupt Timer2IntHandler ipl1 vector 8
void Timer2IntHandler(void)
{
    // ...
    IFS0bits.T2IF = 0;
}`}</CodeBlock>
          </Box>
        </Column>

        <Column width="half">
          <Box
            color="gray"
            border="left"
            title="Esempio C - Timer2 toggla RA1 ogni 500 ms"
          >
            <p
              style={{
                fontSize: "var(--font-size-small)",
                marginBottom: "0.35rem",
              }}
            >
              ISR in XC32: <code>__ISR(...)</code> oppure attributi{" "}
              <code>interrupt/vector</code> o <code>#pragma interrupt</code>.
            </p>
            <CodeBlock language="c">{`// vector(8) = Timer2 interrupt vector
void __attribute__((interrupt(ipl1), vector(8))) Timer2IntHandler(void)
{
    LATAINV = 2;       // toggle RA1
    IFS0bits.T2IF = 0; // azzera interrupt flag
}

void timer2_init_irq(void)
{
    T2CONbits.ON    = 0;
    T2CONbits.T32   = 0;     // 16-bit
    T2CONbits.TCKPS = 0b111; // prescaler 1:256
    T2CONbits.TCS   = 0;     // PBCLK interno
    TMR2 = 0;
    PR2  = 39062;            // 500 ms con PBCLK = 20 MHz

    INTCONbits.MVEC = 1;     // multi-vector
    IPC2bits.T2IP   = 1;     // priorita 1
    IPC2bits.T2IS   = 0;     // sub-priorita 0
    IFS0bits.T2IF   = 0;     // azzera flag
    IEC0bits.T2IE   = 1;     // abilita sorgente

    __builtin_enable_interrupts();
    T2CONbits.ON = 1;
}

int main(void)
{
    timer2_init_irq();
    while (1) {
        // interrupt mode: lavoro fatto dalla ISR
    }
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

    </Section>
  );
}
