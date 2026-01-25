import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function IncludesSection() {
  return (
    <Section title="1. Include e Librerie Standard">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Header principali">
            <CodeBlock language="c">{`#include <stdbool.h>  // bool, true, false
#include <math.h>     // sin, cos, sqrt, pow...
#include <stdio.h>    // printf, scanf, FILE...
#include <time.h>     // time_t, struct tm...
#include <ctype.h>    // isalnum, toupper, tolower...
#include <string.h>   // strlen, strcpy, strcat...
#include <stdlib.h>   // malloc, free, atoi, rand...
#include <limits.h>   // INT_MAX, INT_MIN...
#include <float.h>    // FLT_MAX, DBL_MAX...`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Funzioni ctype.h">
            <CodeBlock language="c">{`isalnum(c)  // alfanumerico?
isalpha(c)  // lettera?
isdigit(c)  // cifra 0-9?
islower(c)  // minuscola?
isupper(c)  // maiuscola?
isspace(c)  // spazio/tab/newline?
tolower(c)  // converti in minuscola
toupper(c)  // converti in maiuscola
toint(c)    // '5' -> 5`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
