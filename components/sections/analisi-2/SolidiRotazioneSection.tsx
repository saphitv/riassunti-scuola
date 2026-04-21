import {
  Section,
  Row,
  Column,
  Math,
  MathBlock,
  Definition,
  Theorem,
  FormulaTable,
  Note,
} from "@/components/index";

export function SolidiRotazioneSection() {
  return (
    <Section title="Solidi di rotazione">
      <FormulaTable
        headers={["Funzioni", "Curve parametriche"]}
        rows={[
          {
            label: "Volume",
            cells: [
              "V = \\int_a^b \\pi \\left( f(x) \\right)^2 dx",
              "V = \\int_\\alpha^\\beta \\pi \\left( g(t) \\right)^2 \\cdot f'(t) \\, dt",
            ],
          },
          {
            label: "Area laterale",
            cells: [
              "A_S = \\int_a^b 2\\pi f(x) \\cdot \\sqrt{1 + \\left( f'(x) \\right)^2} \\, dx",
              "A_S = \\int_\\alpha^\\beta 2\\pi g(t) \\cdot \\sqrt{\\left( f'(t) \\right)^2 + \\left( g'(t) \\right)^2} \\, dt",
            ],
          },
        ]}
      />

      <div className="formulas-inline">
        <span>
          <strong>Tra 2 funzioni (asse x):</strong>{" "}
          <Math>{"V = \\pi \\int_a^b \\left[ f(x)^2 - g(x)^2 \\right] dx"}</Math>
        </span>
        <span className="formula-separator">|</span>
        <span>
          <strong>Tra 2 funzioni (asse y):</strong>{" "}
          <Math>{"V = \\pi \\int_c^d \\left[ f(y)^2 - g(y)^2 \\right] dy"}</Math>
        </span>
      </div>

      <Theorem title="Metodo dei cilindri cavi (Shell Method)">
        <Row>
          <Column width="half">
            <Definition term="Rotazione attorno all'asse y">
              Quando la regione tra <Math>{"f(x)"}</Math> e <Math>{"g(x)"}</Math> con <Math>{"f(x) \\geq g(x)"}</Math> su <Math>{"[a,b]"}</Math> ruota attorno all&apos;asse y:
              <MathBlock>{"V = 2\\pi \\int_a^b x \\left[ f(x) - g(x) \\right] dx"}</MathBlock>
              <Note>
                Il raggio del cilindro e <Math>{"x"}</Math>, l&apos;altezza e <Math>{"f(x) - g(x)"}</Math>.
              </Note>
            </Definition>
          </Column>
          <Column width="half">
            <Definition term="Rotazione attorno all'asse x">
              Quando la regione tra <Math>{"f(y)"}</Math> e <Math>{"g(y)"}</Math> con <Math>{"f(y) \\geq g(y)"}</Math> su <Math>{"[c,d]"}</Math> ruota attorno all&apos;asse x:
              <MathBlock>{"V = 2\\pi \\int_c^d y \\left[ f(y) - g(y) \\right] dy"}</MathBlock>
              <Note>
                Il raggio del cilindro e <Math>{"y"}</Math>, l&apos;altezza e <Math>{"f(y) - g(y)"}</Math>.
              </Note>
            </Definition>
          </Column>
        </Row>
        <Note>
          <strong>Quando usare i cilindri cavi:</strong> Questo metodo e utile quando l&apos;integrazione con il metodo dei dischi risulta difficile (es. quando bisogna invertire la funzione) o quando la regione e definita piu naturalmente rispetto all&apos;asse parallelo a quello di rotazione.
        </Note>
      </Theorem>

      <Theorem title="Baricentro con asse x">
        <Row>
          <Column width="half">
            <MathBlock>
              {"x_G = \\frac{1}{A} \\int_a^b x[f(x) - g(x)] dx"}
            </MathBlock>
          </Column>
          <Column width="half">
            <MathBlock>{"y_G = \\frac{1}{2A} \\int_a^b [f(x)^2 - g(x)^2] dx"}</MathBlock>
          </Column>
        </Row>
        <Note>
          Nel caso di una funzione composta, l&apos;integrale è la somma degli integrali delle singole parti (es. <Math>{"\\frac{1}{A} \\int_a^c = \\frac{1}{A} (\\int_a^b + \\int_b^c)"}</Math>).
        </Note>
      </Theorem>

      <Theorem title="Teorema di Pappo">
        <Row>
          <Column width="third">
            <MathBlock>{"A_r = \\int_a^b f(x) dx"}</MathBlock>
            <MathBlock>{"V = 2\\pi  A_r * r"}</MathBlock>
          </Column>
          <Column width="two-thirds">
            <Definition term="r">
              Raggio di rotazione puo essere preso sottraendo il baricentro
              dalla distanza tra il punto di rotazione e l&apos;asse di
              rotazione. Oppure se non perpendicolare all&apos;asse di
              rotazione si puo usare: <br />
              <Math>
                {
                  "d(P, r) = \\frac{|ax_P + by_P + c|}{\\sqrt{a^2 + b^2}} = \\frac{|m*x_P - y_P + q|}{\\sqrt{m^2 + 1}}"
                }
              </Math>
            </Definition>
          </Column>
        </Row>
      </Theorem>
    </Section>
  );
}
