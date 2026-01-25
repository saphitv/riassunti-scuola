import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function ConversioniSection() {
  return (
    <Section title="6. Conversioni di Tipo">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Semplici (stdlib.h)">
            <ul className="ref-list">
              <li><code>atoi(str)</code> str → int</li>
              <li><code>atof(str)</code> str → double</li>
              <li><code>atol(str)</code> str → long</li>
            </ul>
          </Box>
        </Column>
        <Column width="third">
          <Box color="green" border="left" title="Con controllo errori">
            <ul className="ref-list">
              <li><code>strtod(str, &end)</code></li>
              <li><code>strtof(str, &end)</code></li>
              <li><code>strtol(str, &end, base)</code></li>
            </ul>
            <p style={{fontSize: "5pt"}}>base: 10=dec, 16=hex, 0=auto</p>
          </Box>
        </Column>
        <Column width="third">
          <Box color="gray" border="left" title="Casting esplicito">
            <CodeBlock language="c">{`int a = 5, b = 2;
double r = (double)a / b;
// 2.5 invece di 2`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
