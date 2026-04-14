import { Section, Row, Column, Box } from "@/components";
import { Download, Eye } from "lucide-react";

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
            PIC32 e quali pin/valori puoi usare.{" "}
            <a
              href="/downloads/microcontrollori/pic32mx370f512l-datasheet.pdf"
              target="_blank"
              rel="noreferrer"
              title="Apri anteprima datasheet"
              aria-label="Apri anteprima datasheet"
              style={{
                color: "var(--muted)",
                lineHeight: 0,
                display: "inline-flex",
                verticalAlign: "middle",
                marginLeft: "0.25rem",
              }}
            >
              <Eye size={7} strokeWidth={1.7} />
            </a>
            <a
              href="/downloads/microcontrollori/pic32mx370f512l-datasheet.pdf"
              download
              title="Scarica datasheet"
              aria-label="Scarica datasheet"
              style={{
                color: "var(--muted)",
                lineHeight: 0,
                display: "inline-flex",
                verticalAlign: "middle",
                marginLeft: "0.2rem",
              }}
            >
              <Download size={7} strokeWidth={1.7} />
            </a>
          </p>

          <p style={{ marginTop: "0.35rem" }}>
            <strong>Reference Manual</strong>: descrive in dettaglio registri,
            bit e funzionamento delle periferiche. <strong>Usalo</strong> quando
            programmi timer, UART, SPI, ADC, interrupt o PPS.{" "}
            <a
              href="/downloads/microcontrollori/pic32-reference-manual.pdf"
              target="_blank"
              rel="noreferrer"
              title="Apri anteprima reference manual"
              aria-label="Apri anteprima reference manual"
              style={{
                color: "var(--muted)",
                lineHeight: 0,
                display: "inline-flex",
                verticalAlign: "middle",
                marginLeft: "0.25rem",
              }}
            >
              <Eye size={7} strokeWidth={1.7} />
            </a>
            <a
              href="/downloads/microcontrollori/pic32-reference-manual.pdf"
              download
              title="Scarica reference manual"
              aria-label="Scarica reference manual"
              style={{
                color: "var(--muted)",
                lineHeight: 0,
                display: "inline-flex",
                verticalAlign: "middle",
                marginLeft: "0.2rem",
              }}
            >
              <Download size={7} strokeWidth={1.7} />
            </a>
          </p>
        </div>
      </Box>
    </Section>
  );
}
