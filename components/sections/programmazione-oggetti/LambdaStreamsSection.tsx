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
        <Column width="half">
          <Box color="blue" border="left" title="Sintassi Lambda">
            <CodeBlock language="java">{`// Forma completa
(Type1 p1, Type2 p2) -> { statements; return x; }

// Tipo inferito
(p1, p2) -> { statements; return x; }

// Singola espressione (return implicito)
(p1, p2) -> expression

// Singolo parametro (parentesi opzionali)
p -> expression

// Nessun parametro
() -> expression`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Interfacce funzionali comuni">
            <CodeBlock language="java">{`// java.util.function
Predicate<T>    // T -> boolean
Function<T,R>   // T -> R
Consumer<T>     // T -> void
Supplier<T>     // () -> T
BiFunction<T,U,R> // (T,U) -> R
UnaryOperator<T>  // T -> T
BinaryOperator<T> // (T,T) -> T

// Esempio
Predicate<String> isEmpty = s -> s.isEmpty();
Function<String, Integer> len = String::length;`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Method References">
            <CodeBlock language="java">{`// Riferimento a metodo statico
ClassName::staticMethod
Math::abs  // x -> Math.abs(x)

// Riferimento a metodo di istanza (su oggetto)
instance::method
System.out::println  // x -> System.out.println(x)

// Riferimento a metodo di istanza (su tipo)
ClassName::instanceMethod
String::toUpperCase  // s -> s.toUpperCase()

// Riferimento a costruttore
ClassName::new
ArrayList::new  // () -> new ArrayList<>()`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Creazione di Stream">
            <CodeBlock language="java">{`// Da Collection
list.stream()
set.parallelStream()  // parallelo

// Da array
Arrays.stream(array)
Stream.of(a, b, c)

// Stream infiniti
Stream.iterate(0, n -> n + 1)  // 0,1,2,3...
Stream.generate(Math::random)  // random...

// Range di interi
IntStream.range(0, 10)      // 0-9
IntStream.rangeClosed(1, 10) // 1-10`}</CodeBlock>
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
          <Box color="gray" border="left" title="Collectors comuni">
            <CodeBlock language="java">{`import static java.util.stream.Collectors.*;

// Raccolta in collection
toList(), toSet(), toCollection(TreeSet::new)

// Joining strings
joining(", ")  // "a, b, c"

// Raggruppamento
groupingBy(Person::getCity)  // Map<City, List<Person>>
groupingBy(Person::getCity, counting())  // Map<City, Long>

// Partizionamento
partitioningBy(x -> x > 0)  // Map<Boolean, List<T>>

// Statistiche
summarizingInt(String::length)  // count, sum, min, avg, max`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Note>
            <strong>Lazy evaluation:</strong> le operazioni intermedie non
            vengono eseguite finché non c&apos;è un&apos;operazione terminale.
          </Note>
          <Note>
            <strong>Short-circuiting:</strong> <code>findFirst</code>,{" "}
            <code>anyMatch</code>, <code>limit</code> possono terminare senza
            processare tutto lo stream.
          </Note>
          <Note>
            Uno stream può essere consumato <strong>una sola volta</strong>.
          </Note>
        </Column>
      </Row>
    </Section>
  );
}
