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
  Example,
} from "@/components";

export function IntegraliSection() {
  return (
    <Section title="Integrali" forceFirstPage>
      <Definition term="Integrale definito">
        L&apos;integrale definito <Math>{"\\int_a^b f(x)\\,dx"}</Math>{" "}
        rappresenta l&apos;area con segno della regione compresa tra il
        grafico di <Math>{"f"}</Math>, l&apos;asse <Math>{"x"}</Math> e le
        rette <Math>{"x = a"}</Math> e <Math>{"x = b"}</Math>.
      </Definition>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Sostituzione diretta">
            <MathBlock>
              {"\\int f(ax+b)\\,dx = \\frac{1}{a}F(ax+b) + C"}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Sostituzione diretta">
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
                    Oppure moltiplicità maggiore di 1: <br />
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
  );
}
