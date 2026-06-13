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

export function SistemiEquazioniDifferenzialiSection() {
  return (
    <Section title="Sistemi di equazioni differenziali" allowPageBreak>
      <Definition term="Sistema lineare del primo ordine">
        Un sistema di equazioni differenziali lineari si scrive in forma
        vettoriale usando una matrice dei coefficienti:
      </Definition>
      <MathBlock>
        {`\\mathbf{x}'(t)=A\\mathbf{x}(t)+\\mathbf{b}(t)
\\qquad
\\mathbf{x}(t)=
\\begin{pmatrix}
x_1(t) \\\\
\\vdots \\\\
x_n(t)
\\end{pmatrix}`}
      </MathBlock>
      <p>
        Se <Math>{"\\mathbf{b}(t)=0"}</Math>, il sistema e omogeneo. Se{" "}
        <Math>{"A"}</Math> ha coefficienti costanti, autovalori e autovettori
        descrivono direttamente l&apos;andamento delle soluzioni.
      </p>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Problema di Cauchy">
            <p>
              Data una condizione iniziale{" "}
              <Math>{"\\mathbf{x}(t_0)=\\mathbf{x}_0"}</Math>, si cerca la
              traiettoria che parte dal vettore assegnato:
            </p>
            <MathBlock>
              {`\\begin{cases}
\\mathbf{x}'(t)=A\\mathbf{x}(t) \\\\
\\mathbf{x}(t_0)=\\mathbf{x}_0
\\end{cases}`}
            </MathBlock>
            <Theorem title="Soluzione generale">
              <MathBlock>
                {`\\mathbf{x}(t)=e^{A(t-t_0)}\\mathbf{x}_0`}
              </MathBlock>
              <p>
                Per una matrice quadrata <Math>{"B"}</Math>,
                l&apos;esponenziale di matrice si definisce con la stessa serie
                dell&apos;esponenziale scalare:
              </p>
              <MathBlock>
                {`e^B=I+B+\\frac{B^2}{2!}+\\frac{B^3}{3!}+\\cdots
=\\sum_{k=0}^{\\infty}\\frac{B^k}{k!}`}
              </MathBlock>
              La matrice <Math>{"e^{At}"}</Math> si calcola facilmente quando{" "}
              <Math>{"A"}</Math> e diagonalizzabile.
            </Theorem>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Procedura pratica">
            <ol>
              <li>
                Scrivi il sistema nella forma{" "}
                <Math>{"\\mathbf{x}'=A\\mathbf{x}"}</Math>.
              </li>
              <li>
                Calcola gli autovalori con{" "}
                <Math>{"\\det(A-\\lambda I)=0"}</Math>.
              </li>
              <li>
                Trova una base di autovettori risolvendo{" "}
                <Math>{"(A-\\lambda I)v=0"}</Math>.
              </li>
              <li>
                Costruisci le soluzioni elementari{" "}
                <Math>{"e^{\\lambda t}v"}</Math>.
              </li>
              <li>
                Combinale e usa le condizioni iniziali per trovare le costanti.
              </li>
            </ol>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="green" border="left" title="Caso diagonalizzabile">
            <p>
              Se <Math>{"A=PDP^{-1}"}</Math>, con{" "}
              <Math>{"D=\\operatorname{diag}(\\lambda_1,\\dots,\\lambda_n)"}</Math>,
              allora:
            </p>
            <MathBlock>
              {`e^{At}=Pe^{Dt}P^{-1}
\\qquad
e^{Dt}=\\operatorname{diag}(e^{\\lambda_1 t},\\dots,e^{\\lambda_n t})`}
            </MathBlock>
            <p>
              Equivalentemente, se <Math>{"v_1,\\dots,v_n"}</Math> sono
              autovettori indipendenti:
            </p>
            <MathBlock>
              {`\\mathbf{x}(t)
=c_1e^{\\lambda_1t}v_1+\\cdots+c_ne^{\\lambda_nt}v_n`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Autovalori complessi">
            <p>
              Se <Math>{"\\lambda=\\alpha+i\\beta"}</Math> ha autovettore{" "}
              <Math>{"v=p+iq"}</Math>, dal termine complesso{" "}
              <Math>{"e^{\\lambda t}v"}</Math> si ottengono due soluzioni reali:
            </p>
            <MathBlock>
              {`e^{\\alpha t}\\bigl(p\\cos(\\beta t)-q\\sin(\\beta t)\\bigr)
\\qquad
e^{\\alpha t}\\bigl(p\\sin(\\beta t)+q\\cos(\\beta t)\\bigr)`}
            </MathBlock>
            <Note>
              <Math>{"\\alpha"}</Math> controlla crescita o decadimento;{" "}
              <Math>{"\\beta"}</Math> controlla la rotazione.
            </Note>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="gray" border="left" title="Sistema non omogeneo">
            <p>
              Per <Math>{"\\mathbf{x}'=A\\mathbf{x}+\\mathbf{b}(t)"}</Math>, la
              soluzione e la somma di omogenea e particolare:
            </p>
            <MathBlock>
              {`\\mathbf{x}(t)=\\mathbf{x}_h(t)+\\mathbf{x}_p(t)`}
            </MathBlock>
            <p>Una formula generale usa la variazione delle costanti:</p>
            <MathBlock>
              {`\\mathbf{x}(t)
=e^{A(t-t_0)}\\mathbf{x}_0
+\\int_{t_0}^{t} e^{A(t-s)}\\mathbf{b}(s)\\,ds`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Da ordine superiore a sistema">
            <p>
              Per trasformare un&apos;equazione di ordine superiore in un
              sistema del primo ordine, metti nel vettore la funzione e le sue
              derivate successive.
            </p>
            <MathBlock>
              {`\\mathbf{x}=
\\begin{pmatrix}
y \\\\
y' \\\\
\\vdots \\\\
y^{(n-1)}
\\end{pmatrix}
\\qquad
\\mathbf{x}'=
\\begin{pmatrix}
y' \\\\
y'' \\\\
\\vdots \\\\
y^{(n)}
\\end{pmatrix}`}
            </MathBlock>
            <p>Nel caso del secondo ordine:</p>
            <MathBlock>
              {`y''=\\alpha y' + \\beta y
\\qquad
\\begin{pmatrix}
y' \\\\
y''
\\end{pmatrix}
=
\\begin{pmatrix}
0 & 1 \\\\
\\beta & \\alpha
\\end{pmatrix}
\\begin{pmatrix}
y \\\\
y'
\\end{pmatrix}`}
            </MathBlock>
            <MathBlock>
              {`\\text{Esempio: } y''=-y'+2y
\\qquad
\\begin{pmatrix}
y' \\\\
y''
\\end{pmatrix}
=
\\begin{pmatrix}
0 & 1 \\\\
2 & -1
\\end{pmatrix}
\\begin{pmatrix}
y \\\\
y'
\\end{pmatrix}`}
            </MathBlock>
            <Note>
              La prima riga copia sempre <Math>{"y'=y'"}</Math>; la seconda
              riga contiene i coefficienti dell&apos;equazione che esprime{" "}
              <Math>{"y''"}</Math>.
            </Note>
          </Box>
        </Column>
      </Row>

      <Example title="Esempio con due autovalori reali distinti" color="blue">
        <Row>
          <Column width="half">
            <p>Risolvi il sistema omogeneo:</p>
            <MathBlock>
              {`\\mathbf{x}'=
\\begin{pmatrix}
2 & 1 \\\\
0 & 3
\\end{pmatrix}
\\mathbf{x}`}
            </MathBlock>
            <MathBlock>
              {`\\lambda_1=2,\\quad v_1=
\\begin{pmatrix}
1 \\\\
0
\\end{pmatrix}
\\qquad
\\lambda_2=3,\\quad v_2=
\\begin{pmatrix}
1 \\\\
1
\\end{pmatrix}`}
            </MathBlock>
          </Column>
          <Column width="half">
            <p>La soluzione generale e:</p>
            <MathBlock>
              {`\\mathbf{x}(t)
=c_1e^{2t}
\\begin{pmatrix}
1 \\\\
0
\\end{pmatrix}
+c_2e^{3t}
\\begin{pmatrix}
1 \\\\
1
\\end{pmatrix}`}
            </MathBlock>
            <MathBlock>
              {`x_1(t)=c_1e^{2t}+c_2e^{3t}
\\qquad
x_2(t)=c_2e^{3t}`}
            </MathBlock>
          </Column>
        </Row>
      </Example>

      <Box color="red" border="left" title="Errori comuni">
        <ul>
          <li>
            Non confondere gli autovalori della matrice{" "}
            <Math>{"A"}</Math> con le componenti della soluzione.
          </li>
          <li>
            Gli autovettori devono essere nello stesso ordine degli autovalori
            usati nelle esponenziali.
          </li>
          <li>
            Se <Math>{"A"}</Math> non ha abbastanza autovettori indipendenti,
            la formula diagonalizzata non basta: serve la forma di Jordan o un
            metodo equivalente.
          </li>
        </ul>
      </Box>
    </Section>
  );
}
