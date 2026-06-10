import {
  Box,
  Column,
  MathBlock,
  Row,
  Section,
} from "@/components/index";

export function MatriciVettoriSection() {
  return (
    <Section title="Prodotto Matrice-Vettore" forceFirstPage>
      <Box color="blue" border="left" title="Promemoria">
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
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
