import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components/index";

export function RecordsSealedSection() {
  return (
    <Section title="8. Records e Sealed Classes (Java 14+/17+)">
      <Row>
        <Column width="half">
          <Definition term="Record">
            Classe immutabile per dati. Genera automaticamente: costruttore,
            getter (senza &quot;get&quot;), <code>equals()</code>, <code>hashCode()</code>, <code>toString()</code>.
          </Definition>
        </Column>
        <Column width="half">
          <Definition term="Sealed Class">
            Classe che controlla esplicitamente quali classi possono estenderla
            tramite <code>permits</code>.
          </Definition>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Records">
            <CodeBlock language="java">{`public record Point(int x, int y) {}

Point p = new Point(10, 20);
p.x(); p.y();  // getter senza "get"

// Costruttore compatto per validazione
public record Person(String name, int age) {
    public Person {  // no parentesi!
        if (age < 0) throw new IllegalArgumentException();
    }
    public boolean isAdult() { return age >= 18; }
}`}</CodeBlock>
          </Box>
          <Note>
            Records: <strong>implicitamente final</strong>, campi <strong>private final</strong>.
            Possono implementare interfacce ma non estendere classi.
          </Note>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Sealed Classes">
            <CodeBlock language="java">{`public sealed class Shape
    permits Circle, Rectangle, Triangle { }

// Sottoclassi: final, sealed, o non-sealed
public final class Circle extends Shape { }
public sealed class Rectangle extends Shape
    permits Square { }
public non-sealed class Triangle extends Shape { }

// Pattern matching esaustivo (no default!)
return switch (shape) {
    case Circle c    -> Math.PI * c.r() * c.r();
    case Rectangle r -> r.w() * r.h();
    case Triangle t  -> 0.5 * t.b() * t.h();
};`}</CodeBlock>
          </Box>
          <Note>
            Sottoclassi devono essere nello stesso modulo/package.
          </Note>
        </Column>
      </Row>

      <Box color="green" border="left" title="Records + Sealed = Algebraic Data Types">
        <CodeBlock language="java">{`public sealed interface Result<T> permits Success, Failure { }
public record Success<T>(T value) implements Result<T> { }
public record Failure<T>(String error) implements Result<T> { }

String msg = switch (result) {
    case Success<Integer> s -> "Got: " + s.value();
    case Failure<Integer> f -> "Error: " + f.error();
};`}</CodeBlock>
      </Box>
    </Section>
  );
}
