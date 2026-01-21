import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components";

export function LambdaStreamsSection() {
  return (
    <Section title="5. Lambda Expressions & Streams">
      <Row>
        <Column width="half">
          <Definition term="Lambda Expression">
            Funzione anonima che implementa un&apos;interfaccia funzionale
            (interfaccia con un solo metodo astratto).
          </Definition>
        </Column>
        <Column width="half">
          <Definition term="Stream">
            Sequenza di elementi che supporta operazioni aggregate in stile
            funzionale (lazy evaluation).
          </Definition>
        </Column>
      </Row>

      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Sintassi Lambda">
            <CodeBlock language="java">{`(T1 p1, T2 p2) -> { return x; }
(p1, p2) -> expression
p -> expression
() -> expression`}</CodeBlock>
          </Box>
          <Box color="yellow" border="left" title="Method References">
            <p><code>Class::static</code> ≡ <code>x -&gt; Class.static(x)</code></p>
            <p><code>obj::method</code> ≡ <code>x -&gt; obj.method(x)</code></p>
            <p><code>Class::method</code> ≡ <code>o -&gt; o.method()</code></p>
            <p><code>Class::new</code> ≡ <code>() -&gt; new Class()</code></p>
          </Box>
        </Column>
        <Column width="third">
          <Box color="green" border="left" title="Interfacce funzionali">
            <CodeBlock language="java">{`Predicate<T>      // T -> boolean
Function<T,R>     // T -> R
Consumer<T>       // T -> void
Supplier<T>       // () -> T
BiFunction<T,U,R> // (T,U) -> R
UnaryOperator<T>  // T -> T
BinaryOperator<T> // (T,T) -> T`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="purple" border="left" title="Creazione Stream">
            <CodeBlock language="java">{`list.stream()
set.parallelStream()
Arrays.stream(array)
Stream.of(a, b, c)
Stream.iterate(0, n -> n + 1)
Stream.generate(Math::random)
IntStream.range(0, 10)
IntStream.rangeClosed(1, 10)`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Box color="red" border="solid" title="Pipeline: Operazioni Intermedie e Terminali">
        <Row>
          <Column width="half">
            <p><strong>Intermedie</strong> (lazy, restituiscono Stream):</p>
            <CodeBlock language="java">{`stream
  .filter(x -> x > 0)      // filtra elementi
  .map(x -> x * 2)         // trasforma
  .flatMap(s -> s.stream()) // appiattisce
  .distinct()              // rimuove duplicati
  .sorted()                // ordina
  .limit(10)               // primi N
  .skip(5)                 // salta primi N
  .peek(System.out::println) // debug`}</CodeBlock>
          </Column>
          <Column width="half">
            <p><strong>Terminali</strong> (eager, producono risultato):</p>
            <CodeBlock language="java">{`stream.forEach(System.out::println);
stream.count();             // conta elementi
stream.collect(Collectors.toList());
stream.reduce(0, Integer::sum);
stream.findFirst();         // Optional<T>
stream.findAny();
stream.anyMatch(x -> x > 0);
stream.allMatch(x -> x > 0);
stream.noneMatch(x -> x < 0);
stream.min(Comparator.naturalOrder());`}</CodeBlock>
          </Column>
        </Row>
      </Box>

      <Row>
        <Column width="two-thirds">
          <Box color="gray" border="left" title="Collectors (java.util.stream.Collectors)">
            <CodeBlock language="java">{`stream.collect(Collectors.toList())              // → List<T>
stream.collect(Collectors.toSet())               // → Set<T>
stream.collect(Collectors.joining(", "))         // → "a, b, c"
stream.collect(Collectors.groupingBy(P::getCity))      // → Map<City, List<P>>
stream.collect(Collectors.partitioningBy(x -> x > 0))  // → Map<Boolean, List<T>>
stream.collect(Collectors.summarizingInt(S::length))   // → IntSummaryStatistics`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Note>
            <strong>Lazy:</strong> operazioni intermedie eseguite solo con operazione terminale.
          </Note>
          <Note>
            <strong>Short-circuit:</strong> <code>findFirst</code>, <code>anyMatch</code>, <code>limit</code> possono terminare prima.
          </Note>
          <Note>
            Stream consumabile <strong>una sola volta</strong>.
          </Note>
        </Column>
      </Row>
    </Section>
  );
}
