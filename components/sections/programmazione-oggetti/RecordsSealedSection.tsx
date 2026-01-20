import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components";

export function RecordsSealedSection() {
  return (
    <Section title="8. Records e Sealed Classes (Java 14+/17+)">
      <Definition term="Obiettivo">
        Semplificare la creazione di classi immutabili per dati (Records) e
        controllare esplicitamente la gerarchia di ereditarietà (Sealed
        Classes).
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Records: Classi Dati Immutabili">
            <p>
              Un <strong>record</strong> è una classe speciale per trasportare
              dati immutabili. Il compilatore genera automaticamente:
            </p>
            <ul>
              <li>Costruttore canonico</li>
              <li>Getter per ogni componente (senza prefisso get)</li>
              <li>
                <code>equals()</code>, <code>hashCode()</code>,{" "}
                <code>toString()</code>
              </li>
            </ul>
            <CodeBlock language="java">{`// Definizione compatta
public record Point(int x, int y) {}

// Equivalente a ~50 righe di codice tradizionale!
Point p = new Point(10, 20);
int x = p.x();      // getter senza "get"
int y = p.y();

System.out.println(p); // Point[x=10, y=20]`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Caratteristiche dei Records">
            <Note>
              I records sono <strong>implicitamente final</strong> e i loro
              campi sono <strong>private final</strong>.
            </Note>
            <CodeBlock language="java">{`public record Person(String name, int age) {
    // Costruttore compatto per validazione
    public Person {
        if (age < 0) {
            throw new IllegalArgumentException(
                "Age cannot be negative"
            );
        }
        // name e age sono assegnati automaticamente
    }

    // Metodi aggiuntivi permessi
    public boolean isAdult() {
        return age >= 18;
    }
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Records: Costruttori e Override">
            <CodeBlock language="java">{`public record Rectangle(double width, double height) {
    // Costruttore alternativo
    public Rectangle(double side) {
        this(side, side); // Deve chiamare il canonico
    }

    // Override di metodi generati
    @Override
    public String toString() {
        return width + "x" + height;
    }

    // Campi statici permessi
    public static final Rectangle UNIT =
        new Rectangle(1, 1);
}`}</CodeBlock>
            <Note>
              I records possono implementare interfacce ma{" "}
              <strong>non possono estendere classi</strong> (estendono
              implicitamente <code>java.lang.Record</code>).
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Limitazioni dei Records">
            <p>
              <strong>Non puoi:</strong>
            </p>
            <ul>
              <li>Estendere altre classi</li>
              <li>Dichiarare campi di istanza aggiuntivi</li>
              <li>Rendere i componenti mutabili</li>
              <li>Definire un costruttore canonico con firma diversa</li>
            </ul>
            <CodeBlock language="java">{`// ERRORE: non puoi aggiungere campi
public record Bad(int x) {
    private int extra; // NON COMPILA
}

// OK: campi statici sono permessi
public record Good(int x) {
    private static int counter = 0;
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Sealed Classes: Gerarchia Controllata">
            <p>
              Le <strong>sealed classes</strong> permettono di definire
              esplicitamente quali classi possono estenderle.
            </p>
            <CodeBlock language="java">{`// Solo Circle, Rectangle, Triangle possono estendere
public sealed class Shape
    permits Circle, Rectangle, Triangle {

    public abstract double area();
}

// Le sottoclassi devono essere: final, sealed, o non-sealed
public final class Circle extends Shape {
    private final double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="blue" border="left" title="Modificatori delle Sottoclassi">
            <p>
              Ogni sottoclasse di una sealed class deve dichiarare uno di questi
              modificatori:
            </p>
            <CodeBlock language="java">{`// FINAL: nessun'altra classe può estendere
public final class Circle extends Shape { }

// SEALED: definisce ulteriori sottoclassi permesse
public sealed class Rectangle extends Shape
    permits Square {
    // ...
}
public final class Square extends Rectangle { }

// NON-SEALED: apre la gerarchia a qualsiasi classe
public non-sealed class Triangle extends Shape {
    // Chiunque può estendere Triangle
}`}</CodeBlock>
            <Note>
              Le sottoclassi devono essere nello stesso modulo (o package se non
              usi moduli).
            </Note>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="green" border="left" title="Pattern Matching con Sealed Classes">
            <p>
              Le sealed classes abilitano pattern matching esaustivo con{" "}
              <code>switch</code>:
            </p>
            <CodeBlock language="java">{`public double getArea(Shape shape) {
    // Il compilatore sa che questi sono tutti i casi
    return switch (shape) {
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.width() * r.height();
        case Triangle t -> 0.5 * t.base() * t.height();
        // Nessun default necessario!
    };
}`}</CodeBlock>
            <Note>
              Se aggiungi una nuova sottoclasse permessa, il compilatore ti
              avvisa di tutti gli switch che devono essere aggiornati.
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Records + Sealed: Algebraic Data Types">
            <p>
              Combinando records e sealed classes puoi creare{" "}
              <strong>Algebraic Data Types</strong> come in linguaggi funzionali:
            </p>
            <CodeBlock language="java">{`public sealed interface Result<T>
    permits Success, Failure {
}

public record Success<T>(T value)
    implements Result<T> {}

public record Failure<T>(String error)
    implements Result<T> {}

// Utilizzo con pattern matching
Result<Integer> result = compute();
String message = switch (result) {
    case Success<Integer> s -> "Got: " + s.value();
    case Failure<Integer> f -> "Error: " + f.error();
};`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column>
          <Box color="gray" border="left" title="Riepilogo: Quando Usare Records vs Sealed Classes">
            <Row>
              <Column width="half">
                <p>
                  <strong>Usa Records quando:</strong>
                </p>
                <ul>
                  <li>
                    Hai bisogno di una classe per trasportare dati immutabili
                  </li>
                  <li>Vuoi evitare boilerplate (getter, equals, hashCode)</li>
                  <li>
                    Stai creando DTOs, value objects, o risultati di query
                  </li>
                  <li>Non hai bisogno di ereditarietà</li>
                </ul>
              </Column>
              <Column width="half">
                <p>
                  <strong>Usa Sealed Classes quando:</strong>
                </p>
                <ul>
                  <li>Vuoi controllare chi può estendere la tua classe</li>
                  <li>
                    Stai modellando un insieme finito di varianti (sum types)
                  </li>
                  <li>
                    Vuoi pattern matching esaustivo garantito dal compilatore
                  </li>
                  <li>
                    Stai progettando un&apos;API dove l&apos;estensibilità deve essere limitata
                  </li>
                </ul>
              </Column>
            </Row>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
