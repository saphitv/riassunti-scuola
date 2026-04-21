import { Section, Row, Column, Box, Note, CodeBlock } from "@/components/index";

export function StaticFunzioniSection() {
  return (
    <Section title="9. Static, Main e Puntatori a Funzione">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Variabili static">
            <CodeBlock language="c">{`void conta() {
    static int c = 0;
    c++;
    printf("%d\\n", c);
}
// La variabile resta
// tra le chiamate`}</CodeBlock>
            <Note>
              <code>static</code> mantiene il valore tra chiamate successive
            </Note>
          </Box>
        </Column>
        <Column width="third">
          <Box color="green" border="left" title="main con argomenti">
            <CodeBlock language="c">{`int main(int argc, char *argv[]) {
    // argc: numero argomenti
    // argv[0]: nome programma
    // argv[1..]: argomenti

    for (int i = 0; i < argc; i++)
        printf("%s\\n", argv[i]);
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="yellow" border="left" title="Puntatori a funzione">
            <CodeBlock language="c">{`double sqrt(float x);

// Dichiara puntatore
double (*fnptr)(float);

// Assegna funzione
fnptr = sqrt;

// Chiama tramite puntatore
double res = fnptr(4.0);`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
