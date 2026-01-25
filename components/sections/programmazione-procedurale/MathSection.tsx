import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function MathSection() {
  return (
    <Section title="4. Funzioni Matematiche e Random">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="math.h">
            <CodeBlock language="c">{`sin(x), cos(x), tan(x)
exp(x)              // e^x
log(x)              // ln(x)
log10(x)            // log base 10
pow(x, y)           // x^y
sqrt(x)             // radice quadrata
ceil(x)             // arrotonda per eccesso
floor(x)            // arrotonda per difetto
fabs(x)             // valore assoluto (double)`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Numeri casuali">
            <CodeBlock language="c">{`#include <stdlib.h>
#include <time.h>

// Inizializza il seed
srand(time(NULL));

// Genera numero casuale
int n = rand() % MAX_NUM + 1;
// Genera tra 0 e MAX_NUM incluso`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
