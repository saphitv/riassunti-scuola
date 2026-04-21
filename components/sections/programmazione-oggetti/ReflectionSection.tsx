import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components/index";

export function ReflectionSection() {
  return (
    <Section title="2. Reflection & Metaprogramming">
      <Definition term="Reflection">
        Meccanismo che permette a un programma di <strong>ispezionare</strong> e{" "}
        <strong>manipolare</strong> la propria struttura interna a runtime.
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Ottenere l'oggetto Class<T>">
            <CodeBlock language="java">{`// 1. Dal nome della classe (literal)
Class<String> c1 = String.class;

// 2. Da un'istanza
String s = "hello";
Class<?> c2 = s.getClass();

// 3. Dal nome completo (dinamico)
Class<?> c3 = Class.forName("java.lang.String");`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Creare istanze dinamicamente">
            <CodeBlock language="java">{`Class<?> clazz = Class.forName("com.example.MyClass");

// Costruttore senza argomenti
Object obj = clazz.getDeclaredConstructor()
                  .newInstance();

// Costruttore con parametri
Constructor<?> ctor = clazz.getDeclaredConstructor(
    String.class, int.class);
Object obj2 = ctor.newInstance("test", 42);`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Invocare metodi">
            <CodeBlock language="java">{`Class<?> clazz = obj.getClass();

// Ottenere un metodo per nome e parametri
Method m = clazz.getMethod("myMethod", int.class);
Object result = m.invoke(obj, 123);

// Accedere a metodi privati
Method pm = clazz.getDeclaredMethod("privateMethod");
pm.setAccessible(true); // Bypassa controllo accesso
pm.invoke(obj);`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Accedere ai campi">
            <CodeBlock language="java">{`Class<?> clazz = obj.getClass();

// Leggere/scrivere campi (anche privati)
Field f = clazz.getDeclaredField("secretField");
f.setAccessible(true);

Object value = f.get(obj);    // Lettura
f.set(obj, "newValue");       // Scrittura`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Box color="red" border="solid" title="Trade-off della Reflection">
        <Row>
          <Column width="third">
            <p>
              <strong>Performance</strong>
              <br />
              Più lenta del codice normale (no ottimizzazioni JIT, lookup
              dinamico).
            </p>
          </Column>
          <Column width="third">
            <p>
              <strong>Encapsulation</strong>
              <br />
              Rompe l&apos;information hiding accedendo a membri privati.
            </p>
          </Column>
          <Column width="third">
            <p>
              <strong>Type Safety</strong>
              <br />
              Nessun controllo compile-time, errori solo a runtime.
            </p>
          </Column>
        </Row>
        <Note>
          Usa la reflection come <strong>ultima risorsa</strong>: framework,
          testing, serializzazione, plugin systems.
        </Note>
      </Box>
    </Section>
  );
}
