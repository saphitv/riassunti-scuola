import { Section, Row, Column, Box, Note, CodeBlock } from "@/components";

export function StringheSection() {
  return (
    <Section title="5. Stringhe">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Dichiarazione">
            <CodeBlock language="c">{`// Fine stringa: '\\0'
char str1[10];
char str2[] = {'a','b','c'};
char str3[] = "abc";`}</CodeBlock>
          </Box>
        </Column>
        <Column width="two-thirds">
          <Box color="green" border="left" title="Funzioni base">
            <CodeBlock language="c">{`strcat(dest, src)        // concatena src a dest
strncat(dest, src, n)    // concatena max n char
strcmp(s1, s2)           // confronta (0 se uguali)
strncmp(s1, s2, n)       // confronta max n char
strcpy(dest, src)        // copia src in dest
strncpy(dest, src, n)    // copia max n char
strlen(s)                // lunghezza (senza '\\0')`}</CodeBlock>
          </Box>
        </Column>
      </Row>
      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Ricerca in stringhe">
            <CodeBlock language="c">{`// Cerca carattere
char *strchr(s, c)   // prima occorrenza di c
char *strrchr(s, c)  // ultima occorrenza di c

// Cerca sottostringhe
char *strstr(src, sub)  // cerca sub in src

// Conta caratteri
size_t strspn(s, set)   // char iniziali IN set
size_t strcspn(s, set)  // char iniziali NON in set
char *strpbrk(s, set)   // primo char nel set`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Tokenizzazione">
            <CodeBlock language="c">{`// Divide stringa per delimitatori
char *strtok(str, delim)

// Uso tipico
char s[] = "uno,due,tre";
char *tok = strtok(s, ",");
while (tok != NULL) {
    printf("%s\\n", tok);
    tok = strtok(NULL, ","); // continua
}`}</CodeBlock>
            <Note>
              <code>strtok</code> modifica la stringa originale!
            </Note>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
