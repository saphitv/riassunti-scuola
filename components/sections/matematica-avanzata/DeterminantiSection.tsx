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
  Theorem,
} from "@/components/index";

export function DeterminantiSection() {
  return (
    <Section title="Determinanti">
      <Definition term="Determinante">
        Il determinante associa a una matrice quadrata{" "}
        <Math>{"A \\in \\mathbb{R}^{n \\times n}"}</Math> uno scalare{" "}
        <Math>{"\\det(A)"}</Math>. Misura il fattore di scala orientato di aree
        e volumi prodotti dalla trasformazione lineare <Math>{"x \\mapsto Ax"}</Math>.
      </Definition>

      <Row>
        <Column width="half">
          <Box color="green" border="left" title="Determinante 2 x 2">
            <MathBlock>
              {`\\det\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
= ad - bc`}
            </MathBlock>
            <Example title="Esempio" color="green">
              <MathBlock>
                {`\\det\\begin{pmatrix}
2 & 1 \\\\
5 & 3
\\end{pmatrix}
= 2\\cdot3 - 1\\cdot5 = 1`}
              </MathBlock>
            </Example>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Determinante 3 x 3">
            <MathBlock>
              {`\\det\\begin{pmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\\end{pmatrix}
= aei + bfg + cdh - ceg - bdi - afh`}
            </MathBlock>
            <MathBlock>
              {`= a\\det\\begin{pmatrix}
e & f \\\\
h & i
\\end{pmatrix}
- b\\det\\begin{pmatrix}
d & f \\\\
g & i
\\end{pmatrix}
+ c\\det\\begin{pmatrix}
d & e \\\\
g & h
\\end{pmatrix}`}
            </MathBlock>
            <Example title="Esempio" color="blue">
              <MathBlock>
                {`\\det\\begin{pmatrix}
1 & 2 & 0 \\\\
3 & -1 & 4 \\\\
2 & 0 & 1
\\end{pmatrix}
= -1 + 16 + 0 - 0 - 6 - 0 = 9`}
              </MathBlock>
            </Example>
          </Box>
        </Column>
      </Row>

      <Box color="blue" border="left" title="Sviluppo di Laplace">
        <p>
          Per matrici piu grandi si sceglie una riga o una colonna e si
          sviluppa con i complementi algebrici. Conviene scegliere una riga o
          colonna con molti zeri.
        </p>
        <MathBlock>
          {`\\det(A) = \\sum_{j=1}^{n} (-1)^{i+j} a_{ij}\\det(A_{ij})`}
        </MathBlock>
        <p>
          <Math>{"A_{ij}"}</Math> e la matrice ottenuta eliminando la riga{" "}
          <Math>{"i"}</Math> e la colonna <Math>{"j"}</Math>.
        </p>
      </Box>

      <Theorem title="Criterio di invertibilita">
        <MathBlock>
          {`\\det(A) \\neq 0
\\Longleftrightarrow A^{-1}\\ \\text{esiste}
\\Longleftrightarrow Ax=0\\ \\text{ha solo la soluzione}\\ x=0`}
        </MathBlock>
      </Theorem>

      <Box color="green" border="left" title="Come invertire una matrice">
        <Row>
          <Column width="half">
            <p>
              <strong>Metodo generale (Gauss-Jordan):</strong>
            </p>
            <ol>
              <li>
                Scrivi la matrice aumentata{" "}
                <Math>{"[A\\mid I_n]"}</Math>.
              </li>
              <li>
                Usa operazioni elementari di riga per trasformare la parte
                sinistra in <Math>{"I_n"}</Math>.
              </li>
              <li>
                Applica le stesse operazioni anche alla parte destra.
              </li>
              <li>
                Quando ottieni <Math>{"[I_n\\mid B]"}</Math>, allora{" "}
                <Math>{"B=A^{-1}"}</Math>.
              </li>
            </ol>
            <Note>
              Se non riesci a ottenere un pivot non nullo, allora{" "}
              <Math>{"\\det(A)=0"}</Math> e la matrice non e invertibile.
            </Note>
          </Column>
          <Column width="half">
            <p>
              <strong>Formula per matrici 2 x 2:</strong>
            </p>
            <MathBlock>
              {`A=\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
\\qquad
\\det(A)=ad-bc`}
            </MathBlock>
            <MathBlock>
              {`A^{-1}=\\frac{1}{ad-bc}
\\begin{pmatrix}
d & -b \\\\
-c & a
\\end{pmatrix}
\\qquad (ad-bc\\neq0)`}
            </MathBlock>
          </Column>
        </Row>
      </Box>

      <Box color="yellow" border="left" title="Regole del determinante">
        <Row>
          <Column width="half">
            <ul>
              <li>
                <Math>{"\\det(I_n)=1"}</Math>
              </li>
              <li>
                <Math>{"\\det(AB)=\\det(A)\\det(B)"}</Math>
              </li>
              <li>
                <Math>{"\\det(A^T)=\\det(A)"}</Math>
              </li>
              <li>
                Se <Math>{"A"}</Math> e invertibile,{" "}
                <Math>{"\\det(A^{-1})=\\frac{1}{\\det(A)}"}</Math>.
              </li>
              <li>
                <Math>{"\\det(A^k)=\\det(A)^k"}</Math> per{" "}
                <Math>{"k \\in \\mathbb{N}"}</Math>.
              </li>
              <li>
                Per <Math>{"A \\in \\mathbb{R}^{n \\times n}"}</Math>,{" "}
                <Math>{"\\det(cA)=c^n\\det(A)"}</Math>.
              </li>
              <li>
                Se <Math>{"A"}</Math> e triangolare,{" "}
                <Math>{"\\det(A)"}</Math> e il prodotto degli elementi diagonali.
              </li>
            </ul>
          </Column>
          <Column width="half">
            <ul>
              <li>Scambiare due righe cambia il segno del determinante.</li>
              <li>
                Moltiplicare una riga per <Math>{"k"}</Math> moltiplica il
                determinante per <Math>{"k"}</Math>.
              </li>
              <li>
                Sostituire <Math>{"R_i"}</Math> con{" "}
                <Math>{"R_i+kR_j"}</Math>, con <Math>{"i \\neq j"}</Math>, non
                cambia il determinante.
              </li>
              <li>
                Due righe proporzionali implicano <Math>{"\\det(A)=0"}</Math>.
              </li>
              <li>
                Una riga nulla, una colonna nulla o righe/colonne linearmente
                dipendenti implicano <Math>{"\\det(A)=0"}</Math>.
              </li>
            </ul>
          </Column>
        </Row>
        <Note>
          <Math>{"\\det(A)=0"}</Math> significa che la trasformazione schiaccia
          lo spazio in una dimensione piu piccola: colonne dipendenti e matrice
          non invertibile.
        </Note>
      </Box>

      <Note>
        Se <Math>{"\\lambda_1,\\dots,\\lambda_n"}</Math> sono gli autovalori di{" "}
        <Math>{"A"}</Math> contati con molteplicita, allora la loro somma e la
        traccia <Math>{"\\operatorname{tr}(A)=\\lambda_1+\\cdots+\\lambda_n"}</Math>{" "}
        e il loro prodotto e il determinante{" "}
        <Math>{"\\det(A)=\\lambda_1\\cdots\\lambda_n"}</Math>.
      </Note>
    </Section>
  );
}
