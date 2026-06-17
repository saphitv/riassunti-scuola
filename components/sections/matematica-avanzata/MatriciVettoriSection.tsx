import {
  Box,
  Column,
  Math,
  MathBlock,
  Row,
  Section,
} from "@/components/index";

export function MatriciVettoriSection() {
  return (
    <Section
      title="Basi operative: matrici, rango, determinante, inversa, traccia"
      forceFirstPage
    >
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Prodotti">
            <MathBlock gap="sm" size="small">
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
ax+by \\\\
cx+dy
\\end{pmatrix}`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
\\begin{pmatrix}
e & f \\\\
g & h
\\end{pmatrix}
=
\\begin{pmatrix}
ae+bg & af+bh \\\\
ce+dg & cf+dh
\\end{pmatrix}`}
            </MathBlock>
            <ul>
              <li><Math>{"m\\times n"}</Math> per <Math>{"n\\times p"}</Math> da risultato <Math>{"m\\times p"}</Math>.</li>
              <li>Il prodotto in generale non commuta: <Math>{"AB\\neq BA"}</Math>.</li>
            </ul>
          </Box>

          <Box color="yellow" border="left" title="Determinante">
            <MathBlock gap="sm">
              {`\\det\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}=ad-bc`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`\\det\\begin{pmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{pmatrix}
=a(ei-fh)-b(di-fg)+c(dh-eg)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\det(A)\\neq0
\\Longleftrightarrow A^{-1}\\ \\text{esiste}
\\Longleftrightarrow \\operatorname{rank}(A)=n`}
            </MathBlock>
            <ul>
              <li><Math>{"\\det(I_n)=1"}</Math>, <Math>{"\\det(AB)=\\det(A)\\det(B)"}</Math>, <Math>{"\\det(A^T)=\\det(A)"}</Math>.</li>
              <li>Triangolare: determinante = prodotto degli elementi diagonali.</li>
              <li>Scambio di due righe: cambia segno.</li>
              <li><Math>{"R_i\\leftarrow R_i+kR_j"}</Math>: determinante invariato.</li>
              <li>Riga nulla o righe dipendenti: <Math>{"\\det(A)=0"}</Math>.</li>
            </ul>
          </Box>
          <Box color="gray" border="left" title="Traccia">
            <MathBlock gap="sm">
              {`\\operatorname{tr}(A^T)=\\operatorname{tr}(A),\\quad
\\operatorname{tr}(AB)=\\operatorname{tr}(BA),\\quad
\\operatorname{tr}(ABC)=\\operatorname{tr}(BCA)=\\operatorname{tr}(CAB)`}
            </MathBlock>
            <ol>
              <li>Somma degli elementi diagonali.</li>
              <li>
                Non vale in generale: <Math>{"\\operatorname{tr}(AB)=\\operatorname{tr}(A)\\operatorname{tr}(B)"}</Math>.
              </li>
            </ol>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Rango con Gauss">
            <MathBlock gap="sm">
              {`\\operatorname{rank}(A)
=\\#\\{\\text{righe/colonne linearmente indipendenti}\\}
=\\#\\{\\text{pivot dopo Gauss}\\}`}
            </MathBlock>
            <ol>
              <li>Porta la matrice in forma a scala con operazioni di riga.</li>
              <li>Conta i pivot, cioe le righe non nulle.</li>
              <li>Se <Math>{"A\\in\\mathbb{R}^{m\\times n}"}</Math>, allora <Math>{"0\\le\\operatorname{rank}(A)\\le\\min(m,n)"}</Math>.</li>
            </ol>
            <MathBlock gap="sm">
              {`A\\in\\mathbb{R}^{n\\times n},\\quad
\\operatorname{rank}(A)=n
\\Longleftrightarrow A\\ \\text{invertibile}`}
            </MathBlock>
          </Box>
          <Box color="purple" border="left" title="Inversa">
            <MathBlock gap="sm" size="small">
              {`A=\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
\\quad
A^{-1}=\\frac{1}{ad-bc}
\\begin{pmatrix}
d & -b \\\\
-c & a
\\end{pmatrix}`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`A=\\begin{pmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{pmatrix}
\\quad
A^{-1}=\\frac{1}{\\det(A)}
\\begin{pmatrix}
ei-fh & ch-bi & bf-ce \\\\
fg-di & ai-cg & cd-af \\\\
dh-eg & bg-ah & ae-bd
\\end{pmatrix}`}
            </MathBlock>
            <ol>
              <li>Valida solo se il denominatore e non nullo.</li>
              <li>Gauss-Jordan: <Math>{"[A\\mid I_n]\\to[I_n\\mid A^{-1}]"}</Math>.</li>
            </ol>
          </Box>
          <Box color="blue" border="left" title="Matrici simili">
            <MathBlock gap="sm">
              {`B=P^{-1}AP
\\qquad
A=PBP^{-1}`}
            </MathBlock>
            <ul>
              <li>Rappresentano la stessa applicazione lineare in basi diverse.</li>
              <li>Hanno stesso polinomio caratteristico e stessi autovalori, con la stessa molteplicita algebrica.</li>
              <li>Sono invarianti: <Math>{"\\det(A)=\\det(B)"}</Math>, <Math>{"\\operatorname{tr}(A)=\\operatorname{tr}(B)"}</Math>, <Math>{"\\operatorname{rank}(A)=\\operatorname{rank}(B)"}</Math>.</li>
              <li><Math>{"A"}</Math> e invertibile/diagonalizzabile se e solo se lo e <Math>{"B"}</Math>.</li>
            </ul>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
