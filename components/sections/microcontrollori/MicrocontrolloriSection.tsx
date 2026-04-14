import { Section, Row, Column, Box } from "@/components";

export function MicrocontrolloriSection() {
  return (
    <Section title="Ripasso lampo" forceFirstPage>
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="µP / µC / Embedded">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                <strong>µP</strong>: CPU, di solito con memoria/periferiche esterne
              </p>
              <p>
                <strong>µC</strong>: computer su chip = CPU + memoria + I/O + periferiche
              </p>
              <p>
                <strong>Embedded</strong>: dispositivo con µC che usa sensori/attuatori
              </p>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="green" border="left" title="PIC32 del corso">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                <strong>PIC32</strong>: famiglia Microchip a 32 bit
              </p>
              <p>
                <strong>Architettura</strong>: MIPS
              </p>
              <p>
                <strong>Board</strong>: Digilent Basys MX3
              </p>
              <p>
                <strong>Microcontrollore</strong>: PIC32MX370F512L
              </p>
            </div>
          </Box>
        </Column>

        <Column width="third">
          <Box color="yellow" border="left" title="Blocchi / periferiche">
            <div style={{ fontSize: "var(--font-size-small)" }}>
              <p>
                Flash = programma | SRAM = dati
              </p>
              <p>
                GPIO / I-O | Timer
              </p>
              <p>
                UART, SPI, I2C | ADC
              </p>
              <p>
                Interrupt | DMA
              </p>
              <p>
                Watchdog / RTCC
              </p>
              <p>
                PPS = remap funzioni periferiche su pin
              </p>
            </div>
          </Box>
        </Column>
      </Row>

      <Box color="gray" border="left" title="Nota">
        <p style={{ fontSize: "var(--font-size-small)" }}>
          System bus e peripheral bus possono lavorare con clock diversi.
        </p>
      </Box>
    </Section>
  );
}
