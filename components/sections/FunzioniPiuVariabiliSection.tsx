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
    <Section title="Funzioni a più variabili">
      {/* Limiti e continuità */}
      <Definition term="Limite">
        <MathBlock>
          {
            "\\lim_{(x,y) \\to (x_0, y_0)} f(x,y) = L \\iff \\forall \\varepsilon > 0, \\exists \\delta > 0 : 0 < \\|(x,y) - (x_0,y_0)\\| < \\delta \\Rightarrow |f(x,y) - L| < \\varepsilon"
          }
        </MathBlock>
        <Note>
          Per <strong>verificare l&apos;esistenza</strong> del limite, si può
          usare il teorema del confronto o passare a coordinate polari. Per{" "}
          <strong>dimostrare che non esiste</strong>, basta trovare due
          restrizioni (percorsi) che danno limiti diversi.
        </Note>
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Coordinate polari">
            <MathBlock>
              {
                "\\begin{cases} x = x_0 + \\rho\\cos\\theta \\\\ y = y_0 + \\rho\\sin\\theta \\end{cases}"
              }
            </MathBlock>
            <Note>
              Se il limite per <Math>{"\\rho \\to 0^+"}</Math> non dipende da{" "}
              <Math>{"\\theta"}</Math>, allora il limite esiste.
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Continuità">
            <Math>{"f"}</Math> è continua in <Math>{"(x_0, y_0)"}</Math> se:
            <MathBlock>
              {"\\lim_{(x,y) \\to (x_0, y_0)} f(x,y) = f(x_0, y_0)"}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      {/* Derivate parziali e gradiente */}
      <Theorem title="Derivate parziali">
        <Row>
          <Column width="half">
            <MathBlock>
              {
                "\\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x+h, y) - f(x,y)}{h}"
              }
            </MathBlock>
          </Column>
          <Column width="half">
            <MathBlock>
              {
                "\\frac{\\partial f}{\\partial y} = \\lim_{k \\to 0} \\frac{f(x, y+k) - f(x,y)}{k}"
              }
            </MathBlock>
          </Column>
        </Row>
        <Note>
          Si calcola derivando rispetto a una variabile tenendo le altre
          costanti.
        </Note>
      </Theorem>

      <Definition term="Gradiente">
        <MathBlock>
          {
            "\\nabla f(x,y) = \\text{grad } f = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right)"
          }
        </MathBlock>
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
        </Note>
        <Row>
          <Column width="third">
            <Box color="green" border="left" title="Massima crescita">
              <MathBlock>{"D_{\\text{max}} = \\|\\nabla f\\|"}</MathBlock>
              Direzione: <Math>{"\\vec{v} = \\frac{\\nabla f}{\\|\\nabla f\\|}"}</Math>
            </Box>
          </Column>
          <Column width="third">
            <Box color="red" border="left" title="Massima decrescita">
              <MathBlock>{"D_{\\text{min}} = -\\|\\nabla f\\|"}</MathBlock>
              Direzione: <Math>{"\\vec{v} = -\\frac{\\nabla f}{\\|\\nabla f\\|}"}</Math>
            </Box>
          </Column>
          <Column width="third">
            <Box color="yellow" border="left" title="Nulla">
              <MathBlock>{"D_{\\vec{v}} f = 0"}</MathBlock>
              Direzione: <Math>{"\\vec{v} \\perp \\nabla f"}</Math>
            </Box>
          </Column>
        </Row>
      </Theorem>

      {/* Differenziale totale */}
      <Definition term="Differenziale totale">
        <MathBlock>
          {
            "df = \\frac{\\partial f}{\\partial x} dx + \\frac{\\partial f}{\\partial y} dy = \\nabla f \\cdot d\\vec{r}"
          }
        </MathBlock>
        <Note>
          Se <Math>{"f"}</Math> è differenziabile in{" "}
          <Math>{"(x_0, y_0)"}</Math>, allora{" "}
          <Math>{"f"}</Math> è continua e ammette derivate parziali in quel
          punto. Il viceversa <strong>non</strong> vale.
        </Note>
      </Definition>

      <Theorem title="Condizione sufficiente di differenziabilità">
        Se le derivate parziali <Math>{"f_x"}</Math> e <Math>{"f_y"}</Math>{" "}
        esistono in un intorno di <Math>{"(x_0, y_0)"}</Math> e sono{" "}
        <strong>continue</strong> in <Math>{"(x_0, y_0)"}</Math>, allora{" "}
        <Math>{"f"}</Math> è differenziabile in <Math>{"(x_0, y_0)"}</Math>.
      </Theorem>

      {/* Studio di funzione - Punti critici */}
      <Theorem title="Punti critici e Hessiana">
        <Definition term="Punto critico">
          Un punto <Math>{"(x_0, y_0)"}</Math> è critico se{" "}
          <Math>{"\\nabla f(x_0, y_0) = \\vec{0}"}</Math>, ovvero:
          <MathBlock>
            {
              "\\begin{cases} \\frac{\\partial f}{\\partial x}(x_0, y_0) = 0 \\\\ \\frac{\\partial f}{\\partial y}(x_0, y_0) = 0 \\end{cases}"
            }
          </MathBlock>
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

        <MathBlock>
          {"\\det(H) = f_{xx} \\cdot f_{yy} - (f_{xy})^2"}
        </MathBlock>
      </Theorem>

      {/* Interpretazione grafica */}
      <Theorem title="Interpretazione grafica">
        <Row>
          <Column width="half">
            <Definition term="Curve di livello">
              Le curve di livello sono le curve{" "}
              <Math>{"f(x, y) = k"}</Math> (costante). Rappresentano
              &quot;sezioni orizzontali&quot; del grafico.
              <Note>
                Curve più vicine indicano pendenza maggiore.
              </Note>
            </Definition>
          </Column>
          <Column width="half">
            <Definition term="Piano tangente">
              <MathBlock>
                {
                  "z = f(x_0, y_0) + f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0)"
                }
              </MathBlock>
            </Definition>
          </Column>
        </Row>
        <Note>
          <strong>Riepilogo geometrico:</strong> Il gradiente è perpendicolare
          alle curve di livello. In un punto di massimo/minimo, le curve di
          livello formano &quot;cerchi concentrici&quot;. In un punto di sella,
          le curve di livello si intersecano.
        </Note>
      </Theorem>

      {/* Studio di funzione completo */}
      <Box color="blue" border="left" title="Schema studio di funzione">
        <ol className="example-steps">
          <li>
            <strong>Dominio:</strong> Determinare dove <Math>{"f(x,y)"}</Math> è
            definita
          </li>
          <li>
            <strong>Simmetrie:</strong> Verificare se{" "}
            <Math>{"f(-x,-y) = f(x,y)"}</Math> o altre simmetrie
          </li>
          <li>
            <strong>Limiti al bordo:</strong> Studiare il comportamento sui
            bordi del dominio e all&apos;infinito
          </li>
          <li>
            <strong>Punti critici:</strong> Risolvere{" "}
            <Math>{"\\nabla f = \\vec{0}"}</Math>
          </li>
          <li>
            <strong>Classificazione:</strong> Usare la matrice Hessiana
          </li>
          <li>
            <strong>Estremi vincolati:</strong> Se il dominio è limitato,
            studiare anche il bordo
          </li>
        </ol>
      </Box>
    </Section>
  );
}
