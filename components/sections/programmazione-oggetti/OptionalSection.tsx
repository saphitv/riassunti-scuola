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
        <Column width="half">
          <Box color="blue" border="left" title="Creazione di Optional">
            <CodeBlock language="java">{`// Optional con valore presente
Optional<String> opt1 = Optional.of("Hello");

// Optional vuoto
Optional<String> opt2 = Optional.empty();

// Optional da valore nullable
String s = null;
Optional<String> opt3 = Optional.ofNullable(s);

// ERRORE: Optional.of(null) lancia NPE!
Optional<String> bad = Optional.of(null); // NPE!`}</CodeBlock>
            <Note>
              Usa <code>Optional.of()</code> solo quando sei sicuro che il
              valore non sia null. Altrimenti usa{" "}
              <code>Optional.ofNullable()</code>.
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Verificare la presenza">
            <CodeBlock language="java">{`Optional<String> opt = getUser();

// Verifica se presente
if (opt.isPresent()) {
    System.out.println(opt.get());
}

// Verifica se vuoto (Java 11+)
if (opt.isEmpty()) {
    System.out.println("Nessun utente");
}

// ifPresent con Consumer
opt.ifPresent(user ->
    System.out.println("Trovato: " + user)
);

// ifPresentOrElse (Java 9+)
opt.ifPresentOrElse(
    user -> System.out.println("Trovato: " + user),
    () -> System.out.println("Non trovato")
);`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="third">
          <Box color="yellow" border="left" title="Valori di default">
            <CodeBlock language="java">{`Optional<String> opt = findById(id);

// Valore di default
String name = opt.orElse("Guest");

// Default calcolato lazily
String name2 = opt.orElseGet(() ->
    loadDefaultFromDB()
);

// Lancia eccezione se vuoto
String name3 = opt.orElseThrow(() ->
    new UserNotFoundException(id)
);

// orElseThrow senza argomento (Java 10+)
String name4 = opt.orElseThrow();
// Lancia NoSuchElementException`}</CodeBlock>
          </Box>
        </Column>
        <Column width="two-thirds">
          <Box color="purple" border="left" title="Trasformazioni (map, flatMap, filter)">
            <Row>
              <Column width="half">
                <p>
                  <strong>map()</strong> - trasforma il valore se presente:
                </p>
                <CodeBlock language="java">{`Optional<String> name =
    Optional.of("mario rossi");

// Trasforma con map
Optional<String> upper = name
    .map(String::toUpperCase);
// Optional["MARIO ROSSI"]

// Catena di map
Optional<Integer> len = name
    .map(String::trim)
    .map(String::length);`}</CodeBlock>
              </Column>
              <Column width="half">
                <p>
                  <strong>flatMap()</strong> - evita Optional annidati:
                </p>
                <CodeBlock language="java">{`class User {
    Optional<Address> getAddress() {...}
}
class Address {
    Optional<String> getCity() {...}
}

// CON map: Optional<Optional<String>>!
// CON flatMap: Optional<String>
Optional<String> city = user
    .flatMap(User::getAddress)
    .flatMap(Address::getCity);`}</CodeBlock>
              </Column>
            </Row>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>filter()</strong> - mantiene il valore solo se soddisfa il
              predicato:
            </p>
            <CodeBlock language="java">{`Optional<String> result = Optional.of("admin")
    .filter(name -> name.length() > 3)  // Optional["admin"]
    .filter(name -> name.startsWith("a")); // Optional["admin"]

Optional<String> empty = Optional.of("ab")
    .filter(name -> name.length() > 3);  // Optional.empty()`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="red" border="left" title="Anti-pattern da evitare">
            <CodeBlock language="java">{`// MALE: isPresent() + get()
if (opt.isPresent()) {
    return opt.get();
} else {
    return "default";
}
// BENE: usa orElse
return opt.orElse("default");

// MALE: Optional come parametro
void process(Optional<String> opt) {...}
// BENE: usa @Nullable o overload
void process(String s) {...}
void process() { process(null); }

// MALE: Optional in campi di classe
class User {
    Optional<String> nickname; // NO!
}
// BENE: campo nullable o getter Optional
class User {
    String nickname; // nullable
    Optional<String> getNickname() {
        return Optional.ofNullable(nickname);
    }
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="teal" border="left" title="Optional con Stream (Java 9+)">
            <CodeBlock language="java">{`// stream() converte Optional in Stream
Optional<String> opt = Optional.of("hello");
opt.stream()
   .map(String::toUpperCase)
   .forEach(System.out::println);

// Utile per flatMap su liste
List<Optional<String>> opts = List.of(
    Optional.of("a"),
    Optional.empty(),
    Optional.of("b")
);

// Estrai solo i valori presenti
List<String> values = opts.stream()
    .flatMap(Optional::stream)
    .toList(); // ["a", "b"]

// or() per Optional alternativo (Java 9+)
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
