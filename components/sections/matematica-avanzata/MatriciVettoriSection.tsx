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

export function MatriciVettoriSection() {
  return (
    <Section title="Prodotto Matrice-Vettore" forceFirstPage>
      <Row>
        <Column width="half">
          <Definition term="Matrice">
            Una matrice <Math>{"A \\in \\mathbb{R}^{m \\times n}"}</Math> ha{" "}
            <Math>{"m"}</Math> righe e <Math>{"n"}</Math> colonne. L&apos;elemento{" "}
            <Math>{"a_{ij}"}</Math> sta alla riga <Math>{"i"}</Math> e colonna{" "}
            <Math>{"j"}</Math>.
          </Definition>
        </Column>
        <Column width="half">
          <Definition term="Vettore colonna">
            Un vettore <Math>{"x \\in \\mathbb{R}^n"}</Math> e una matrice{" "}
            <Math>{"n \\times 1"}</Math>. Il prodotto <Math>{"Ax"}</Math> esiste
            solo se il numero di colonne di <Math>{"A"}</Math> coincide con le
            componenti di <Math>{"x"}</Math>.
          </Definition>
        </Column>
      </Row>

      <Box color="blue" border="left" title="Regola righe per colonne">
        <MathBlock>
          {`A \\in \\mathbb{R}^{m \\times n},\\quad x \\in \\mathbb{R}^n
\\quad \\Longrightarrow \\quad
Ax \\in \\mathbb{R}^m`}
        </MathBlock>
        <MathBlock>
          {`(Ax)_i = a_{i1}x_1 + a_{i2}x_2 + \\cdots + a_{in}x_n
= \\sum_{j=1}^{n} a_{ij}x_j`}
        </MathBlock>
      </Box>

      <Row>
        <Column width="half">
          <Box color="green" border="left" title="Caso 2 x 2">
            <MathBlock>
              {`\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
\\begin{pmatrix}
x \\\\
y
\\end{pmatrix}
=
\\begin{pmatrix}
ax + by \\\\
cx + dy
\\end{pmatrix}`}
            </MathBlock>
            <Example title="Esempio" color="green">
              <MathBlock>
                {`\\begin{pmatrix}
1 & 2 \\\\
3 & 4
\\end{pmatrix}
\\begin{pmatrix}
5 \\\\
6
\\end{pmatrix}
=
\\begin{pmatrix}
1\\cdot5 + 2\\cdot6 \\\\
3\\cdot5 + 4\\cdot6
\\end{pmatrix}
=
\\begin{pmatrix}
17 \\\\
39
\\end{pmatrix}`}
              </MathBlock>
            </Example>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Caso 3 x 3">
            <MathBlock>
              {`\\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{pmatrix}
\\begin{pmatrix}
x \\\\
y \\\\
z
\\end{pmatrix}
=
\\begin{pmatrix}
a_{11}x + a_{12}y + a_{13}z \\\\
a_{21}x + a_{22}y + a_{23}z \\\\
a_{31}x + a_{32}y + a_{33}z
\\end{pmatrix}`}
            </MathBlock>
            <Example title="Esempio" color="blue">
              <MathBlock>
                {`\\begin{pmatrix}
1 & 0 & 2 \\\\
-1 & 3 & 1 \\\\
2 & 1 & 0
\\end{pmatrix}
\\begin{pmatrix}
2 \\\\
-1 \\\\
3
\\end{pmatrix}
=
\\begin{pmatrix}
8 \\\\
-2 \\\\
3
\\end{pmatrix}`}
              </MathBlock>
            </Example>
          </Box>
        </Column>
      </Row>

      <Box color="yellow" border="left" title="Vettore riga per matrice">
        <p>
          Se il vettore e scritto come riga, il prodotto si legge colonna per
          colonna:
        </p>
        <MathBlock>
          {`\\begin{pmatrix}
x & y
\\end{pmatrix}
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
=
\\begin{pmatrix}
xa + yc & xb + yd
\\end{pmatrix}`}
        </MathBlock>
        <Note>
          In generale <Math>{"Ax"}</Math> e <Math>{"xA"}</Math> non sono la
          stessa cosa: spesso uno dei due prodotti non e nemmeno definito.
        </Note>
      </Box>
    </Section>
  );
}
