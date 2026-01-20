import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components";

export function AnnotationsSection() {
  return (
    <Section title="3. Annotations (Metadata Sintattico)">
      <Definition term="Annotation">
        Metadati che forniscono informazioni sul codice{" "}
        <strong>senza influenzare direttamente</strong> la logica di esecuzione.
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Retention Policies">
            <CodeBlock language="java">{`@Retention(RetentionPolicy.SOURCE)
// Scartata dal compilatore
// Es: @Override, @SuppressWarnings

@Retention(RetentionPolicy.CLASS)
// Nel .class ma ignorata dalla JVM
// Es: alcune annotation per analisi statica

@Retention(RetentionPolicy.RUNTIME)
// Accessibile via Reflection!
// Es: @Test (JUnit), @Entity (JPA)`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Target (dove applicare)">
            <CodeBlock language="java">{`@Target({
    ElementType.TYPE,        // class, interface, enum
    ElementType.METHOD,      // metodi
    ElementType.FIELD,       // campi
    ElementType.PARAMETER,   // parametri metodo
    ElementType.CONSTRUCTOR, // costruttori
    ElementType.LOCAL_VARIABLE,
    ElementType.ANNOTATION_TYPE, // meta-annotation
    ElementType.PACKAGE
})`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Definire annotation custom">
            <CodeBlock language="java">{`@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Test {
    // Elementi (attributi) con valori default
    String description() default "";
    int timeout() default 0;
    Class<? extends Exception> expected()
        default Exception.class;
}

// Uso
@Test(description = "verifica login", timeout = 100)
public void testLogin() { ... }`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Leggere annotation a runtime">
            <CodeBlock language="java">{`// Esempio: mini test framework
for (Method m : clazz.getDeclaredMethods()) {
    if (m.isAnnotationPresent(Test.class)) {
        Test ann = m.getAnnotation(Test.class);

        System.out.println("Running: " +
            ann.description());

        try {
            m.invoke(instance);
            System.out.println("PASSED");
        } catch (Exception e) {
            System.out.println("FAILED");
        }
    }
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Box color="gray" border="left" title="@Repeatable (Java 8+)">
        <p>Permette di applicare la stessa annotation più volte sullo stesso elemento:</p>
        <CodeBlock language="java">{`// 1. Container per le annotation ripetute
@Retention(RetentionPolicy.RUNTIME)
public @interface Roles { Role[] value(); }

// 2. Annotation ripetibile che punta al container
@Repeatable(Roles.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface Role { String value(); }

// 3. Uso: più @Role sullo stesso elemento
@Role("admin") @Role("user")
public class MyService { ... }`}</CodeBlock>
      </Box>

      <Note>
        Le annotation <code>@Override</code>, <code>@Deprecated</code>,{" "}
        <code>@SuppressWarnings</code> sono built-in. <code>@FunctionalInterface</code>{" "}
        verifica che un&apos;interfaccia abbia un solo metodo astratto.
      </Note>
    </Section>
  );
}
