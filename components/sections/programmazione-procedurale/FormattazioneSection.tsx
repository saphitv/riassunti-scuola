import { Section, Row, Column, Box, Note, CodeBlock } from "@/components";

export function FormattazioneSection() {
  return (
    <Section title="2. Formattazione printf/scanf">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Formato generale">
            <p><code>%[flags][width][.precision][length]type</code></p>
            <CodeBlock language="c">{`// Flags
-  // allinea a sinistra
+  // mostra sempre il segno
0  // padding con zeri
#  // forma alternativa (0x per hex)
   // (spazio) spazio prima di positivi

// Width e Precision
%10d    // larghezza minima 10
%.2f    // 2 cifre decimali
%10.2f  // larghezza 10, 2 decimali`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Specificatori di tipo">
            <CodeBlock language="c">{`%d, %i  // int decimale
%u      // unsigned int
%ld     // long int
%f      // float/double
%lf     // double (scanf)
%e, %E  // notazione scientifica
%c      // carattere
%s      // stringa
%p      // puntatore
%x, %X  // esadecimale
%o      // ottale
%%      // stampa %`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
