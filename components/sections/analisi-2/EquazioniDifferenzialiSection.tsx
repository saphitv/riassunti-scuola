import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Theorem,
  Example,
} from "@/components/index";

export function EquazioniDifferenzialiSection() {
  return (
    <Section title="Equazioni differenziali">
      <Row>
        <Column width="half">
          <Box color="red" border="left" title="EDO I ordine lineare">
            <Math>{"y' + p(x)y = q(x)"}</Math>
            <MathBlock>
              {"y = e^{-\\mu(x)} \\int q(x) e^{\\mu(x)}\\,dx \\implies \\mu(x) = \\int p(x)\\,dx"}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="EDO I ordine Variabili separabili">
            <Math>{"y' = f(x) \\cdot g(y)"}</Math>
            <MathBlock>
              {"\\int \\frac{dy}{g(y)} = \\int f(x)\\,dx"}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <Theorem title="Problema di Cauchy">
        Data un&apos;EDO con condizione iniziale:
        <MathBlock>
          {"\\begin{cases} y' = f(x, y) \\\\ y(x_0) = y_0 \\end{cases}"}
        </MathBlock>
        Si cerca la soluzione particolare che passa per il punto{" "}
        <Math>{"(x_0, y_0)"}</Math>.
        <Example color="blue" radius="md" border="all">
          <strong>Esempio:</strong> Risolvere{" "}
          <Math>{"\\begin{cases} y' = xy \\\\ y(0) = 2 \\end{cases}"}</Math>
          <ol className="example-steps">
            <li>
              Separo le variabili:{" "}
              <Math>{"\\frac{dy}{y} = x\\,dx"}</Math>
            </li>
            <li>
              Integro:{" "}
              <Math>{"\\ln|y| = \\frac{x^2}{2} + C \\implies y = Ce^{x^2/2}"}</Math>
            </li>
            <li>
              Applico la condizione iniziale <Math>{"y(0) = 2"}</Math>:{" "}
              <Math>{"2 = Ce^0 \\implies C = 2"}</Math>
            </li>
            <li>
              <strong>Soluzione:</strong>{" "}
              <Math>{"y = 2e^{x^2/2}"}</Math>
            </li>
          </ol>
        </Example>
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
        <MathBlock>{"y = y_o(x) + y_p(x)"}</MathBlock>
      </Box>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Modelli di Crescita">
            <Math>{"\\text{Esponenziale: } \\frac{dN}{dt} = kN \\implies N = N_0 e^{kt}"}</Math><br />
            <Math>{"\\text{Logistica: } \\frac{dN}{dt} = \\lambda N(1 - \\frac{N}{K})"}</Math><br />
            <Math>{"\\text{Catastrofico: } \\begin{cases} N'(t) = \\lambda N(t) & t \\neq t_c \\\\ N(t_c^+) = \\alpha N(t_c^-) \\end{cases}"}</Math><br />
            <Math>{"\\text{Stagionale: } \\frac{dN}{dt} = \\lambda (t)N"}</Math>
          </Box>
        </Column>
        <Column width="half">
          <Box color="gray" border="left" title="Raffreddamento di Newton">
            <Math>{"\\text{Classico: } \\frac{dT}{dt} = -\\lambda (T(t) - T_{amb}) \\implies T = T_A + C \\cdot e^{-\\lambda t}"}</Math><br />
            <Math>{"\\text{Fluido: } \\frac{dT}{dt} = -\\lambda (T(t) - T_{amb}) * v"}</Math><br />
            <Math>{"\\text{Radiativo: } \\frac{dT}{dt} = -\\sigma\\varepsilon(T(t)^4 - T_{amb}^4)"}</Math><br />
            <Math>{"\\text{Stagionale: } T(t) = e^{\\lambda t}\\omega(t), \\; \\omega(t) \\in \\int e^{-\\lambda t}T_A(t)\\,dt"}</Math>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="red" border="left" title="Leggi di Moto di Newton">
            <Math>{"F = ma \\implies m\\ddot{x}(t) = F(x, \\dot{x}, t)"}</Math><br />
            <Math>{"\\text{Caduta libera: } m\\ddot{x} = -mg \\implies x(t) = x_0 + v_0 t - \\frac{1}{2}gt^2"}</Math><br />
            <Math>{"\\text{Con attrito: } m\\ddot{x} = -mg - b\\dot{x}"}</Math>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Moto Armonico">
            <Math>{"\\text{Oscillatore: } x''(t) + \\omega^2 x(t) = 0, \\; \\omega \\in \\mathbb{R}"}</Math><br />
            <Math>{"\\text{Soluzione: } x(t) = A\\cos(\\omega t) + B\\sin(\\omega t)"}</Math><br />
            <Math>{"\\text{Smorzato: } mx''(t) + bx'(t) + kx = 0"}</Math>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
