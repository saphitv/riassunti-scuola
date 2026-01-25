import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function IoSection() {
  return (
    <Section title="3. Input/Output e File">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Funzioni I/O base">
            <ul className="ref-list">
              <li><code>getchar()</code> / <code>putchar(c)</code> carattere</li>
              <li><code>fgetc(fp)</code> / <code>fputc(c, fp)</code> char da file</li>
              <li><code>getc(fp)</code> / <code>putc(c, fp)</code> macro</li>
              <li><code>ungetc(c, fp)</code> rimette char nel buffer</li>
              <li><code>fgets(s, n, fp)</code> / <code>fputs(s, fp)</code> stringhe</li>
              <li><code>fscanf(fp, fmt, ...)</code> / <code>fprintf(fp, fmt, ...)</code></li>
            </ul>
          </Box>
          <Box color="green" border="left" title="Modi apertura file">
            <ul className="ref-list">
              <li><code>&quot;r&quot;</code> lettura (file deve esistere)</li>
              <li><code>&quot;w&quot;</code> scrittura (crea/sovrascrive)</li>
              <li><code>&quot;a&quot;</code> append (crea se non esiste)</li>
              <li><code>&quot;r+&quot;</code> lettura e scrittura</li>
              <li><code>&quot;w+&quot;</code> scrittura e lettura (sovrascrive)</li>
              <li><code>&quot;a+&quot;</code> lettura ovunque, scrittura a fine</li>
              <li><code>&quot;rb&quot;, &quot;wb&quot;...</code> modalita binaria</li>
            </ul>
          </Box>
          <Box color="gray" border="left" title="Equivalenze">
            <CodeBlock language="c">{`puts(buf)  <=> printf("%s\\n", buf)
fputs(buf, stdout) <=> printf("%s", buf)`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Apertura/chiusura e controllo">
            <CodeBlock language="c">{`FILE *fp = fopen("file.txt", "r");
if (fp == NULL) { /* errore */ }
fclose(fp);  // rilascia descrittore

// ferror(fp) -> 0 se nessun errore
// feof(fp) -> 0 se non e' fine file
// Stream predefiniti: stdin, stdout, stderr`}</CodeBlock>
          </Box>
          <Box color="gray" border="left" title="Copia file carattere per carattere">
            <CodeBlock language="c">{`FILE *infile, *outfile; int c;
if ((infile = fopen("nomi","r")) != NULL &&
    (outfile = fopen("nomi2","w")) != NULL) {
    while ((c = fgetc(infile)) != EOF) {
        fputc(c, outfile);
    }
}`}</CodeBlock>
          </Box>
          <Box color="red" border="left" title="Lettura/scrittura blocchi">
            <CodeBlock language="c">{`// fread/fwrite per dati binari
int buf[100];
int n = fread(buf, sizeof(int), 100, fp);
fwrite(buf, sizeof(int), n, outfp);

// Strutture
fread(&pers, sizeof(Persona), 1, fp);
fwrite(&pers, sizeof(Persona), 1, fp);`}</CodeBlock>
          </Box>
          <Box color="purple" border="left" title="Accesso non sequenziale">
            <CodeBlock language="c">{`fseek(fp, offset, SEEK_SET); // da inizio
fseek(fp, offset, SEEK_CUR); // da posiz.
fseek(fp, offset, SEEK_END); // da fine
rewind(fp);     // torna all'inizio
long pos = ftell(fp); // posizione attuale`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
