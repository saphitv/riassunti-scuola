import { Section, Row, Column, Box, CodeBlock } from "@/components/index";

export function MathSection() {
  return (
    <Section title="4. Funzioni Matematiche e Random">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="math.h">
            <ul className="ref-list">
              <li><code>sin(x)</code>, <code>cos(x)</code>, <code>tan(x)</code></li>
              <li><code>exp(x)</code> e^x</li>
              <li><code>log(x)</code> ln(x)</li>
              <li><code>log10(x)</code> log base 10</li>
              <li><code>pow(x, y)</code> x^y</li>
              <li><code>sqrt(x)</code> radice quadrata</li>
              <li><code>ceil(x)</code> arrotonda per eccesso</li>
              <li><code>floor(x)</code> arrotonda per difetto</li>
              <li><code>fabs(x)</code> valore assoluto</li>
            </ul>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Numeri casuali">
            <CodeBlock language="c">{`#include <stdlib.h>
#include <time.h>

srand(time(NULL));  // init seed
int n = rand() % MAX + 1;  // [1, MAX]`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
