import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
} from "@/components/index";

export function EserciziSimulazioniSection() {
  return (
    <Section title="Parte III - Esercizi risolti delle simulazioni" allowPageBreak>
      <h3 className="subsection-title">1. Probabilita totale e Bayes</h3>
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Sim. 1 - Studenti e occhiali">
            <MathBlock gap="sm">
              {`P(O)=0.30\\cdot0.18+0.25\\cdot0.22+0.20\\cdot0.15+0.25\\cdot0.10=0.164`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(Sc\\mid O)=\\frac{0.22\\cdot0.25}{0.164}\\approx0.3354`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(Ec\\mid \\overline O)=\\frac{0.90\\cdot0.25}{0.836}\\approx0.2691`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="blue" border="left" title="Sim. 2 - Dipendenti e remoto">
            <MathBlock gap="sm">
              {`P(R)=0.40\\cdot0.25+0.30\\cdot0.40+0.20\\cdot0.50+0.10\\cdot0.35=0.355`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(Ric\\mid R)=\\frac{0.50\\cdot0.20}{0.355}\\approx0.2817`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(Amm\\mid \\overline R)=\\frac{0.60\\cdot0.30}{0.645}\\approx0.2791`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <h3 className="subsection-title">2. Variabili aleatorie discrete</h3>
      <Row>
        <Column width="half">
          <Box color="green" border="left" title="Sim. 1 - Ferrari vendute">
            <p>
              <Math>{"x_i=0,1,2,3"}</Math>, probabilita{" "}
              <Math>{"0.2,0.4,0.3,0.1"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`P(X<2)=0.2+0.4=0.6`}
            </MathBlock>
            <MathBlock gap="sm">
              {`E[X]=1.3,\\qquad E[X^2]=2.5,\\qquad \\operatorname{Var}(X)=2.5-1.3^2=0.81`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(\\text{3 giorni con }X\\ge2)=(0.3+0.1)^3=0.064`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(\\text{tot}<2)=0.2^3+\\binom31(0.4)(0.2)^2=0.056`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Sim. 2 - i-phone venduti">
            <p>
              <Math>{"x_i=1,2,3,4"}</Math>, probabilita{" "}
              <Math>{"0.1,0.3,0.4,0.2"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`P(2\\le X\\le4)=0.3+0.4+0.2=0.9`}
            </MathBlock>
            <MathBlock gap="sm">
              {`E[X]=2.7,\\qquad E[X^2]=8.1,\\qquad \\operatorname{Var}(X)=8.1-2.7^2=0.81`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(\\text{3 giorni con }X\\ge3)=(0.4+0.2)^3=0.216`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(\\text{tot}<4)=P(1+1+1)=0.1^3=0.001`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <h3 className="subsection-title">3. Variabili aleatorie continue</h3>
      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Sim. 1 - Densita lineare">
            <p>
              <Math>{"f(x)=a+bx"}</Math> su <Math>{"[0,2]"}</Math>,{" "}
              <Math>{"E[X]=1.2"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`2a+2b=1,\\quad 2a+\\frac83b=1.2\\quad\\Rightarrow\\quad a=0.2,\\ b=0.3`}
            </MathBlock>
            <MathBlock gap="sm">
              {`E[X^2]=\\int_0^2 x^2(0.2+0.3x)\\,dx\\approx1.7333`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\operatorname{Var}(X)=1.7333-1.2^2\\approx0.2933`}
            </MathBlock>
            <MathBlock gap="sm">
              {`F(x)=0.2x+0.15x^2,\\qquad P(X\\le1\\mid X\\le1.8)=\\frac{0.35}{0.846}\\approx0.4137`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Sim. 2 - Pareto">
            <p>
              <Math>{"f(x)=\\alpha\\beta^\\alpha/x^{\\alpha+1}"}</Math> per{" "}
              <Math>{"x\\ge\\beta"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`\\int_\\beta^\\infty \\alpha\\beta^\\alpha x^{-(\\alpha+1)}\\,dx=1`}
            </MathBlock>
            <p>
              Per <Math>{"\\alpha=1,\\beta=1"}</Math>:{" "}
              <Math>{"f(x)=1/x^2"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`E[X]=\\int_1^\\infty \\frac1x\\,dx=+\\infty`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(X>k)=\\int_k^\\infty \\frac1{x^2}\\,dx=\\frac1k<0.05\\quad\\Rightarrow\\quad k>20`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <h3 className="subsection-title">4. Distribuzione normale</h3>
      <Row>
        <Column width="half">
          <Box color="purple" border="left" title="Sim. 1 - Temperature">
            <p>
              <Math>{"X_{RM}\\sim N(5.5,1.21)"}</Math>,{" "}
              <Math>{"X_{FI}\\sim N(4.2,0.81)"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`P(X_{RM}<4)=\\Phi(-1.36)=1-0.9131=0.0869`}
            </MathBlock>
            <MathBlock gap="sm">
              {`D=X_{RM}-X_{FI}\\sim N(1.3,2.02),\\quad P(D\\le-1)\\approx0.0526`}
            </MathBlock>
            <MathBlock gap="sm">
              {`Y\\sim B(5,0.0869),\\quad P(Y\\ge2)=1-P(Y=0)-P(Y=1)\\approx0.0632`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(\\overline X_k<4)<0.05\\quad\\Rightarrow\\quad k=2`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Sim. 2 - Pioggia">
            <p>
              <Math>{"X_{MI}\\sim N(8,4)"}</Math>,{" "}
              <Math>{"X_{TO}\\sim N(6.5,2.25)"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`P(X_{MI}>10)=1-\\Phi(1)=0.1587`}
            </MathBlock>
            <MathBlock gap="sm">
              {`M=\\frac{X_{MI}+X_{TO}}2\\sim N(7.25,1.5625),\\quad P(M<6)=\\Phi(-1)=0.1587`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(X_{MI}>k)<0.05\\quad\\Rightarrow\\quad k>8+2\\cdot1.64=11.28`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(\\overline X_k<4)<0.05\\quad\\Rightarrow\\quad k=1`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <h3 className="subsection-title">5. Distribuzione esponenziale</h3>
      <Row>
        <Column width="half">
          <Box color="red" border="left" title="Sim. 1 - Manutenzione">
            <p>
              <Math>{"X\\sim E(0.5)"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`P(X>4)=e^{-0.5\\cdot4}=e^{-2}\\approx0.1353`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(X>6\\mid X>4)=P(X>2)=e^{-1}\\approx0.3679`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(X<3)<0.5\\iff 1-e^{-3\\lambda}<0.5\\iff \\lambda<\\frac{\\ln2}{3}\\approx0.2310`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Sim. 2 - Chiamate">
            <p>
              <Math>{"X\\sim E(0.2)"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`P(X>10)=e^{-0.2\\cdot10}=e^{-2}\\approx0.1353`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(X>15\\mid X>10)=P(X>5)=e^{-1}\\approx0.3679`}
            </MathBlock>
            <MathBlock gap="sm">
              {`Y\\sim B(8,e^{-2}),\\quad P(Y\\ge6)=\\sum_{r=6}^{8}\\binom8r p^r(1-p)^{8-r}\\approx1.34\\cdot10^{-4}`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <h3 className="subsection-title">6. Intervalli di confidenza</h3>
      <Row>
        <Column width="half">
          <Box color="gray" border="left" title="Sim. 1 - Varianza nota">
            <p>
              Intervallo 95%: <Math>{"[49.02;50.98]"}</Math>,{" "}
              <Math>{"\\sigma^2=16"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`\\widehat\\mu=\\frac{49.02+50.98}{2}=50`}
            </MathBlock>
            <MathBlock gap="sm">
              {`1.96\\frac4{\\sqrt n}=0.98\\quad\\Rightarrow\\quad n=64`}
            </MathBlock>
            <MathBlock gap="sm">
              {`1.96\\frac4{\\sqrt n}<0.5\\quad\\Rightarrow\\quad n\\ge246`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="gray" border="left" title="Sim. 2 - Momenti">
            <p>
              <Math>{"n=100"}</Math>, <Math>{"m_1=10"}</Math>,{" "}
              <Math>{"m_2=108"}</Math>, <Math>{"m_4=13200"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`\\widehat\\sigma^2=m_2-m_1^2=8,\\quad IC_\\mu=10\\pm1.96\\frac{\\sqrt8}{10}=[9.4456;10.5544]`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\widehat\\sigma_Z^2=m_4-m_2^2=1536,\\quad IC_{E[X^2]}=108\\pm1.96\\frac{\\sqrt{1536}}{10}=[100.318;115.682]`}
            </MathBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
