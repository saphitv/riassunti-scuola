import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function MacroSection() {
  return (
    <Section title="Macro e Preprocessore">
      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Definizione macro">
            <CodeBlock language="c">{`// Costanti
#define PI 3.14159
#define MAX_SIZE 100

// Macro con parametri
#define QUADRATO(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

// Utilizzo
int area = QUADRATO(5);    // → 25
int m = MAX(10, 20);       // → 20`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Note importanti">
            <ul className="ref-list">
              <li>Le macro sono <strong>sostituzione testuale</strong></li>
              <li>Usare <code>()</code> attorno ai parametri!</li>
              <li><code>QUADRATO(x+1)</code> senza () → <code>x+1*x+1</code></li>
              <li>Nessun controllo sui tipi</li>
              <li><code>#undef NOME</code> rimuove la macro</li>
              <li>Convenzione: nomi in MAIUSCOLO</li>
            </ul>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
