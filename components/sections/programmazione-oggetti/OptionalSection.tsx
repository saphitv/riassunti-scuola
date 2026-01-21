import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components";

export function OptionalSection() {
  return (
    <Section title="6. Optional (Gestione sicura dei valori nulli)">
      <Definition term="Obiettivo">
        Evitare i <code>NullPointerException</code> rendendo esplicita la
        possibilita che un valore sia assente. Optional e un{" "}
        <strong>container</strong> che puo contenere o meno un valore non-null.
      </Definition>

      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Creazione">
            <CodeBlock language="java">{`// Con valore (NPE se null!)
Optional<String> opt1 = Optional.of("Hi");
// Vuoto
Optional<String> opt2 = Optional.empty();
// Da valore nullable (sicuro)
Optional<String> opt3 = Optional.ofNullable(s);`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="green" border="left" title="Verifica presenza">
            <CodeBlock language="java">{`opt.isPresent()  // true se presente
opt.isEmpty()    // true se vuoto (Java 11+)

// Esegui azione se presente
opt.ifPresent(v -> System.out.println(v));
// Con fallback (Java 9+)
opt.ifPresentOrElse(
    v -> use(v), () -> fallback());`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="yellow" border="left" title="Valori di default">
            <CodeBlock language="java">{`// Valore di default
String s = opt.orElse("default");
// Default lazy (calcolato solo se vuoto)
String s = opt.orElseGet(() -> compute());
// Lancia eccezione se vuoto
String s = opt.orElseThrow(
    () -> new NotFoundException());
// NoSuchElementException (Java 10+)
String s = opt.orElseThrow();`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="red" border="left" title="Anti-pattern da evitare">
            <CodeBlock language="java">{`// MALE: isPresent() + get()
if (opt.isPresent()) return opt.get();
else return "default";
// BENE:
return opt.orElse("default");

// MALE: Optional come parametro o campo
void process(Optional<String> opt) {...} // NO
class User { Optional<String> nick; }    // NO

// BENE: getter che ritorna Optional
class User {
    String nick; // nullable
    Optional<String> getNick() {
        return Optional.ofNullable(nick);
    }
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Con Stream (Java 9+)">
            <CodeBlock language="java">{`// Estrai valori presenti da lista di Optional
List<Optional<String>> opts = List.of(
    Optional.of("a"), Optional.empty(), Optional.of("b"));

List<String> values = opts.stream()
    .flatMap(Optional::stream)
    .toList(); // ["a", "b"]

// or() per fallback a catena
Optional<String> result = findInCache(key)
    .or(() -> findInDB(key))
    .or(() -> Optional.of("default"));`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Note>
        <strong>Best Practice:</strong> Usa Optional solo come{" "}
        <strong>tipo di ritorno</strong> per indicare che un metodo potrebbe non
        restituire un valore. Non usarlo come tipo di parametro, campo di classe
        o in collezioni.
      </Note>
    </Section>
  );
}
