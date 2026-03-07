import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function PuntatoriSection() {
  return (
    <Section title="8. Puntatori e Allocazione Dinamica">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Array e Puntatori">
            <CodeBlock language="c">{`// Array di 2 dimensioni
int (*pm)[2] // array di 2 dimensioni

// Array di puntatori
int *pm[2]   // array di puntatori a int

// Array di stringhe
char *table[3] = {"Blame", "Semicolon", "Dot"};`}</CodeBlock>
          </Box>
          <Box color="green" border="left" title="Passaggio costante">
            <CodeBlock language="c">{`void passaCostante(const int *num) {
    *num = 2; // ERRORE: non modificabile
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Allocazione dinamica">
            <CodeBlock language="c">{`#include <stdlib.h> // malloc, calloc, realloc, free

// malloc: alloca memoria NON inizializzata
int *p = malloc(5 * sizeof(int)); // valori spazzatura

// calloc: alloca E inizializza a zero
int *q = calloc(5, sizeof(int));  // tutti 0

// realloc: ridimensiona memoria esistente
p = realloc(p, 10 * sizeof(int));

// Sempre controllare NULL
if (p == NULL) { /* errore */ }

free(p); // libera memoria`}</CodeBlock>
          </Box>
          <Box color="red" border="left" title="qsort">
            <CodeBlock language="c">{`int compare(const void *a, const void *b) {
    return *(int *)a - *(int *)b;
}

int values[] = {40, 10, 100, 90, 20, 25};
qsort(values, 6, sizeof(int), compare);`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
