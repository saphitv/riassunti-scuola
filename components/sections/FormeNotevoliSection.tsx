import { Section, Row, Column, Math, MathBlock } from "@/components";
import { CurveVisualizer } from "@/components/CurveVisualizer";
import { VolumeVisualizer } from "@/components/VolumeVisualizer";

export function FormeNotevoliSection() {
  return (
    <Section title="Forme Notevoli">
      {/* Trigonometry Section - Compact */}
      <div className="box box-gray box-border-solid" style={{ padding: "0.5rem 0.75rem" }}>
        <div className="box-title" style={{ marginBottom: "0.35rem" }}>Trigonometria</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.25rem 1rem", fontSize: "var(--font-size-small)" }}>
          <div>
            <strong>Fondamentali:</strong><br />
            <Math>{"\\sin^2\\!x + \\cos^2\\!x = 1"}</Math>
          </div>
          <div>
            <strong>Duplicazione:</strong><br />
            <Math>{"\\sin 2x = 2\\sin x \\cos x"}</Math><br />
            <Math>{"\\cos 2x = \\cos^2\\!x - \\sin^2\\!x"}</Math>
          </div>
          <div>
            <strong>Bisezione:</strong><br />
            <Math>{"\\sin^2\\!x = \\frac{1 - \\cos 2x}{2}"}</Math><br />
            <Math>{"\\cos^2\\!x = \\frac{1 + \\cos 2x}{2}"}</Math>
          </div>
          <div>
            <strong>Addizione:</strong><br />
            <Math>{"\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta"}</Math><br />
            <Math>{"\\cos(\\alpha \\pm \\beta) = \\cos\\alpha\\cos\\beta \\mp \\sin\\alpha\\sin\\beta"}</Math>
          </div>
          <div>
            <strong>Parametriche</strong> (<Math>{"t = \\tan\\frac{x}{2}"}</Math>):<br />
            <Math>{"\\sin x = \\frac{2t}{1+t^2}"}</Math>, <Math>{"\\cos x = \\frac{1-t^2}{1+t^2}"}</Math>
          </div>
          <div>
            <strong>Werner:</strong><br />
            <Math>{"\\sin\\alpha\\cos\\beta = \\frac{1}{2}[\\sin(\\alpha+\\beta) + \\sin(\\alpha-\\beta)]"}</Math>
          </div>
        </div>
      </div>

      {/* Parametric Curves Section */}
      <div className="subsection">
        <h3 className="subsection-title">Curve Parametriche Classiche</h3>
        <Row gap="md">
          <Column width="auto">
            <CurveVisualizer type="cicloide" animate={true} color="#3b82f6" />
          </Column>
          <Column width="auto">
            <CurveVisualizer type="astroide" animate={true} color="#8b5cf6" />
          </Column>
          <Column width="auto">
            <CurveVisualizer type="cardioide" animate={true} color="#ec4899" />
          </Column>
          <Column width="auto">
            <CurveVisualizer type="lemniscata" animate={true} color="#f59e0b" />
          </Column>
        </Row>
      </div>

      {/* Volumes Section */}
      <div className="subsection">
        <h3 className="subsection-title">Volumi e Superfici</h3>
        <Row gap="md">
          <Column width="auto">
            <VolumeVisualizer type="piramide" color="#3b82f6" />
          </Column>
          <Column width="auto">
            <VolumeVisualizer type="cono" color="#22c55e" />
          </Column>
          <Column width="auto">
            <VolumeVisualizer type="sfera" color="#8b5cf6" />
          </Column>
          <Column width="auto">
            <VolumeVisualizer type="cilindro" color="#f59e0b" />
          </Column>
          <Column width="auto">
            <VolumeVisualizer type="toro" color="#ec4899" />
          </Column>
          <Column width="auto">
            <VolumeVisualizer type="paraboloide" color="#06b6d4" />
          </Column>
        </Row>
      </div>
    </Section>
  );
}
