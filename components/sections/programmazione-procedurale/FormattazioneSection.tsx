import { Section, Row, Column, Box } from "@/components/index";

export function FormattazioneSection() {
  return (
    <Section title="2. Formattazione printf/scanf">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Formato">
            <p><code>%[flags][width][.prec][len]type</code></p>
            <ul className="ref-list">
              <li><code>-</code> allinea a sinistra</li>
              <li><code>+</code> mostra sempre segno</li>
              <li><code>0</code> padding con zeri</li>
              <li><code>#</code> forma alt. (0x hex)</li>
              <li><code>%10d</code> largh. minima 10</li>
              <li><code>%.2f</code> 2 cifre decimali</li>
            </ul>
          </Box>
        </Column>
        <Column width="third">
          <Box color="green" border="left" title="Tipi interi">
            <ul className="ref-list">
              <li><code>%d</code>, <code>%i</code> int decimale</li>
              <li><code>%u</code> unsigned int</li>
              <li><code>%ld</code> long int</li>
              <li><code>%x</code>, <code>%X</code> esadecimale</li>
              <li><code>%o</code> ottale</li>
              <li><code>%%</code> stampa %</li>
            </ul>
          </Box>
        </Column>
        <Column width="third">
          <Box color="yellow" border="left" title="Tipi float/altro">
            <ul className="ref-list">
              <li><code>%f</code> float/double</li>
              <li><code>%lf</code> double (scanf)</li>
              <li><code>%e</code>, <code>%E</code> notaz. scient.</li>
              <li><code>%c</code> carattere</li>
              <li><code>%s</code> stringa</li>
              <li><code>%p</code> puntatore</li>
            </ul>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
