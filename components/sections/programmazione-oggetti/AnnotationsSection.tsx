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
            <p><strong>SOURCE</strong> — scartata dal compilatore (<code>@Override</code>, <code>@SuppressWarnings</code>)</p>
            <p><strong>CLASS</strong> — nel .class, ignorata dalla JVM (analisi statica)</p>
            <p><strong>RUNTIME</strong> — accessibile via Reflection (<code>@Test</code>, <code>@Entity</code>)</p>
          </Box>
          <Box color="green" border="left" title="Target (dove applicare)">
            <p className="text-sm">
              <code>TYPE</code> | <code>METHOD</code> | <code>FIELD</code> | <code>PARAMETER</code> | <code>CONSTRUCTOR</code> | <code>LOCAL_VARIABLE</code> | <code>ANNOTATION_TYPE</code> | <code>PACKAGE</code>
            </p>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Annotation custom + Uso">
            <CodeBlock language="java">{`@Retention(RUNTIME) @Target(METHOD)
public @interface Test {
    String description() default "";
    int timeout() default 0;
    Class<? extends Exception> expected() default Exception.class;
}

@Test(description = "verifica login", timeout = 100)
public void testLogin() { ... }`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Leggere a runtime">
            <CodeBlock language="java">{`for (Method m : clazz.getDeclaredMethods()) {
    if (m.isAnnotationPresent(Test.class)) {
        Test ann = m.getAnnotation(Test.class);
        String desc = ann.description();  // leggi parametri
        int timeout = ann.timeout();
        m.invoke(instance);
    }
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="gray" border="left" title="@Repeatable (Java 8+)">
            <CodeBlock language="java">{`@interface Roles { Role[] value(); }  // container
@Repeatable(Roles.class)
@interface Role { String value(); }

@Role("admin") @Role("user")  // uso multiplo
public class MyService { }`}</CodeBlock>
          </Box>
          <Box color="gray" border="left" title="Reflection per @Repeatable">
            <CodeBlock language="java">{`// getAnnotationsByType → array diretto
Role[] roles = clazz.getAnnotationsByType(Role.class);
for (Role r : roles) System.out.println(r.value());

// oppure via container
Roles container = clazz.getAnnotation(Roles.class);
if (container != null) { /* container.value() */ }`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Note>
        Built-in: <code>@Override</code>, <code>@Deprecated</code>,{" "}
        <code>@SuppressWarnings</code>, <code>@FunctionalInterface</code> (verifica 1 solo metodo astratto).
      </Note>
    </Section>
  );
}
