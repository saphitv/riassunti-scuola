import { Section, Row, Column, Box, Note, CodeBlock } from "@/components/index";

export function StringheSection() {
  return (
    <Section title="5. Stringhe">
      <Row>
        <Column width="fourth">
          <Box color="blue" border="left" title="Dichiarazione">
            <CodeBlock language="c">{`// Fine stringa: '\\0'
char str1[10];
char str2[] = "abc";`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Funzioni base (string.h)">
            <ul className="ref-list">
              <li><code>strlen(s)</code> lunghezza (senza <code>\0</code>)</li>
              <li><code>strcpy(dest, src)</code> copia src in dest</li>
              <li><code>strncpy(dest, src, n)</code> copia max n char</li>
              <li><code>strcat(dest, src)</code> concatena src a dest</li>
              <li><code>strcmp(s1, s2)</code> confronta (0 = uguali)</li>
            </ul>
          </Box>
        </Column>
        <Column width="fourth">
          <Box color="yellow" border="left" title="Ricerca">
            <ul className="ref-list">
              <li><code>strchr(s, c)</code> prima occ.</li>
              <li><code>strrchr(s, c)</code> ultima occ.</li>
              <li><code>strstr(s, sub)</code> cerca sub</li>
            </ul>
          </Box>
        </Column>
      </Row>
      <Box color="red" border="left" title="Tokenizzazione">
        <CodeBlock language="c">{`char s[] = "uno,due,tre";
char *tok = strtok(s, ",");
while (tok != NULL) {
    printf("%s\\n", tok);
    tok = strtok(NULL, ",");  // continua
}`}</CodeBlock>
        <Note><code>strtok</code> modifica la stringa originale!</Note>
      </Box>
    </Section>
  );
}
