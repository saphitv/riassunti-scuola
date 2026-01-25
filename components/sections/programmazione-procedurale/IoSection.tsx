import { Section, Row, Column, Box, Note, CodeBlock } from "@/components";

export function IoSection() {
  return (
    <Section title="3. Input/Output">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="I/O da terminale">
            <CodeBlock language="c">{`// Lettura da file (./a.out <input.txt >output.txt)
while((c = getchar()) != EOF) {
    putchar(c);
}

// Lettura stringhe
char stringa[100];
printf("Introdurre una stringa: ");
fgets(stringa, 100, stdin);
puts(stringa);`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Funzioni I/O">
            <CodeBlock language="c">{`getchar()        // legge un carattere
putchar(c)       // stampa un carattere
gets(s)          // DEPRECATO - usa fgets
puts(s)          // stampa stringa + newline
fgets(s, n, fp)  // legge max n-1 char
fputs(s, fp)     // scrive stringa su file

// File
FILE *fp = fopen("file.txt", "r");
fclose(fp);`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
