import {
  Section,
  Math,
  Definition,
  FormulaTable,
} from "@/components/index";

export function CurveParametricheSection() {
  return (
    <Section title="Curve parametriche">
      <Definition term="Curve parametrica">
        Una curva parametrica è una funzione{" "}
        <Math>{"r(t) = (x(t), y(t))"}</Math> da <Math>{"[a, b]"}</Math> a{" "}
        <Math>{"\\mathbb{R}^2"}</Math>. <br />
        L&apos;area è data da: <Math>{"\\int_a^b g(t) * f'(t) dt"}</Math>
      </Definition>

      <div className="formulas-inline">
        <span>
          <strong>Circonferenza:</strong> <Math>{"x^2 + y^2 = r^2"}</Math> →{" "}
          <Math>{"(r\\cos t,\\, r\\sin t)"}</Math>
        </span>
        <span className="formula-separator">|</span>
        <span>
          <strong>Ellisse:</strong> <Math>{"\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1"}</Math> →{" "}
          <Math>{"(a\\cos t,\\, b\\sin t)"}</Math>
        </span>
      </div>

      <FormulaTable
        headers={["Funzioni", "Curve parametriche"]}
        rows={[
          {
            label: "Lunghezza",
            cells: [
              "\\ell = \\int_a^b \\sqrt{1 + \\left( f'(x) \\right)^2} \\, dx",
              "\\ell = \\int_\\alpha^\\beta \\sqrt{\\left( f'(t) \\right)^2 + \\left( g'(t) \\right)^2} \\, dt",
            ],
          },
        ]}
      />
    </Section>
  );
}
