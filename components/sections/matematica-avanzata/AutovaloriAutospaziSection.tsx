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
      <Row gap="sm">
        <Column width="half">
          <Box color="blue" border="left" title="Significato">
            <Definition term="Autovalore">
              Uno scalare <Math>{"\\lambda"}</Math> e un autovalore di{" "}
              <Math>{"A"}</Math> se esiste un vettore non nullo{" "}
              <Math>{"v \\neq 0"}</Math> tale che{" "}
              <Math>{"Av=\\lambda v"}</Math>.
            </Definition>
            <Definition term="Autovettore">
              Il vettore non nullo <Math>{"v"}</Math> e un autovettore
              associato a <Math>{"\\lambda"}</Math> quando la moltiplicazione
              per <Math>{"A"}</Math> cambia solo la sua lunghezza o il suo
              verso, non la sua direzione.
            </Definition>
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

      <Box color="blue" border="left" title="Equazione caratteristica">
        <Row gap="sm">
          <Column width="half">
            <p>
              Partendo da <Math>{"Av=\\lambda v"}</Math>, si porta tutto a
              sinistra:
            </p>
            <MathBlock gap="sm">
              {`Av=\\lambda v
\\Longleftrightarrow
(A-\\lambda I)v=0`}
            </MathBlock>
          </Column>
          <Column width="half">
            <p>
              Per avere soluzioni non nulle, la matrice{" "}
              <Math>{"A-\\lambda I"}</Math> deve essere singolare:
            </p>
            <MathBlock gap="sm">
              {`p_A(\\lambda)=\\det(A-\\lambda I)=0`}
            </MathBlock>
          </Column>
        </Row>
      </Box>

      <Row gap="sm">
        <Column width="half">
          <Box color="green" border="left" title="Autospazio">
            <Definition term="Autospazio">
              L&apos;autospazio associato a <Math>{"\\lambda"}</Math> e il
              nucleo di <Math>{"A-\\lambda I"}</Math>:
            </Definition>
            <MathBlock gap="sm">
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
          <Box color="purple" border="left" title="Collegamenti rapidi">
            <p>
              Se <Math>{"A"}</Math> e triangolare, gli autovalori sono gli
              elementi sulla diagonale.
            </p>
            <MathBlock gap="sm" size="small">
              {`\\begin{pmatrix}
1 & 2 & 0 \\\\
0 & 4 & -1 \\\\
0 & 0 & 4
\\end{pmatrix}
\\Rightarrow
\\lambda = 1,4,4`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\det(A)=\\lambda_1\\cdots\\lambda_n
\\qquad
\\operatorname{tr}(A)=\\lambda_1+\\cdots+\\lambda_n`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <Box color="purple" border="left" title="Cayley-Hamilton e polinomio 3 x 3">
        <Row gap="sm">
          <Column width="half">
            <p>
              Il teorema di Cayley-Hamilton dice che ogni matrice quadrata
              annulla il proprio polinomio caratteristico.
            </p>
            <MathBlock gap="sm">
              {`q(\\lambda)=\\det(\\lambda I-A)
\\quad\\Longrightarrow\\quad
q(A)=0`}
            </MathBlock>
            <p>Per una matrice 3 x 3:</p>
            <MathBlock gap="sm" size="small">
              {`q(A)=A^3-\\operatorname{tr}(A)A^2+S_2A-\\det(A)I=0`}
            </MathBlock>
          </Column>
          <Column width="half">
            <p>
              Trucco rapido per scrivere il polinomio caratteristico monico:
            </p>
            <MathBlock gap="sm" size="small">
              {`q(\\lambda)
=\\lambda^3-\\operatorname{tr}(A)\\lambda^2
+S_2\\lambda-\\det(A)`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`S_2=
\\text{somma dei minori principali }2\\times2
=\\frac{(\\operatorname{tr}A)^2-\\operatorname{tr}(A^2)}{2}`}
            </MathBlock>
          </Column>
        </Row>
        <Row gap="sm">
          <Column width="half">
            <p>Se</p>
            <MathBlock gap="sm" size="small">
              {`A=\\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{pmatrix}`}
            </MathBlock>
            <p>
              allora i minori principali <Math>{"2\\times2"}</Math> sono quelli
              ottenuti usando gli stessi indici di riga e colonna:
            </p>
          </Column>
          <Column width="half">
            <MathBlock gap="sm" size="small">
              {`S_2=
\\begin{vmatrix}a_{11}&a_{12}\\\\a_{21}&a_{22}\\end{vmatrix}
+\\begin{vmatrix}a_{11}&a_{13}\\\\a_{31}&a_{33}\\end{vmatrix}
+\\begin{vmatrix}a_{22}&a_{23}\\\\a_{32}&a_{33}\\end{vmatrix}`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`S_2=
(a_{11}a_{22}-a_{12}a_{21})
+(a_{11}a_{33}-a_{13}a_{31})
+(a_{22}a_{33}-a_{23}a_{32})`}
            </MathBlock>
          </Column>
        </Row>
        <Note>
          Qui <Math>{"q(\\lambda)=\\det(\\lambda I-A)"}</Math>. Se usi{" "}
          <Math>{"p_A(\\lambda)=\\det(A-\\lambda I)"}</Math>, per una matrice 3
          x 3 vale <Math>{"p_A(\\lambda)=-q(\\lambda)"}</Math>, ma gli zeri sono
          gli stessi.
        </Note>
      </Box>

      <Example title="Esempio completo 2 x 2" color="blue">
        <Row>
          <Column width="half">
            <MathBlock gap="sm">
              {`A =
\\begin{pmatrix}
2 & 1 \\\\
0 & 3
\\end{pmatrix}`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`\\det(A-\\lambda I)
=
\\det\\begin{pmatrix}
2-\\lambda & 1 \\\\
0 & 3-\\lambda
\\end{pmatrix}
=(2-\\lambda)(3-\\lambda)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\lambda_1=2
\\qquad
\\lambda_2=3`}
            </MathBlock>
          </Column>
          <Column width="half">
            <MathBlock gap="sm" size="small">
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
            <MathBlock gap="sm">
              {`E_2 = \\operatorname{span}\\left\\{
\\begin{pmatrix}
1 \\\\
0
\\end{pmatrix}
\\right\\}`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
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
        <Row gap="sm">
          <Column width="half">
            <p>
              Se <Math>{"\\lambda_1,\\dots,\\lambda_n"}</Math> sono contati con
              molteplicita algebrica, determinante e traccia coincidono con
              prodotto e somma degli autovalori.
            </p>
            <MathBlock gap="sm">
              {`\\det(A)=\\lambda_1\\cdots\\lambda_n
\\qquad
\\operatorname{tr}(A)=\\lambda_1+\\cdots+\\lambda_n`}
            </MathBlock>
          </Column>
          <Column width="half">
            <p>
              Se <Math>{"A"}</Math> e invertibile, gli autovettori restano gli
              stessi passando ad <Math>{"A^{-1}"}</Math>, ma gli autovalori si
              invertono.
            </p>
            <MathBlock gap="sm">
              {`Av=\\lambda v,\\ A\\ \\text{invertibile},\\ \\lambda\\neq0
\\qquad\\Longrightarrow\\qquad
A^{-1}v=\\frac{1}{\\lambda}v`}
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
