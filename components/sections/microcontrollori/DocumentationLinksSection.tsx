import { Box } from "@/components/index";
import { Download, Eye } from "lucide-react";
import Link from "next/link";

export function DocumentationLinksSection() {
  return (
    <div className="no-print">
      <Box color="purple" border="left" title="Documentazione utile">
        <div style={{ fontSize: "var(--font-size-small)" }}>
          <p>
            <strong>Datasheet</strong>: pinout, memoria, limiti elettrici e
            funzioni del chip. <strong>Usalo</strong> per capire cosa offre il
            PIC32 e quali pin/valori puoi usare.{" "}
            <Link
              href="/downloads/microcontrollori/pic32mx370f512l-datasheet.pdf"
              prefetch={false}
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
            </Link>
            <Link
              href="/downloads/microcontrollori/pic32mx370f512l-datasheet.pdf"
              prefetch={false}
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
            </Link>
          </p>

          <p style={{ marginTop: "0.35rem" }}>
            <strong>Reference Manual</strong>: descrive in dettaglio registri,
            bit e funzionamento delle periferiche. <strong>Usalo</strong> quando
            programmi timer, UART, SPI, ADC, interrupt o PPS.{" "}
            <Link
              href="/downloads/microcontrollori/pic32-reference-manual.pdf"
              prefetch={false}
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
            </Link>
            <Link
              href="/downloads/microcontrollori/pic32-reference-manual.pdf"
              prefetch={false}
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
            </Link>
          </p>
        </div>
      </Box>
    </div>
  );
}
