import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function TempoSection() {
  return (
    <Section title="10. Gestione del Tempo">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="struct tm">
            <ul className="ref-list">
              <li><code>tm_sec</code> [0..59]</li>
              <li><code>tm_min</code> [0..59]</li>
              <li><code>tm_hour</code> [0..23]</li>
              <li><code>tm_mday</code> giorno [1..31]</li>
              <li><code>tm_mon</code> mese [0..11]</li>
              <li><code>tm_year</code> anni dal 1900</li>
              <li><code>tm_wday</code> giorno sett [0..6]</li>
            </ul>
          </Box>
        </Column>
        <Column width="third">
          <Box color="green" border="left" title="Funzioni time.h">
            <ul className="ref-list">
              <li><code>time(NULL)</code> tempo corrente</li>
              <li><code>ctime(&t)</code> stringa leggibile</li>
              <li><code>difftime(t2, t1)</code> diff in sec</li>
              <li><code>gmtime(&t)</code> → tm* UTC</li>
              <li><code>localtime(&t)</code> → tm* locale</li>
              <li><code>mktime(&tm)</code> → time_t</li>
            </ul>
          </Box>
        </Column>
        <Column width="third">
          <Box color="yellow" border="left" title="Esempio">
            <CodeBlock language="c">{`time_t t = time(NULL);
struct tm *ptr = localtime(&t);
printf("%d:%d:%d\\n",
  ptr->tm_hour,
  ptr->tm_min,
  ptr->tm_sec);`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
