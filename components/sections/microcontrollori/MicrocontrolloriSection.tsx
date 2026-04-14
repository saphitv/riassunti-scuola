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

      <Box color="purple" border="left" title="Documentazione utile">
        <div style={{ fontSize: "var(--font-size-small)" }}>
          <p>
            <strong>Datasheet</strong>: pinout, memoria, limiti elettrici e
            funzioni del chip. <strong>Usalo</strong> per capire cosa offre il
            PIC32 e quali pin/valori puoi usare.
          </p>
          <p style={{ marginTop: "0.15rem" }}>
            <a href="/downloads/microcontrollori/pic32mx370f512l-datasheet.pdf" download>
              Scarica il datasheet del PIC32MX370F512L
            </a>
          </p>

          <p style={{ marginTop: "0.35rem" }}>
            <strong>Reference Manual</strong>: descrive in dettaglio registri,
            bit e funzionamento delle periferiche. <strong>Usalo</strong> quando
            programmi timer, UART, SPI, ADC, interrupt o PPS.
          </p>
          <p style={{ marginTop: "0.15rem" }}>
            <a href="/downloads/microcontrollori/pic32-reference-manual.pdf" download>
              Scarica il PIC32 Reference Manual
            </a>
          </p>
        </div>
      </Box>
    </Section>
  );
}
