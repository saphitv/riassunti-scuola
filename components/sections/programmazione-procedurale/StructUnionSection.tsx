import { Section, Row, Column, Box, Note, CodeBlock } from "@/components/index";

export function StructUnionSection() {
  return (
    <Section title="7. Struct e Union">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Struct">
            <CodeBlock language="c">{`struct libro {
    char titolo[MAXTIT];
    float prezzo;
};
typedef struct libro Libro;

// Utilizzo
Libro lib[MAXLIB];
struct libro l;
fgets(lib.titolo, MAXTIT, stdin);
lib.prezzo = 2;

// Inizializzazione
struct Libro l1 = {"test", 2};
struct Libro l2 = {.titolo = "test", .prezzo = 2};`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Struct con Union">
            <CodeBlock language="c">{`struct shape {
    int type;
    union {
        struct circle circ;
        struct rectangle rect;
    };
    unsigned int flag:1; // 1 bit
};

// Union: stessa memoria per tutti i campi
// Solo un campo alla volta può avere valore`}</CodeBlock>
          </Box>
          <Box color="yellow" border="left" title="Passaggio per valore">
            <CodeBlock language="c">{`// Struct copiata (non puntatore)
Libro t(Libro a) {
    Libro res = {};
    return res;
}`}</CodeBlock>
            <Note>
              <code>(*ptr).x</code> equivale a <code>ptr-&gt;x</code>
            </Note>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
