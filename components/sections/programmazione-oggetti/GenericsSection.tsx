import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components";

export function GenericsSection() {
  return (
    <Section title="1. Generics (Type Safety & Reusability)">
      <Definition term="Obiettivo">
        Catturare errori di tipo a <strong>compile-time</strong> invece che a
        runtime ed eliminare i cast espliciti non sicuri.
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Parametri di tipo formali">
            <CodeBlock language="java">{`// Classe generica con parametro T
public class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

// Utilizzo
Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String s = stringBox.get(); // No cast!`}</CodeBlock>
            <Note>
              <strong>Raw type:</strong> se non specifichi il tipo (es.{" "}
              <code>Box b = new Box()</code>), il compilatore usa{" "}
              <code>Object</code> e perdi type safety.
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Invarianza dei Generics">
            <Note>
              Anche se <code>Integer extends Number</code>, una{" "}
              <code>List&lt;Integer&gt;</code> <strong>NON è</strong> una{" "}
              <code>List&lt;Number&gt;</code>!
            </Note>
            <CodeBlock language="java">{`List<Integer> ints = new ArrayList<>();
// ERRORE di compilazione:
List<Number> nums = ints; // NON compila!

// Perché? Altrimenti potremmo fare:
nums.add(3.14); // Double in lista di Integer!`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="third">
          <Box color="green" border="left" title="Bounded Types">
            <p>
              <code>T extends X</code> limita T ai sottotipi di X:
            </p>
            <CodeBlock language="java">{`public <T extends Number>
double sum(List<T> list) {
    double total = 0;
    for (T n : list) {
        // Posso usare .doubleValue()
        total += n.doubleValue();
    }
    return total;
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="two-thirds">
          <Box color="yellow" border="left" title="Wildcards">
            <Row>
              <Column width="half">
                <p>
                  <strong>&lt;? extends T&gt;</strong> (Upper Bound)
                  <br />
                  Per <em>leggere</em> valori (input/producer):
                </p>
                <CodeBlock language="java">{`void print(List<? extends Number> l) {
    for (Number n : l) {
        System.out.println(n);
    }
    // l.add(1); // ERRORE! Non posso scrivere
}`}</CodeBlock>
              </Column>
              <Column width="half">
                <p>
                  <strong>&lt;? super T&gt;</strong> (Lower Bound)
                  <br />
                  Per <em>scrivere</em> valori (output/consumer):
                </p>
                <CodeBlock language="java">{`void fill(List<? super Integer> l) {
    l.add(1);
    l.add(2);
    // Integer i = l.get(0); // Solo Object!
}`}</CodeBlock>
              </Column>
            </Row>
            <Note>
              <strong>PECS:</strong> Producer Extends, Consumer Super. Usa{" "}
              <code>&lt;?&gt;</code> (unbounded) quando serve solo funzionalità
              di Object.
            </Note>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
