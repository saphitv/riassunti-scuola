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
} from "@/components";

export default function Home() {
  return (
    <div className="page">
      <header className="header">
        <h1>Analisi 2</h1>
        <p>Appunti per l&apos;esame</p>
      </header>

      {/* INTEGRALI */}
      <Section title="Integrali">
        <Definition term="Integrale definito">
          L&apos;integrale definito <Math>{"\\int_a^b f(x)\\,dx"}</Math>{" "}
          rappresenta l&apos;area con segno della regione compresa tra il
          grafico di <Math>{"f"}</Math>, l&apos;asse <Math>{"x"}</Math> e le
          rette <Math>{"x = a"}</Math> e <Math>{"x = b"}</Math>.
        </Definition>

        <Theorem title="Teorema fondamentale del calcolo integrale">
          Se <Math>{"f"}</Math> è continua su <Math>{"[a, b]"}</Math>, allora:
          <MathBlock>{"\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)"}</MathBlock>
        </Theorem>

        {/* Example: Two boxes side by side */}
        <Row>
          <Column width="half">
            <Box color="yellow" border="left" title="-">
              <MathBlock>{"\\int f(ax+b)\\,dx = \\frac{1}{a}F(ax+b) + C"}</MathBlock>
            </Box>
          </Column>
          <Column width="half">
            <Box color="green" border="left" title="Integrazione di funzioni razionali">
              <MathBlock>{"\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln |f(x)| + C"}</MathBlock>
            </Box>
          </Column>
          <Column width="half">
            <Box color="blue" border="left" title="Integrazione per parti">
              <MathBlock>{"\\int u'(x)v(x)\\,dx = u(x)v(x) - \\int u(x)v'(x)\\,dx"}</MathBlock>
            </Box>
          </Column>
          <Column width="half">
            <Box color="red" border="left" title="-">
              <MathBlock>{"\\int f(g(x))g'(x)\\,dx = \\int f(u)\\,du"}</MathBlock>
            </Box>
          </Column>
        </Row>

        <Note>
          Ricorda: la primitiva è definita a meno di una costante{" "}
          <Math>{"C"}</Math>.
        </Note>
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
