import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
  Definition,
  Theorem,
  FormulaTable,
} from "@/components";

export function FunzioniPiuVariabiliSection() {
  return (
    <Section title="Funzioni a più variabili" allowPageBreak>
      {/* Dominio - Quick reference */}
      <Box color="gray" border="solid" title="Dominio - Checklist">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem 1rem", fontSize: "var(--font-size-small)" }}>
          <div><Math>{"\\ln(\\cdot)"}</Math>: arg <Math>{"> 0"}</Math></div>
          <div><Math>{"\\sqrt{\\cdot}"}</Math>: arg <Math>{"\\geq 0"}</Math></div>
          <div><Math>{"\\frac{1}{\\cdot}"}</Math>: den <Math>{"\\neq 0"}</Math></div>
          <div><Math>{"\\frac{1}{\\log(\\cdot)}"}</Math>: arg <Math>{"\\neq 1"}</Math></div>
        </div>
      </Box>

      {/* Derivate parziali e gradiente */}
      <Theorem title="Derivate parziali">
        <Row>
          <Column width="half">
            <MathBlock>
              {
                "\\frac{\\partial f}{\\partial x} = f_x = \\lim_{h \\to 0} \\frac{f(x+h, y) - f(x,y)}{h}"
              }
            </MathBlock>
          </Column>
          <Column width="half">
            <MathBlock>
              {
                "\\frac{\\partial f}{\\partial y} = f_y = \\lim_{k \\to 0} \\frac{f(x, y+k) - f(x,y)}{k}"
              }
            </MathBlock>
          </Column>
        </Row>
      </Theorem>

      {/* Piano tangente e retta normale */}
      <Box color="gray" border="solid">
        <Row>
          <Column width="fourth">
          <Math>{"P_0 = \\begin{pmatrix} x_0 \\\\ y_0 \\\\ f(x_0, y_0) \\end{pmatrix}"}</Math>
          
          </Column>
          <Column width="three-fourths">
            <Row>
              <Column width="auto">
                <strong>Piano tangente:</strong>
                <Math>
                  {"z = z_0 + f_x(P_0)(x - x_0) + f_y(P_0)(y - y_0)"}
                </Math>
              </Column>
              <Column width="auto">
                <strong>Retta normale:</strong>
                <Math>
                  {"r(t) = \\begin{pmatrix} x_0 \\\\ y_0 \\\\ f(x_0, y_0) \\end{pmatrix} + t \\cdot \\begin{pmatrix} -f_x(P_0) \\\\ -f_y(P_0) \\\\ 1 \\end{pmatrix}"}
                </Math>
              </Column>
            </Row>
          </Column>
        </Row>
        <Row>
          <strong>Retta tangente</strong> (a curva di livello <Math>{"f(x,y) = k \\text{ o } f(x,y) = z"}</Math>): <Math>{"f_x(P_0)(x - x_0) + f_y(P_0)(y - y_0) = 0"}</Math>
        </Row>
      </Box>

      <Definition term="Gradiente">
        <Row>
          <Column width="half">
            <MathBlock>
              {
                "\\nabla f(x,y) = \\text{grad } f = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right) = (f_x, f_y)"
              }
            </MathBlock>
          </Column>
          <Column width="half">
            <MathBlock>
              {
                "\\nabla f = \\vec{0} \\iff f_x = 0 \\land f_y = 0 \\quad \\text{(punto critico)}"
              }
            </MathBlock>
          </Column>
        </Row>
        <Note>
          Il gradiente punta nella <strong>direzione di massima crescita</strong>{" "}
          della funzione ed è sempre <strong>perpendicolare</strong> alle curve
          di livello.
        </Note>
      </Definition>

      {/* Derivate direzionali */}
      <Theorem title="Derivata direzionale">
        <MathBlock>
          {
            "D_{\\vec{v}} f(x_0, y_0) = \\nabla f(x_0, y_0) \\cdot \\vec{v} = \\|\\nabla f\\| \\cos\\alpha"
          }
        </MathBlock>
        <Note>
          <Math>{"\\vec{v}"}</Math> deve essere un vettore <strong>unitario</strong>{" "}
          (<Math>{"\\|\\vec{v}\\| = 1"}</Math>). Se non lo è, normalizzare:{" "}
          <Math>{"\\hat{v} = \\frac{\\vec{v}}{\\|\\vec{v}\\|}"}</Math>
          <br />
          Da <Math>{"P_0"}</Math> verso <Math>{"P_1"}</Math>:{" "}
          <Math>{"\\vec{v} = P_1 - P_0"}</Math>
          <br />
          Se <Math>{"\\vec{v} = e_1 + e_2 - e_3"}</Math>:{" "}
          <Math>{"\\vec{v} = (1, 1, -1)"}</Math>, poi normalizzare
        </Note>
      </Theorem>

      <Box color="gray" border="solid" title="Calcolo sui bordi">
        <p>Per ogni bordo del dominio:</p>
        <ol className="example-steps">
          <li>
            <strong>Parametrizzare:</strong> Esprimere il bordo con una variabile (es. sul bordo <Math>{"y = 0"}</Math>, 
            sostituire in <Math>{"f(x,y)"}</Math> per ottenere <Math>{"g(x) = f(x, 0)"}</Math>)
          </li>
          <li>
            <strong>Derivare:</strong> Calcolare <Math>{"g'(x) = 0"}</Math> per trovare punti critici sul bordo
          </li>
          <li>
            <strong>Valutare:</strong> Calcolare <Math>{"f"}</Math> nei punti critici trovati
          </li>
        </ol>
        <Note>
          <strong>Esempio:</strong> Dominio <Math>{"D = \\{0 \\leq x \\leq 1, 0 \\leq y \\leq 1\\}"}</Math><br />
          Bordi: <Math>{"y=0"}</Math> → <Math>{"g_1(x) = f(x,0)"}</Math>, {" "}
          <Math>{"y=1"}</Math> → <Math>{"g_2(x) = f(x,1)"}</Math>, {" "}
          <Math>{"x=0"}</Math> → <Math>{"g_3(y) = f(0,y)"}</Math>, {" "}
          <Math>{"x=1"}</Math> → <Math>{"g_4(y) = f(1,y)"}</Math>
        </Note>
      </Box>

      {/* Studio di funzione - Punti critici */}
      <Theorem title="Punti critici e Hessiana">
        <Definition term="Punto critico">
          Un punto <Math>{"(x_0, y_0)"}</Math> è critico se{" "}
          <Math>{"\\nabla f(x_0, y_0) = \\vec{0}"}</Math>.
        </Definition>

        <Definition term="Matrice Hessiana">
          <MathBlock>
            {
              "H_f = \\begin{pmatrix} f_{xx} & f_{xy} \\\\ f_{yx} & f_{yy} \\end{pmatrix}"
            }
          </MathBlock>
          <Note>
            Per il teorema di Schwarz, se le derivate seconde miste sono
            continue: <Math>{"f_{xy} = f_{yx}"}</Math>
          </Note>
        </Definition>

        <FormulaTable
          headers={["Condizione", "Classificazione"]}
          rows={[
            {
              label: "det H > 0, f_{xx} > 0",
              cells: ["\\det(H) > 0 \\land f_{xx} > 0", "\\text{Minimo locale}"],
            },
            {
              label: "det H > 0, f_{xx} < 0",
              cells: ["\\det(H) > 0 \\land f_{xx} < 0", "\\text{Massimo locale}"],
            },
            {
              label: "det H < 0",
              cells: ["\\det(H) < 0", "\\text{Punto di sella}"],
            },
            {
              label: "det H = 0",
              cells: ["\\det(H) = 0", "\\text{Indeterminato}"],
            },
          ]}
        />

        <Box color="gray" border="solid" title="Calcolo del determinante">
          <MathBlock>
            {"\\det(H) = \\det \\begin{pmatrix} f_{xx} & f_{xy} \\\\ f_{yx} & f_{yy} \\end{pmatrix} = f_{xx} \\cdot f_{yy} - f_{xy} \\cdot f_{yx}"}
          </MathBlock>
          <Note>
            Poiché <Math>{"f_{xy} = f_{yx}"}</Math> (Schwarz), si ha: <Math>{"\\det(H) = f_{xx} \\cdot f_{yy} - (f_{xy})^2"}</Math>
          </Note>
        </Box>
      </Theorem>

      {/* Studio di funzione completo */}
      <Box color="blue" border="left" title="Schema studio di funzione">
        <ol className="example-steps">
          <li>
            <strong>Vertici:</strong> Valutare <Math>{"f"}</Math> nei vertici del dominio
          </li>
          <li>
            <strong>Punti critici:</strong> Risolvere{" "}
            <Math>{"\\nabla f = \\vec{0}"}</Math> e classificare con la Hessiana
          </li>
          <li>
            <strong>Controllo dei bordi:</strong> Parametrizzare ogni bordo e trovare estremi
          </li>
        </ol>
      </Box>

      
    </Section>
  );
}
