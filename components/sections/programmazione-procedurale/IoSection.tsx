import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function IoSection() {
  return (
    <Section title="3. Input/Output">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Funzioni I/O">
            <ul className="ref-list">
              <li><code>getchar()</code> legge un carattere</li>
              <li><code>putchar(c)</code> stampa un carattere</li>
              <li><code>puts(s)</code> stampa stringa + newline</li>
              <li><code>fgets(s, n, fp)</code> legge max n-1 char</li>
              <li><code>fputs(s, fp)</code> scrive stringa su file</li>
            </ul>
          </Box>
          <Box color="green" border="left" title="File">
            <CodeBlock language="c">{`FILE *fp = fopen("file.txt", "r");
// Modi: "r" read, "w" write, "a" append
fclose(fp);`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Esempi">
            <CodeBlock language="c">{`// Redirezione: ./a.out <in.txt >out.txt
while((c = getchar()) != EOF)
    putchar(c);

// Lettura stringhe
char str[100];
fgets(str, 100, stdin);`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
