import {
  Section,
  Math,
  Definition,
  FormulaTable,
} from "@/components";

export function CurveParametricheSection() {
  return (
    <Section title="Curve parametriche">
      <Definition term="Curve parametrica">
        Una curva parametrica è una funzione{" "}
        <Math>{"r(t) = (x(t), y(t))"}</Math> da <Math>{"[a, b]"}</Math> a{" "}
        <Math>{"\\mathbb{R}^2"}</Math>. <br />
        L&apos;area è data da: <Math>{"\\int_a^b g(t) * f'(t) dt"}</Math>
      </Definition>

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
