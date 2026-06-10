import {
  Box,
  Column,
  Definition,
  Example,
  Math,
  MathBlock,
  Note,
  Row,
  Section,
} from "@/components/index";

export function AutovaloriAutospaziSection() {
  return (
    <Section title="Autovalori, Autovettori e Autospazi" allowPageBreak>
      <Row>
        <Column width="half">
          <Definition term="Autovalore">
            Uno scalare <Math>{"\\lambda"}</Math> e un autovalore di{" "}
            <Math>{"A"}</Math> se esiste un vettore non nullo{" "}
            <Math>{"v \\neq 0"}</Math> tale che <Math>{"Av=\\lambda v"}</Math>.
          </Definition>
        </Column>
        <Column width="half">
          <Definition term="Autovettore">
            Il vettore non nullo <Math>{"v"}</Math> e un autovettore associato a{" "}
            <Math>{"\\lambda"}</Math> quando la moltiplicazione per{" "}
            <Math>{"A"}</Math> cambia solo la sua lunghezza o il suo verso, non
            la sua direzione.
          </Definition>
        </Column>
      </Row>

      <Box color="blue" border="left" title="Equazione caratteristica">
        <p>
          Partendo da <Math>{"Av=\\lambda v"}</Math>, si porta tutto a sinistra:
        </p>
        <MathBlock>
          {`Av=\\lambda v
\\Longleftrightarrow
(A-\\lambda I)v=0`}
        </MathBlock>
        <p>
          Per avere soluzioni non nulle, la matrice{" "}
          <Math>{"A-\\lambda I"}</Math> deve essere singolare:
        </p>
        <MathBlock>
          {`p_A(\\lambda)=\\det(A-\\lambda I)=0`}
        </MathBlock>
      </Box>

      <Row>
        <Column width="half">
          <Box color="green" border="left" title="Autospazio">
            <Definition term="Autospazio">
              L&apos;autospazio associato a <Math>{"\\lambda"}</Math> e il
              nucleo di <Math>{"A-\\lambda I"}</Math>:
            </Definition>
            <MathBlock>
              {`E_{\\lambda}
= \\ker(A-\\lambda I)
= \\{v \\in \\mathbb{R}^n : (A-\\lambda I)v=0\\}`}
            </MathBlock>
            <Note>
              Lo zero appartiene all&apos;autospazio, ma non e un autovettore.
              Gli autovettori sono gli elementi non nulli di{" "}
              <Math>{"E_{\\lambda}"}</Math>.
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Procedura rapida">
            <ol>
              <li>
                Calcola <Math>{"\\det(A-\\lambda I)"}</Math>.
              </li>
              <li>
                Risolvi <Math>{"\\det(A-\\lambda I)=0"}</Math> per trovare gli
                autovalori.
              </li>
              <li>
                Per ogni <Math>{"\\lambda"}</Math>, risolvi{" "}
                <Math>{"(A-\\lambda I)v=0"}</Math>.
              </li>
              <li>
                Scrivi una base di <Math>{"E_{\\lambda}"}</Math> usando le
                variabili libere.
              </li>
            </ol>
          </Box>
        </Column>
      </Row>

      <Example title="Esempio completo 2 x 2" color="blue">
        <Row>
          <Column width="half">
            <MathBlock>
              {`A =
\\begin{pmatrix}
2 & 1 \\\\
0 & 3
\\end{pmatrix}`}
            </MathBlock>
            <MathBlock>
              {`\\det(A-\\lambda I)
=
\\det\\begin{pmatrix}
2-\\lambda & 1 \\\\
0 & 3-\\lambda
\\end{pmatrix}
=(2-\\lambda)(3-\\lambda)`}
            </MathBlock>
            <MathBlock>
              {`\\lambda_1=2
\\qquad
\\lambda_2=3`}
            </MathBlock>
          </Column>
          <Column width="half">
            <MathBlock>
              {`\\lambda=2:
\\quad
(A-2I)v=0
\\Rightarrow
\\begin{pmatrix}
0 & 1 \\\\
0 & 1
\\end{pmatrix}
\\begin{pmatrix}
x \\\\
y
\\end{pmatrix}
=0
\\Rightarrow y=0`}
            </MathBlock>
            <MathBlock>
              {`E_2 = \\operatorname{span}\\left\\{
\\begin{pmatrix}
1 \\\\
0
\\end{pmatrix}
\\right\\}`}
            </MathBlock>
            <MathBlock>
              {`\\lambda=3:
\\quad
(A-3I)v=0
\\Rightarrow -x+y=0
\\Rightarrow
E_3 = \\operatorname{span}\\left\\{
\\begin{pmatrix}
1 \\\\
1
\\end{pmatrix}
\\right\\}`}
            </MathBlock>
          </Column>
        </Row>
      </Example>

      <Box color="purple" border="left" title="Collegamenti da ricordare">
        <Row>
          <Column width="half">
            <p>
              Se <Math>{"A"}</Math> e triangolare, gli autovalori sono gli
              elementi sulla diagonale.
            </p>
            <MathBlock>
              {`\\begin{pmatrix}
1 & 2 & 0 \\\\
0 & 4 & -1 \\\\
0 & 0 & 4
\\end{pmatrix}
\\Rightarrow
\\lambda = 1,4,4`}
            </MathBlock>
          </Column>
          <Column width="half">
            <p>
              Se <Math>{"\\lambda_1,\\dots,\\lambda_n"}</Math> sono contati con
              molteplicita algebrica:
            </p>
            <MathBlock>
              {`\\det(A)=\\lambda_1\\cdots\\lambda_n
\\qquad
\\operatorname{tr}(A)=\\lambda_1+\\cdots+\\lambda_n`}
            </MathBlock>
            <Note>
              <Math>{"\\det(A)=0"}</Math> equivale a dire che{" "}
              <Math>{"0"}</Math> e autovalore: esiste un{" "}
              <Math>{"v\\neq0"}</Math> con <Math>{"Av=0"}</Math>.
            </Note>
          </Column>
        </Row>
      </Box>
    </Section>
  );
}
