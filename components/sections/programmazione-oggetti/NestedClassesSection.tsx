import {
  Section,
  Row,
  Column,
  Box,
  Definition,
  CodeBlock,
} from "@/components";

export function NestedClassesSection() {
  return (
    <Section title="4. Nested Classes & Interfaces">
      <Definition term="Nested Class">
        Classe definita all&apos;interno di un&apos;altra per aumentare{" "}
        <strong>incapsulamento</strong> e <strong>modularità</strong>.
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Static Nested Class">
            <p>
              Semplice raggruppamento logico. <strong>Non</strong> ha accesso
              all&apos;istanza esterna.
            </p>
            <CodeBlock language="java">{`public class Outer {
    private static int staticField = 10;
    private int instanceField = 20;

    static class StaticNested {
        void test() {
            // OK: campo statico
            System.out.println(staticField);
            // ERRORE: no istanza outer
            // System.out.println(instanceField);
        }
    }
}

// Istanziazione
Outer.StaticNested nested = new Outer.StaticNested();`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Inner Class (non-static)">
            <p>
              Legata a un&apos;istanza della classe esterna. Accede a{" "}
              <strong>tutti i membri</strong>.
            </p>
            <CodeBlock language="java">{`public class Outer {
    private int value = 42;

    class Inner {
        void printValue() {
            // Accesso diretto ai membri outer
            System.out.println(value);
            // Riferimento esplicito
            System.out.println(Outer.this.value);
        }
    }
}

// Istanziazione: serve istanza outer
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Local Class">
            <p>Definita dentro un blocco metodo. Scope limitato.</p>
            <CodeBlock language="java">{`void process(final int x) {
    // Classe locale al metodo
    class LocalHelper {
        void compute() {
            // Può accedere a x (effectively final)
            System.out.println(x * 2);
        }
    }

    LocalHelper helper = new LocalHelper();
    helper.compute();
}
// LocalHelper non visibile qui`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Anonymous Class">
            <p>
              Dichiarata e istanziata insieme. <strong>Senza nome</strong>.
              Comune per implementazioni one-off.
            </p>
            <CodeBlock language="java">{`// Implementazione inline di interfaccia
button.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("Clicked!");
    }
});

// Equivalente con lambda (Java 8+)
button.addActionListener(e ->
    System.out.println("Clicked!")
);`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Box color="gray" border="solid" title="Riepilogo">
        <Row>
          <Column width="fourth">
            <p>
              <strong>Static Nested</strong>
              <br />
              No outer instance
            </p>
          </Column>
          <Column width="fourth">
            <p>
              <strong>Inner</strong>
              <br />
              Accesso a outer instance
            </p>
          </Column>
          <Column width="fourth">
            <p>
              <strong>Local</strong>
              <br />
              Dentro un metodo
            </p>
          </Column>
          <Column width="fourth">
            <p>
              <strong>Anonymous</strong>
              <br />
              No nome, usa e getta
            </p>
          </Column>
        </Row>
      </Box>
    </Section>
  );
}
