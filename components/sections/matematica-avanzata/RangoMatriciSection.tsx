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

export function RangoMatriciSection() {
  return (
    <Section title="Rango di una Matrice">
      <Definition term="Rango">
        Il rango di una matrice <Math>{"A"}</Math>, indicato con{" "}
        <Math>{"\\operatorname{rank}(A)"}</Math>, e il numero massimo di righe
        o colonne linearmente indipendenti. Equivalentemente, e il numero di
        pivot che compaiono riducendo la matrice con il metodo di Gauss.
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Come si calcola">
            <ol>
              <li>Porta la matrice in forma a scala con operazioni di riga.</li>
              <li>Conta le righe non nulle nella matrice ridotta.</li>
              <li>Quel numero e il rango.</li>
            </ol>
            <MathBlock>
              {`\\operatorname{rank}(A)=\\#\\{\\text{pivot dopo Gauss}\\}`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Limiti utili">
            <MathBlock>
              {`A\\in\\mathbb{R}^{m\\times n}
\\qquad\\Longrightarrow\\qquad
0\\le \\operatorname{rank}(A)\\le \\min(m,n)`}
            </MathBlock>
            <ul>
              <li>
                Se <Math>{"\\operatorname{rank}(A)=n"}</Math>, le colonne sono
                indipendenti.
              </li>
              <li>
                Se <Math>{"A"}</Math> e quadrata <Math>{"n\\times n"}</Math> e{" "}
                <Math>{"\\operatorname{rank}(A)=n"}</Math>, allora{" "}
                <Math>{"A"}</Math> e invertibile.
              </li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Example title="Esempio" color="blue">
        <MathBlock>
          {`\\begin{pmatrix}
1 & 2 & 3 \\\\
2 & 4 & 6 \\\\
1 & 1 & 0
\\end{pmatrix}
\\xrightarrow{R_2-2R_1}
\\begin{pmatrix}
1 & 2 & 3 \\\\
0 & 0 & 0 \\\\
1 & 1 & 0
\\end{pmatrix}
\\xrightarrow{R_3-R_1}
\\begin{pmatrix}
1 & 2 & 3 \\\\
0 & 0 & 0 \\\\
0 & -1 & -3
\\end{pmatrix}`}
        </MathBlock>
        <p>
          Ci sono due righe non nulle, quindi{" "}
          <Math>{"\\operatorname{rank}(A)=2"}</Math>.
        </p>
      </Example>

      <Note>
        Per matrici quadrate puoi anche usare i determinanti: il rango e
        l&apos;ordine massimo di un minore con determinante non nullo. In
        pratica, Gauss e quasi sempre il metodo piu rapido.
      </Note>
    </Section>
  );
}
