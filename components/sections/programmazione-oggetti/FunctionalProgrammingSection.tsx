import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components";

export function FunctionalProgrammingSection() {
  return (
    <Section title="7. Programmazione Funzionale in Java">
      <Definition term="Paradigma Funzionale">
        Stile di programmazione che tratta il calcolo come valutazione di{" "}
        <strong>funzioni matematiche</strong>, evitando stato mutabile e side
        effects. Java 8+ supporta elementi funzionali pur rimanendo OOP.
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="1. Funzioni Pure">
            <p>
              Una funzione e <strong>pura</strong> se:
            </p>
            <ul style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}>
              <li>Restituisce sempre lo stesso output per lo stesso input</li>
              <li>Non ha side effects (no I/O, no modifiche esterne)</li>
            </ul>
            <CodeBlock language="java">{`// PURA: dipende solo dall'input
int add(int a, int b) {
    return a + b;
}

// IMPURA: modifica stato esterno
int counter = 0;
int increment() {
    return ++counter; // side effect!
}

// IMPURA: dipende da stato esterno
int addToCounter(int x) {
    return counter + x; // non deterministica
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="2. Immutabilita">
            <p>
              I dati <strong>non devono essere modificati</strong> dopo la
              creazione. Crea nuovi oggetti invece di mutare.
            </p>
            <CodeBlock language="java">{`// MUTABILE (da evitare)
List<String> list = new ArrayList<>();
list.add("a");  // modifica la lista

// IMMUTABILE (preferito)
List<String> list1 = List.of("a", "b");
List<String> list2 = Stream.concat(
    list1.stream(), Stream.of("c")
).toList();  // nuova lista

// Classe immutabile
public record Person(String name, int age) {}
// record: final, no setter, equals/hashCode auto`}</CodeBlock>
            <Note>
              Usa <code>List.of()</code>, <code>Set.of()</code>,{" "}
              <code>Map.of()</code> per collezioni immutabili.
            </Note>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="3. Evitare Side Effects">
            <p>I side effects includono:</p>
            <ul style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}>
              <li>Modificare variabili esterne</li>
              <li>I/O (print, file, network)</li>
              <li>Lanciare eccezioni</li>
              <li>Modificare parametri passati</li>
            </ul>
            <CodeBlock language="java">{`// MALE: side effect nel lambda
List<String> results = new ArrayList<>();
stream.forEach(x -> results.add(x)); // MALE!

// BENE: collect senza side effects
List<String> results = stream
    .collect(Collectors.toList());

// MALE: modifica parametro
void addPrefix(List<String> list) {
    list.replaceAll(s -> "pre_" + s); // muta!
}

// BENE: ritorna nuova lista
List<String> addPrefix(List<String> list) {
    return list.stream()
        .map(s -> "pre_" + s)
        .toList();
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="4. Higher-Order Functions">
            <p>
              Funzioni che <strong>accettano</strong> o{" "}
              <strong>restituiscono</strong> altre funzioni.
            </p>
            <CodeBlock language="java">{`// Accetta funzione come parametro
<T, R> List<R> transform(
    List<T> list,
    Function<T, R> mapper
) {
    return list.stream().map(mapper).toList();
}

// Restituisce una funzione
Function<Integer, Integer> multiplier(int factor) {
    return x -> x * factor;
}
Function<Integer, Integer> triple = multiplier(3);
triple.apply(5); // 15

// Composizione di funzioni
Function<String, String> trim = String::trim;
Function<String, String> upper = String::toUpperCase;
Function<String, String> process = trim.andThen(upper);
process.apply("  hello  "); // "HELLO"`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="red" border="left" title="5. Effectively Final">
            <p>
              Le lambda possono catturare solo variabili{" "}
              <strong>effectively final</strong> (non riassegnate dopo
              l&apos;inizializzazione).
            </p>
            <CodeBlock language="java">{`// OK: variabile effectively final
String prefix = "Hello";
list.stream().map(s -> prefix + s);

// ERRORE: variabile riassegnata
String prefix = "Hello";
prefix = "Hi";  // riassegnazione!
list.stream().map(s -> prefix + s); // ERRORE!

// ERRORE: modifica in lambda
int[] count = {0};  // workaround array
list.forEach(x -> count[0]++); // MALE!

// BENE: usa reduce o count
long count = list.stream().count();`}</CodeBlock>
            <Note>
              Il compilatore richiede effectively final per garantire thread
              safety e prevedibilita.
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="teal" border="left" title="6. Preferire Espressioni a Statement">
            <p>
              Le espressioni restituiscono un valore, gli statement eseguono
              azioni.
            </p>
            <CodeBlock language="java">{`// STATEMENT (imperativo)
String result;
if (condition) {
    result = "yes";
} else {
    result = "no";
}

// ESPRESSIONE (funzionale)
String result = condition ? "yes" : "no";

// STATEMENT (loop imperativo)
int sum = 0;
for (int n : numbers) {
    sum += n;
}

// ESPRESSIONE (reduce)
int sum = numbers.stream()
    .reduce(0, Integer::sum);`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Box color="gray" border="solid" title="Riepilogo: Le 6 Regole della FP in Java">
        <Row>
          <Column width="third">
            <ol style={{ marginLeft: "1rem" }}>
              <li>
                <strong>Funzioni pure</strong>: stesso input = stesso output
              </li>
              <li>
                <strong>Immutabilita</strong>: non mutare, crea nuovi oggetti
              </li>
            </ol>
          </Column>
          <Column width="third">
            <ol style={{ marginLeft: "1rem" }} start={3}>
              <li>
                <strong>No side effects</strong>: evita I/O e modifiche esterne
              </li>
              <li>
                <strong>Higher-order</strong>: passa/ritorna funzioni
              </li>
            </ol>
          </Column>
          <Column width="third">
            <ol style={{ marginLeft: "1rem" }} start={5}>
              <li>
                <strong>Effectively final</strong>: no riassegnazioni in lambda
              </li>
              <li>
                <strong>Espressioni</strong>: preferisci map/filter/reduce a
                loop
              </li>
            </ol>
          </Column>
        </Row>
      </Box>
    </Section>
  );
}
