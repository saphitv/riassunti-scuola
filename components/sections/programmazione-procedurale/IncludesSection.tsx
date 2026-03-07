import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function IncludesSection() {
  return (
    <Section title="1. Include e Librerie Standard">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Header principali">
            <CodeBlock language="c">{`#include <stdbool.h>  // bool, true, false
#include <stdio.h>    // printf, scanf, FILE
#include <stdlib.h>   // malloc, free, atoi, rand
#include <string.h>   // strlen, strcpy, strcat
#include <math.h>     // sin, cos, sqrt, pow
#include <time.h>     // time_t, struct tm
#include <ctype.h>    // isalnum, toupper...
#include <limits.h>   // INT_MAX, INT_MIN
#include <float.h>    // FLT_MAX, DBL_MAX
`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Funzioni ctype.h">
            <ul className="ref-list">
              <li><code>isalnum(c)</code> alfanumerico?</li>
              <li><code>isalpha(c)</code> lettera?</li>
              <li><code>isdigit(c)</code> cifra 0-9?</li>
              <li><code>islower(c)</code> / <code>isupper(c)</code></li>
              <li><code>isspace(c)</code> spazio/tab/newline?</li>
              <li><code>tolower(c)</code> / <code>toupper(c)</code></li>
              <li><code>c - &apos;0&apos;</code> char → int (<code>&apos;5&apos;</code> → 5)</li>
            </ul>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
