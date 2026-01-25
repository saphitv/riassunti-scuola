import { Section, Row, Column, Box, Note, CodeBlock } from "@/components";

export function ConversioniSection() {
  return (
    <Section title="6. Conversioni di Tipo">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Funzioni semplici">
            <CodeBlock language="c">{`// stdlib.h - meno controllo sugli errori
int atoi(const char *str)     // stringa -> int
double atof(const char *str)  // stringa -> double
long atol(const char *str)    // stringa -> long`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Funzioni avanzate">
            <CodeBlock language="c">{`// Con controllo errori (endptr = primo char non valido)
double strtod(str, &endptr)
float strtof(str, &endptr)
long strtol(str, &endptr, base)

// base: 10 decimale, 16 hex, 0 auto-detect`}</CodeBlock>
          </Box>
        </Column>
      </Row>
      <Box color="gray" border="left" title="Casting esplicito">
        <CodeBlock language="c">{`(tipo) espressione

int a = 5, b = 2;
double result = (double)a / b;  // 2.5 invece di 2`}</CodeBlock>
      </Box>
    </Section>
  );
}
