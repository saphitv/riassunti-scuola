import { Section, Row, Column, Box, CodeBlock } from "@/components";

export function TempoSection() {
  return (
    <Section title="10. Gestione del Tempo">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="struct tm">
            <CodeBlock language="c">{`struct tm {
    int tm_sec;   // secondi [0..59]
    int tm_min;   // minuti [0..59]
    int tm_hour;  // ore [0..23]
    int tm_mday;  // giorno del mese [1..31]
    int tm_mon;   // mesi da gennaio [0..11]
    int tm_year;  // anni dal 1900
    int tm_wday;  // giorni da domenica [0..6]
    int tm_yday;  // giorni dal 1 gen [0..365]
    int tm_isdst; // ora legale
};`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Funzioni time.h">
            <CodeBlock language="c">{`time_t time(time_t *t)    // tempo corrente
char *ctime(time_t *t)    // stringa leggibile
clock_t clock(void)       // clock CPU
double difftime(t2, t1)   // differenza in sec

// Conversioni
struct tm *gmtime(time_t *t)    // UTC
struct tm *localtime(time_t *t) // locale
time_t mktime(struct tm *t)     // tm -> time_t`}</CodeBlock>
          </Box>
          <Box color="yellow" border="left" title="Esempio d'uso">
            <CodeBlock language="c">{`struct tm *ptr;
time_t lTime = time(NULL);
ptr = localtime(&lTime);
printf("%d:%d:%d\\n",
    ptr->tm_hour, ptr->tm_min, ptr->tm_sec);`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
