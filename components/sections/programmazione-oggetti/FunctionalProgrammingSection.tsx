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

      <Box color="gray" border="solid" title="Le 6 Regole della Programmazione Funzionale">
        <Row>
          <Column width="half">
            <p><strong>1. Funzioni Pure</strong></p>
            <p>Stesso input → stesso output, nessun side effect.</p>
            <CodeBlock language="java">{`// PURA: dipende solo dall'input
int add(int a, int b) { return a + b; }

// IMPURA: modifica stato esterno
int counter = 0;
int increment() { return ++counter; }`}</CodeBlock>

            <p style={{ marginTop: "1rem" }}><strong>2. Immutabilità</strong></p>
            <p>Non modificare dati esistenti, crea nuovi oggetti.</p>
            <CodeBlock language="java">{`// Usa List.of(), Set.of(), Map.of()
List<String> immutable = List.of("a", "b");

// record = classe immutabile automatica
public record Person(String name, int age) {}`}</CodeBlock>

            <p style={{ marginTop: "1rem" }}><strong>3. Evitare Side Effects</strong></p>
            <p>No I/O, no modifiche a variabili esterne, no eccezioni.</p>
            <CodeBlock language="java">{`// MALE: side effect nel lambda
List<String> results = new ArrayList<>();
stream.forEach(x -> results.add(x));

// BENE: collect senza side effects
List<String> results = stream.toList();`}</CodeBlock>
          </Column>
          <Column width="half">
            <p><strong>4. Higher-Order Functions</strong></p>
            <p>Funzioni che accettano o restituiscono altre funzioni.</p>
            <CodeBlock language="java">{`// Restituisce una funzione
Function<Integer, Integer> multiplier(int n) {
    return x -> x * n;
}
multiplier(3).apply(5); // 15

// Composizione
Function<String, String> process =
    String::trim.andThen(String::toUpperCase);`}</CodeBlock>

            <p style={{ marginTop: "1rem" }}><strong>5. Effectively Final</strong></p>
            <p>Lambda catturano solo variabili non riassegnate.</p>
            <CodeBlock language="java">{`String prefix = "Hello";  // effectively final
list.stream().map(s -> prefix + s); // OK

prefix = "Hi";  // riassegnazione
list.stream().map(s -> prefix + s); // ERRORE!`}</CodeBlock>

            <p style={{ marginTop: "1rem" }}><strong>6. Espressioni &gt; Statement</strong></p>
            <p>Preferisci map/filter/reduce a loop imperativi.</p>
            <CodeBlock language="java">{`// Statement (imperativo)
int sum = 0;
for (int n : numbers) sum += n;

// Espressione (funzionale)
int sum = numbers.stream().reduce(0, Integer::sum);`}</CodeBlock>
          </Column>
        </Row>
        <Note>
          <strong>Principio guida:</strong> scrivi codice dichiarativo (cosa fare) invece che imperativo (come fare).
        </Note>
      </Box>
    </Section>
  );
}
