import {
  Section,
  Row,
  Column,
  Box,
  Divider,
  Spacer,
  Math,
  MathBlock,
  Note,
  Definition,
  Theorem,
  FormulaTable,
  Example,
} from "@/components";

export default function Home() {
  return (
    <div className="page">
      <header className="header">
        <h1>Analisi 2</h1>
        {/* <p>Appunti per l&apos;esame</p> */}
      </header>

      {/* INTEGRALI */}
      <Section title="Integrali">
        <Definition term="Integrale definito">
          L&apos;integrale definito <Math>{"\\int_a^b f(x)\\,dx"}</Math>{" "}
          rappresenta l&apos;area con segno della regione compresa tra il
          grafico di <Math>{"f"}</Math>, l&apos;asse <Math>{"x"}</Math> e le
          rette <Math>{"x = a"}</Math> e <Math>{"x = b"}</Math>.
        </Definition>

        {/* <Box color="gray" border="left" title="Regole di derivazione">
          <Row>
            <Column width="third">
              <MathBlock>{"(f \\cdot g)' = f' g + f g'"}</MathBlock>
            </Column>
            <Column width="third">
              <MathBlock>
                {"\\left(\\frac{f}{g}\\right)' = \\frac{f' g - f g'}{g^2}"}
              </MathBlock>
            </Column>
            <Column width="third">
              <MathBlock>{"(f \\circ g)' = f'(g) \\cdot g'"}</MathBlock>
            </Column>
          </Row>
        </Box> */}

        {/* Example: Two boxes side by side */}
        <Row>
          <Column width="half">
            <Box color="yellow" border="left" title="Sostituzione diretta">
              <MathBlock>
                {"\\int f(ax+b)\\,dx = \\frac{1}{a}F(ax+b) + C"}
              </MathBlock>
            </Box>
          </Column>
          <Column width="half">
            <Box
              color="green"
              border="left"
              title="Sostituzione diretta"
            >
              <MathBlock>
                {"\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln |f(x)| + C"}
              </MathBlock>
            </Box>
          </Column>
          <Column width="half">
            <Box color="blue" border="left" title="Integrazione per parti">
              <MathBlock>
                {"\\int u'(x)v(x)\\,dx = u(x)v(x) - \\int u(x)v'(x)\\,dx"}
              </MathBlock>
            </Box>
          </Column>
          <Column width="half">
            <Box color="red" border="left" title="Sostituzione diretta">
              <MathBlock>{"\\int g'(x)f(g(x))\\,dx = F(g(x)) + C"}</MathBlock>
            </Box>
          </Column>
        </Row>

        <Row>
          <Column width="third">
            <Example title="Metodo sostituzione">
              <Math>{"\\int \\frac{e^x}{\\sqrt{1 - e^{2x}}} dx"}</Math>
              <ol className="example-steps">
                <li>
                  Poni <Math>{"t = e^x"}</Math>, quindi <br />
                  <Math>{"\\frac{dt}{dx} = e^x \\implies dt = (e^x)' dx"}</Math>
                </li>
                <li>
                  <Math>
                    {"\\int \\frac{1}{\\sqrt{1 - t^2}} dt = \\arcsin(t) + C"}
                  </Math>
                </li>
                <li>
                  <Math>{"= \\arcsin(e^x) + C"}</Math>
                </li>
              </ol>
            </Example>
          </Column>
          <Column width="two-thirds">
            <Example title="Metodo frazioni parziali">
              <Note>
                Applicabile solo se il grado del numeratore è minore del grado
                del denominatore. In caso contrario, eseguire prima la divisione
                polinomiale.
              </Note>
              <Math>{"\\int \\frac{x^3-3x-1}{x^2-x-2} dx"}</Math>
              <ol className="example-steps">
                <Row>
                  <Column width="half">
                    <li>
                      Divisione:
                      <MathBlock>{`\\begin{array}{r|l}
x^3-3x-1 & x^2-x-2 \\\\
\\hline
-x^3+x^2+2x & x+1 \\\\
\\hline
x^2-x-1 & \\\\
-x^2+x+2 & \\\\
\\hline
1 &
\\end{array}`}</MathBlock>
                    </li>
                    <li>
                      <Math>
                        {"\\frac{x^3-3x-1}{x^2-x-2} = x+1 + \\frac{1}{x^2-x-2}"}
                      </Math>
                    </li>
                    <li>
                      Risultato Finale: <br />
                      <Math>
                        {
                          "\\frac{x^2}{2} + x + \\frac{1}{3}\\ln|x-2| - \\frac{1}{3}\\ln|x+1| + C"
                        }
                      </Math>
                    </li>
                  </Column>
                  <Column width="half">
                    <li>
                      Frazioni parziali per il resto:
                      <MathBlock>
                        {
                          "\\frac{1}{(x-2)(x+1)} = \\frac{A}{x-2} + \\frac{B}{x+1}"
                        }
                      </MathBlock>
                      Oppure nel caso di una radice doppia:
                      <Math>{`\\frac{1}{(x-2)^3(x+1)} = \\frac{A}{x-2} + \\frac{B}{(x-2)^2} + \\frac{C}{(x-2)^3} + \\frac{D}{x+1}`}</Math>
                      <MathBlock>
                        {"= \\frac{(A+B)x + (A-2B)}{(x-2)(x+1)}"}
                      </MathBlock>
                      <MathBlock>{`\\begin{cases} A+B = 0 \\\\ A-2B = 1 \\end{cases} \\Rightarrow \\begin{cases} A = \\frac{1}{3} \\\\ B = -\\frac{1}{3} \\end{cases}`}</MathBlock>
                    </li>
                  </Column>
                </Row>
              </ol>
            </Example>
          </Column>
        </Row>

        <Theorem title="Area racchiusa tra due curve">
          <MathBlock>{"A = \\int_a^b |f(x) - g(x)| dx"}</MathBlock>
        </Theorem>
      </Section>

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

      {/* SOLIDI DI ROTAZIONE */}
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

      <Section title="Equazioni differenziali">
        <Row>
          <Column width="half">
            <Box color="red" border="left" title="EDO I ordine lineare">
              <Math>{"y' + p(x)y = q(x)"}</Math>
              <MathBlock>
                {"y = e^{-\\mu(x)} \\int q(x) e^{\\mu(x)}\\,dx + C"}
              </MathBlock>
            </Box>
          </Column>
          <Column width="half">
            <Box color="yellow" border="left" title="Variabili separabili">
              <Math>{"y' = f(x) \\cdot g(y)"}</Math>
              <MathBlock>
                {"\\int \\frac{dy}{g(y)} = \\int f(x)\\,dx"}
              </MathBlock>
            </Box>
          </Column>
        </Row>

        <Theorem title="Teorema di Cachy">
          <Row>
            <Column width="half">
              <MathBlock>{"\\frac{dy}{dx} = f(x)g(y)"}</MathBlock>
            </Column>
            <Column width="half">
              <MathBlock>
                {"\\int \\frac{1}{g(y)} dy = \\int f(x)\\,dx"}
              </MathBlock>
            </Column>
          </Row>
        </Theorem>

        <Theorem title="EDO II ordine a coefficienti costanti">
          Per <Math>{"y'' + ay' + by = 0"}</Math>, equazione caratteristica{" "}
          <Math>{"p(t) = at^2 + bt + c = 0"}</Math>, dopo aver calcolato gli
          zeri <Math>{"r_1, r_2"}</Math>:
          <ul>
            <li>
              Radici reali distinte (<Math>{"delta > 0"}</Math>):{" "}
              <Math>{"y = C_1 e^{r_1 t} + C_2 e^{r_2 t}"}</Math>
            </li>
            <li>
              Radice doppia (<Math>{"delta = 0"}</Math>):{" "}
              <Math>{"y = (C_1 + C_2 t) e^{r t}"}</Math>
            </li>
            <li>
              Radici complesse (<Math>{"delta < 0"}</Math>):{" "}
              <Math>
                {"y = e^{\\alpha t}(k_1 \\cos\\beta t + k_2 \\sin\\beta t)"}
              </Math>
              <br /> con{" "}
              <Math>
                {
                  "\\Delta = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} = \\alpha \\pm i \\beta"
                }
              </Math>
            </li>
          </ul>
        </Theorem>

        <Theorem title="> 2 lineari omogenee a coefficienti costanti">
          Per <Math>{"y^{(n)} + a_{n-1}y^{(n-1)} + ... + a_1y' + a_0y = 0"}</Math>, equazione caratteristica{" "}
          <Math>{"p(t) = t^n + a_{n-1}t^{n-1} + ... + a_1t + a_0 = 0"}</Math>, dopo aver calcolato gli
          zeri <Math>{"r_1, r_2, ... , r_n"}</Math>:
          <ul>
            <li>
              Radici reali distinte (<Math>{"delta > 0"}</Math>):{" "}
              <Math>{"y = C_1 e^{r_1 t} + C_2 e^{r_2 t} + ... + C_n e^{r_n t}"}</Math>
            </li>
            <li>
              Radice doppia (<Math>{"delta = 0"}</Math>):{" "}
              <Math>{"y = (C_1 + C_2 t + C_3 t^2) e^{r t} + ... + (C_n + C_{n+1} t + C_{n+2} t^2) e^{r t}"}</Math>
            </li>
            <li>
              Radici complesse (<Math>{"delta < 0"}</Math>):{" "}
              <Math>
                {"y = e^{\\alpha t}(C_1 \\cos\\beta t + C_2 \\sin\\beta t) + ... + e^{\\alpha t}(C_n \\cos\\beta t + C_{n+1} \\sin\\beta t)"}
              </Math>
            </li>
          </ul>
        </Theorem>

        <Box color="green" border="left" title="lineari a coefficienti costanti inomogenee (Ansatz)">
          Data la equazione differenziale <Math>{"y^{(n)} + a_{n-1}y^{(n-1)} + ... + a_1y' + a_0y = f(x)"}</Math>:
          <Row>
            <Column width="third">
              <strong>Step 1</strong> &rarr; Equazione omogenea associata: <br />
              <span className="text-[0.7rem] italic">Risolvibile con il metodo sopra.</span>
            </Column>
            <Column width="two-thirds">
              <strong>Step 2</strong> &rarr; Trovare la soluzione particolare yₚ(x) della forma: <br />
              <Math>{"y_p(x) = A_n x^n + A_{n-1} x^{n-1} + ... + A_1 x + A_0"}</Math>
              <Example color="green" radius="md" border="all">
                Esempio con <Math>{"y'' - 3y' + 2y = 2t^2 + 1"}</Math>
                <ol className="example-steps">
                  <li>
                    <Math>{"y_p(t) = A t^2 + B t + C"}</Math><br />
                    <Math>{"y_p'(t) = 2A t + B"}</Math><br />
                    <Math>{"y_p''(t) = 2A"}</Math><br />
                  </li>
                  <li>
                    Sostituire nell&apos;equazione differenziale:
                    <MathBlock gap="sm">{"2A + 2A t + B - 3(2A t + B) + 2(A t^2 + B t + C) = 2t^2 + 1"
                    + "\\newline t^2(2A) + t(-6A + 2B) + (2A - 3B + 2C) = 2t^2 + 1"
                    + "\\newline \\begin{cases} 2A = 2 \\\\ -6A + 2B = 0 \\\\ 2A - 3B + 2C = 1 \\end{cases}"
                    + "\\begin{cases} A = 1 \\\\ B = 3 \\\\ C = 4 \\end{cases}"}</MathBlock>
                  </li>
                </ol>
              </Example>
            </Column>
          </Row>

          <strong>Step 3</strong> &rarr; Unione delle due soluzioni:
          <MathBlock>{"y = y_h(x) + y_p(x)"}</MathBlock>
        </Box>
      </Section>

      {/* <Divider style="solid" spacing="lg" /> */}

      {/* SERIE */}
      {/* <Section title="Serie numeriche">
        <Definition term="Serie">
          Data una successione <Math>{"\\{a_n\\}"}</Math>, la serie{" "}
          <Math>{"\\sum_{n=1}^{\\infty} a_n"}</Math> è il limite delle somme
          parziali.
        </Definition>

        <Row gap="md">
          <Column width="third">
            <Box color="gray" border="solid" title="Criterio rapporto">
              <MathBlock>{"L = \\lim \\frac{a_{n+1}}{a_n}"}</MathBlock>
              <Math>{"L < 1"}</Math> → converge
            </Box>
          </Column>
          <Column width="third">
            <Box color="gray" border="solid" title="Criterio radice">
              <MathBlock>{"L = \\lim \\sqrt[n]{a_n}"}</MathBlock>
              <Math>{"L < 1"}</Math> → converge
            </Box>
          </Column>
          <Column width="third">
            <Box color="gray" border="solid" title="Serie geometrica">
              <MathBlock>{"\\sum q^n = \\frac{1}{1-q}"}</MathBlock>
              <Math>{"|q| < 1"}</Math>
            </Box>
          </Column>
        </Row>
      </Section>

      <Divider style="dashed" spacing="md" /> */}

      {/* SERIE DI TAYLOR */}
      {/* <Section title="Serie di Taylor">
        <Definition term="Serie di Taylor">
          <MathBlock>
            {"f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(x_0)}{n!}(x - x_0)^n"}
          </MathBlock>
        </Definition>

        <Spacer size="sm" />

        // Example: Two columns for notable expansions
        <Row>
          <Column width="half">
            <Box color="blue" border="dashed">
              <MathBlock>{"e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots"}</MathBlock>
              <MathBlock>{"\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots"}</MathBlock>
            </Box>
          </Column>
          <Column width="half">
            <Box color="green" border="dashed">
              <MathBlock>{"\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots"}</MathBlock>
              <MathBlock>{"\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots"}</MathBlock>
            </Box>
          </Column>
        </Row>
      </Section>

      <Divider style="double" spacing="lg" /> */}

      {/* EQUAZIONI DIFFERENZIALI */}
      {/* <Section title="Equazioni differenziali">
        <Row>
          <Column width="half">
            <Box color="red" border="left" title="EDO I ordine lineare">
              <Math>{"y' + p(x)y = q(x)"}</Math>
              <MathBlock>
                {"y = e^{-P(x)} \\left( \\int q(x) e^{P(x)}\\,dx + C \\right)"}
              </MathBlock>
            </Box>
          </Column>
          <Column width="half">
            <Box color="yellow" border="left" title="Variabili separabili">
              <Math>{"y' = f(x) \\cdot g(y)"}</Math>
              <MathBlock>{"\\int \\frac{dy}{g(y)} = \\int f(x)\\,dx"}</MathBlock>
            </Box>
          </Column>
        </Row>

        <Spacer size="md" />

        <Theorem title="EDO II ordine a coefficienti costanti">
          Per <Math>{"y'' + ay' + by = 0"}</Math>, equazione caratteristica{" "}
          <Math>{"\\lambda^2 + a\\lambda + b = 0"}</Math>:
          <ul>
            <li>
              Radici reali distinte: <Math>{"y = C_1 e^{\\lambda_1 x} + C_2 e^{\\lambda_2 x}"}</Math>
            </li>
            <li>
              Radice doppia: <Math>{"y = (C_1 + C_2 x) e^{\\lambda x}"}</Math>
            </li>
            <li>
              Radici complesse: <Math>{"y = e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)"}</Math>
            </li>
          </ul>
        </Theorem>
      </Section>

      <Divider style="solid" spacing="md" /> */}

      {/* INTEGRALI MULTIPLI */}
      {/* <Section title="Integrali multipli">
        <Row>
          <Column width="two-thirds">
            <Theorem title="Teorema di Fubini">
              Se <Math>{"f"}</Math> è continua su{" "}
              <Math>{"D = [a,b] \\times [c,d]"}</Math>:
              <MathBlock>
                {"\\iint_D f\\,dA = \\int_a^b \\left( \\int_c^d f(x,y)\\,dy \\right) dx"}
              </MathBlock>
            </Theorem>
          </Column>
          <Column width="third">
            <Box color="gray" border="solid" title="Coordinate polari">
              <MathBlock>{"x = r\\cos\\theta"}</MathBlock>
              <MathBlock>{"y = r\\sin\\theta"}</MathBlock>
              <MathBlock>{"dA = r\\,dr\\,d\\theta"}</MathBlock>
            </Box>
          </Column>
        </Row>

        <Note>
          Per regioni con simmetria radiale, le coordinate polari semplificano
          il calcolo.
        </Note>
      </Section> */}

      {/* Add more sections below... */}
    </div>
  );
}
