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

export function DiagonalizzazioneSection() {
  return (
    <Section title="Diagonalizzazione" allowPageBreak>
      <Row gap="sm">
        <Column width="half">
          <Box color="blue" border="left" title="Idea chiave">
            <Definition term="Matrice diagonalizzabile">
              Una matrice <Math>{"A \\in \\mathbb{R}^{n \\times n}"}</Math> e
              diagonalizzabile se esistono una matrice invertibile{" "}
              <Math>{"P"}</Math> e una matrice diagonale <Math>{"D"}</Math>{" "}
              tali che:
            </Definition>
            <MathBlock gap="sm">{`A=PDP^{-1}`}</MathBlock>
            <p>
              Le colonne di <Math>{"P"}</Math> sono autovettori linearmente
              indipendenti di <Math>{"A"}</Math>. Gli elementi diagonali di{" "}
              <Math>{"D"}</Math> sono gli autovalori corrispondenti, nello
              stesso ordine delle colonne di <Math>{"P"}</Math>.
            </p>
          </Box>

          <Box color="blue" border="left" title="Criterio pratico">
            <Theorem title="Quando si puo diagonalizzare">
              <MathBlock gap="sm">
                {`A\\ \\text{diagonalizzabile}
\\Longleftrightarrow
\\mathbb{R}^n\\ \\text{ha una base di autovettori di}\\ A`}
              </MathBlock>
            </Theorem>
            <p>
              In pratica devi verificare se riesci a trovare{" "}
              <Math>{"n"}</Math> autovettori linearmente indipendenti.
            </p>
            <ol>
              <li>
                Calcola gli autovalori e la loro molteplicita algebrica{" "}
                <Math>{"m_a(\\lambda)"}</Math>.
              </li>
              <li>
                Se gli autovalori sono <Math>{"n"}</Math> e tutti distinti,
                puoi fermarti: <Math>{"A"}</Math> e diagonalizzabile.
              </li>
              <li>
                Se un autovalore e ripetuto, calcola{" "}
                <Math>{"m_g(\\lambda)=\\dim(E_\\lambda)"}</Math>.
              </li>
              <li>
                Usa il rango:{" "}
                <Math>
                  {"m_g(\\lambda)=n-\\operatorname{rank}(A-\\lambda I)"}
                </Math>
                .
              </li>
              <li>
                Confronta: se per ogni autovalore{" "}
                <Math>{"m_g(\\lambda)=m_a(\\lambda)"}</Math>, allora{" "}
                <Math>{"A"}</Math> e diagonalizzabile; se anche solo uno ha{" "}
                <Math>{"m_g(\\lambda)<m_a(\\lambda)"}</Math>, non lo e.
              </li>
            </ol>
            <Note>
              Scorciatoia: se <Math>{"A=A^T"}</Math>, allora{" "}
              <Math>{"A"}</Math> e diagonalizzabile con autovettori ortogonali.
            </Note>
          </Box>

          <Box color="green" border="left" title="Molteplicita">
            <ul>
              <li>
                Molteplicita algebrica: quante volte{" "}
                <Math>{"\\lambda"}</Math> e radice di{" "}
                <Math>{"p_A(\\lambda)"}</Math>.
              </li>
              <li>
                Molteplicita geometrica:{" "}
                <Math>
                  {"\\dim(E_\\lambda)=n-\\operatorname{rank}(A-\\lambda I)"}
                </Math>
                .
              </li>
              <li>
                Sempre{" "}
                <Math>{"1\\leq m_g(\\lambda)\\leq m_a(\\lambda)"}</Math>.
              </li>
              <li>
                Se il polinomio caratteristico si spezza nel campo usato,{" "}
                <Math>{"A"}</Math> e diagonalizzabile se, per ogni autovalore,{" "}
                <Math>{"m_g(\\lambda)=m_a(\\lambda)"}</Math>.
              </li>
            </ul>
          </Box>

          <Box color="red" border="left" title="Errori comuni">
            <ul>
              <li>
                L&apos;ordine degli autovalori in <Math>{"D"}</Math> deve
                seguire l&apos;ordine degli autovettori nelle colonne di{" "}
                <Math>{"P"}</Math>.
              </li>
              <li>
                Un autovalore ripetuto non basta: servono abbastanza
                autovettori indipendenti.
              </li>
              <li>
                Il vettore nullo appartiene agli autospazi, ma non e mai un
                autovettore.
              </li>
            </ul>
          </Box>
        </Column>

        <Column width="half">
          <Box color="gray" border="left" title="Invertibile vs diagonalizzabile">
            <Note>
              Invertibile e diagonalizzabile sono proprieta diverse:{" "}
              <Math>{"A"}</Math> e invertibile se{" "}
              <Math>{"\\det(A)\\neq0"}</Math>, cioe se <Math>{"0"}</Math> non e
              un autovalore. <Math>{"A"}</Math> e diagonalizzabile quando ha{" "}
              <Math>{"n"}</Math> autovettori indipendenti.
            </Note>
            <Note>
              Se <Math>{"A=PDP^{-1}"}</Math>, allora <Math>{"A"}</Math> e
              invertibile se e solo se nessun autovalore sulla diagonale di{" "}
              <Math>{"D"}</Math> e <Math>{"0"}</Math>.
            </Note>
          </Box>

          <Box color="yellow" border="left" title="Procedura">
            <ol>
              <li>
                Calcola il polinomio caratteristico{" "}
                <Math>{"p_A(\\lambda)=\\det(A-\\lambda I)"}</Math>.
              </li>
              <li>Trova gli autovalori risolvendo il polinomio.</li>
              <li>
                Per ogni autovalore, calcola{" "}
                <Math>{"E_\\lambda=\\ker(A-\\lambda I)"}</Math>.
              </li>
              <li>
                Se ottieni in totale <Math>{"n"}</Math> autovettori
                indipendenti, costruisci <Math>{"P"}</Math>.
              </li>
              <li>
                Metti in <Math>{"D"}</Math> gli autovalori nello stesso ordine
                degli autovettori scelti in <Math>{"P"}</Math>.
              </li>
            </ol>
          </Box>

          <Box color="purple" border="left" title="A cosa serve">
            <p>
              La diagonalizzazione semplifica potenze e calcoli ripetuti: se{" "}
              <Math>{"A=PDP^{-1}"}</Math>, allora
            </p>
            <MathBlock gap="sm">
              {`A^k=PD^kP^{-1}
\\qquad
D^k=\\operatorname{diag}(\\lambda_1^k,\\dots,\\lambda_n^k)`}
            </MathBlock>
            <p>
              Determinante e traccia si leggono dalla diagonale di{" "}
              <Math>{"D"}</Math>:
            </p>
            <MathBlock gap="sm">
              {`\\det(A)=\\lambda_1\\cdots\\lambda_n
\\qquad
\\operatorname{tr}(A)=\\lambda_1+\\cdots+\\lambda_n`}
            </MathBlock>
          </Box>

          <Box color="gray" border="left" title="Checklist veloce">
            <ol>
              <li>
                Autovalori distinti: diagonalizzabile direttamente.
              </li>
              <li>
                Autovalore ripetuto: confronta{" "}
                <Math>{"m_g(\\lambda)"}</Math> e{" "}
                <Math>{"m_a(\\lambda)"}</Math>.
              </li>
              <li>
                Costruisci <Math>{"P"}</Math> solo dopo avere{" "}
                <Math>{"n"}</Math> autovettori indipendenti.
              </li>
            </ol>
          </Box>

          <Example title="Esempio 2 x 2" color="blue">
            <MathBlock gap="sm" size="small">
              {`A=
\\begin{pmatrix}
2 & 1 \\\\
0 & 3
\\end{pmatrix}
\\qquad
\\lambda_1=2,\\ \\lambda_2=3`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`E_2=\\operatorname{span}\\left\\{
\\begin{pmatrix}
1 \\\\
0
\\end{pmatrix}
\\right\\}
\\qquad
E_3=\\operatorname{span}\\left\\{
\\begin{pmatrix}
1 \\\\
1
\\end{pmatrix}
\\right\\}`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`P=
\\begin{pmatrix}
1 & 1 \\\\
0 & 1
\\end{pmatrix}
\\qquad
D=
\\begin{pmatrix}
2 & 0 \\\\
0 & 3
\\end{pmatrix}`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`P^{-1}=
\\begin{pmatrix}
1 & -1 \\\\
0 & 1
\\end{pmatrix}
\\qquad
A=PDP^{-1}`}
            </MathBlock>
          </Example>
        </Column>
      </Row>
    </Section>
  );
}
