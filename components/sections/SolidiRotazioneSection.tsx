import {
  Section,
  Row,
  Column,
  Math,
  MathBlock,
  Definition,
  Theorem,
  FormulaTable,
} from "@/components";

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
          <strong>Gusci cilindrici (asse y):</strong>{" "}
          <Math>{"V = 2\\pi \\int_a^b x \\left[ f(x) - g(x) \\right] dx"}</Math>
        </span>
      </div>

      <Theorem title="Baricentro con asse x">
        <Row>
          <Column width="half">
            <MathBlock>
              {"x_G = \\frac{1}{A} \\int_a^b x(t) f(x) dx"}
            </MathBlock>
          </Column>
          <Column width="half">
            <MathBlock>{"y_G = \\frac{1}{2A} \\int_a^b f(x)^2 dx"}</MathBlock>
          </Column>
        </Row>
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
                  "d(P, r) = \\frac{|ax_P + by_P + c|}{\\sqrt{a^2 + b^2}} = \\frac{|y_P - (m * x_P + q)|}{\\sqrt{1 + m^2}}"
                }
              </Math>
            </Definition>
          </Column>
        </Row>
      </Theorem>
    </Section>
  );
}
