import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
  Definition,
  Theorem,
  CodeBlock,
} from "@/components";

export function SistemiLineariSection() {
  return (
    <Section title="Sistemi Lineari">
      <Row>
        <Column width="half">
          <Definition term="Sistema lineare">
            Un sistema di <Math>{"n"}</Math> equazioni in <Math>{"n"}</Math>{" "}
            incognite: <Math>{"Ax = b"}</Math>, dove <Math>{"A"}</Math> e la
            matrice dei coefficienti, <Math>{"x"}</Math> il vettore delle
            incognite, <Math>{"b"}</Math> il vettore dei termini noti.
          </Definition>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Forma matriciale">
            <MathBlock>
              {`\\begin{pmatrix}
a_{11} & a_{12} & \\cdots & a_{1n} \\\\
a_{21} & a_{22} & \\cdots & a_{2n} \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
a_{n1} & a_{n2} & \\cdots & a_{nn}
\\end{pmatrix}
\\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix}
=
\\begin{pmatrix} b_1 \\\\ b_2 \\\\ \\vdots \\\\ b_n \\end{pmatrix}`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <Box
        color="blue"
        border="left"
        title="Eliminazione di Gauss — O(n³/3)"
      >
        <p>
          Trasforma <Math>{"A"}</Math> in una matrice triangolare superiore{" "}
          <Math>{"U"}</Math> tramite operazioni elementari sulle righe.
          Il <strong>moltiplicatore</strong>: <Math>{`m_{ik} = a_{ik}/a_{kk}`}</Math> (elemento da eliminare / pivot).
        </p>
        <MathBlock>
          {`\\begin{pmatrix}
\\boxed{a_{11}} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{pmatrix}
\\xrightarrow{\\substack{R_2 - m_{21}R_1 \\\\ R_3 - m_{31}R_1}}
\\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\\\
0 & \\boxed{a_{22}'} & a_{23}' \\\\
0 & a_{32}' & a_{33}'
\\end{pmatrix}
\\xrightarrow{R_3 - m_{32}R_2}
\\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\\\
0 & a_{22}' & a_{23}' \\\\
0 & 0 & a_{33}''
\\end{pmatrix}`}
        </MathBlock>
        <Row>
          <Column width="half">
            <Note>
              <strong>Pivot:</strong> <Math>{"a_{kk}"}</Math> (riquadrato) deve essere{" "}
              <Math>{"\\neq 0"}</Math>. Se e zero, si usa il pivoting.
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def gauss(A, b):
    n = len(b)
    Ab = [A[i] + [b[i]] for i in range(n)]
    for k in range(n - 1):
        pivot = Ab[k][k]
        if pivot == 0: raise ValueError("Pivot nullo!")
        for i in range(k + 1, n):
            m = Ab[i][k] / pivot
            for j in range(k, n + 1):
                Ab[i][j] -= m * Ab[k][j]
    return Ab  # Matrice triangolare superiore`}
            </CodeBlock>
          </Column>
        </Row>
      </Box>

      <Box
        color="green"
        border="left"
        title="Gauss con Pivoting Parziale — Stabilita numerica"
      >
        <Row>
          <Column width="half">
            <p>
              Ad ogni passo <Math>{"k"}</Math>, si scambia la riga{" "}
              <Math>{"k"}</Math> con la riga che ha il{" "}
              <strong>pivot massimo in valore assoluto</strong>.
              Questo evita divisioni per numeri piccoli.
            </p>
            <MathBlock>
              {`\\begin{pmatrix}
\\color{gray}{1} & 2 & 3 \\\\
\\mathbf{4} & 5 & 6 \\\\
2 & 1 & 3
\\end{pmatrix}
\\xrightarrow[\\max|\\cdot|=4]{R_1 \\leftrightarrow R_2}
\\begin{pmatrix}
\\boxed{4} & 5 & 6 \\\\
1 & 2 & 3 \\\\
2 & 1 & 3
\\end{pmatrix}
\\rightarrow \\text{elimina}`}
            </MathBlock>
            <Note>
              <strong>Pivoting totale:</strong> cerca il massimo in tutta la
              sottomatrice (piu costoso, raramente usato).
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def gauss_pivot(A, b):
    n = len(b)
    Ab = [A[i] + [b[i]] for i in range(n)]
    
    for k in range(n - 1):
        # Trova riga con pivot massimo
        max_idx = k
        for i in range(k + 1, n):
            if abs(Ab[i][k]) > abs(Ab[max_idx][k]):
                max_idx = i
        # Scambia righe
        Ab[k], Ab[max_idx] = Ab[max_idx], Ab[k]
        
        # Eliminazione
        pivot = Ab[k][k]
        if pivot == 0:
            raise ValueError("Sistema singolare")
        for i in range(k + 1, n):
            m = Ab[i][k] / pivot
            for j in range(k, n + 1):
                Ab[i][j] -= m * Ab[k][j]
    
    return Ab`}
            </CodeBlock>
          </Column>
        </Row>
      </Box>

      <Box
        color="red"
        border="left"
        title="Sostituzione all'Indietro (Back Substitution) — O(n²/2)"
      >
        <Row>
          <Column width="half">
            <p>
              Dal sistema triangolare <Math>{"Ux = c"}</Math>, si risolvono
              le incognite <strong>dal basso verso l&apos;alto</strong>:
            </p>
            <MathBlock>
              {`\\begin{pmatrix}
u_{11} & u_{12} & u_{13} \\\\
0 & u_{22} & u_{23} \\\\
0 & 0 & u_{33}
\\end{pmatrix}
\\begin{pmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{pmatrix}
=
\\begin{pmatrix} c_1 \\\\ c_2 \\\\ c_3 \\end{pmatrix}`}
            </MathBlock>
            <MathBlock>
              {`\\begin{aligned}
x_3 &= \\frac{c_3}{u_{33}} \\\\[4pt]
x_2 &= \\frac{c_2 - u_{23}\\,x_3}{u_{22}} \\\\[4pt]
x_1 &= \\frac{c_1 - u_{12}\\,x_2 - u_{13}\\,x_3}{u_{11}}
\\end{aligned}`}
            </MathBlock>
            <Note>
              <strong>Sostituzione in avanti:</strong> per matrici triangolari
              inferiori <Math>{"Lx = c"}</Math>, si parte da <Math>{"x_1"}</Math>.
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def back_substitution(Ab):
    """
    Risolve Ux = c dove Ab = [U|c]
    Ab[i][n] = termine noto c_i
    Ab[i][i] = elemento diagonale u_ii
    """
    n = len(Ab)
    x = [0] * n
    
    # Parto dall'ultima riga (i = n-1)
    # e risalgo fino alla prima (i = 0)
    for i in range(n - 1, -1, -1):
        # Somma u_ij * x_j per j > i
        # (termini gia risolti)
        somma = 0
        for j in range(i + 1, n):
            somma += Ab[i][j] * x[j]
        
        # x_i = (c_i - somma) / u_ii
        x[i] = (Ab[i][n] - somma) / Ab[i][i]
    
    return x`}
            </CodeBlock>
          </Column>
        </Row>
      </Box>

      <Box
        color="gray"
        border="left"
        title="Metodo di Gauss-Jordan — Matrice identita"
      >
        <Row>
          <Column width="half">
            <p>
              Estende Gauss eliminando <strong>anche sopra</strong> la
              diagonale, trasformando <Math>{"A"}</Math> nella matrice identita{" "}
              <Math>{"I"}</Math>. La colonna dei termini noti diventa la
              soluzione.
            </p>
            <MathBlock>
              {`[A|b] \\xrightarrow{\\text{Gauss-Jordan}} [I|x]`}
            </MathBlock>
            <p>
              Dopo l&apos;eliminazione, si <strong>normalizza</strong> ogni riga
              dividendo per il pivot:
            </p>
            <MathBlock>
              {`a_{ij} \\leftarrow \\frac{a_{ij}}{a_{ii}}`}
            </MathBlock>
            <Note>
              <strong>Applicazioni:</strong> calcolo della matrice inversa{" "}
              <Math>{"A^{-1}"}</Math> (si applica a <Math>{"[A|I]"}</Math>).
              <br />
              <strong>Costo:</strong> <Math>{"O(n^3)"}</Math>, leggermente piu
              costoso di Gauss + sostituzione.
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def gauss_jordan(A, b):
    n = len(b)
    Ab = [A[i] + [b[i]] for i in range(n)]  # matrice aumentata [A|b]
    
    for k in range(n):                      # per ogni colonna k
        # Trova riga con pivot massimo
        max_idx = k
        for i in range(k + 1, n):
            if abs(Ab[i][k]) > abs(Ab[max_idx][k]):
                max_idx = i
        Ab[k], Ab[max_idx] = Ab[max_idx], Ab[k]  # scambia righe
        
        pivot = Ab[k][k]                    # elemento diagonale
        for j in range(k, n + 1):           # per ogni elemento della riga
            Ab[k][j] /= pivot               # divide per pivot -> Ab[k][k] = 1
        
        for i in range(n):                  # per TUTTE le righe
            if i != k:                      # tranne la riga pivot
                m = Ab[i][k]                # moltiplicatore
                for j in range(k, n + 1):   # per ogni elemento
                    Ab[i][j] -= m * Ab[k][j]  # elimina -> Ab[i][k] = 0
    
    return [Ab[i][n] for i in range(n)]     # ultima colonna = soluzione`}
            </CodeBlock>
          </Column>
        </Row>
      </Box>

      <Row>
        <Column width="half">
          <Box color="gray" border="left" title="Confronto dei metodi">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Metodo</th>
                  <th>Complessita</th>
                  <th>Output</th>
                  <th>Uso tipico</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gauss</td>
                  <td>
                    <Math>{"O(n^3/3)"}</Math>
                  </td>
                  <td>Triangolare sup.</td>
                  <td>Sistemi singoli</td>
                </tr>
                <tr>
                  <td>Gauss + Pivot</td>
                  <td>
                    <Math>{"O(n^3/3)"}</Math>
                  </td>
                  <td>Triangolare sup.</td>
                  <td>Stabilita numerica</td>
                </tr>
                <tr>
                  <td>Sostituzione</td>
                  <td>
                    <Math>{"O(n^2/2)"}</Math>
                  </td>
                  <td>Soluzione</td>
                  <td>Post-Gauss</td>
                </tr>
                <tr>
                  <td>Gauss-Jordan</td>
                  <td>
                    <Math>{"O(n^3)"}</Math>
                  </td>
                  <td>Identita</td>
                  <td>Inversa, sistemi multipli</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
        <Column width="half">
          <Theorem title="Condizione di esistenza e unicita">
            Il sistema <Math>{"Ax = b"}</Math> ha soluzione unica se e solo se{" "}
            <Math>{"\\det(A) \\neq 0"}</Math>, cioe se <Math>{"A"}</Math> e non
            singolare. Se durante Gauss tutti i pivot sono{" "}
            <Math>{"\\neq 0"}</Math>, la matrice e invertibile.
          </Theorem>
          <Box color="yellow" border="left" title="Fattorizzazione LU">
            <p>
              Gauss produce implicitamente <Math>{"A = LU"}</Math> dove{" "}
              <Math>{"L"}</Math> e triangolare inferiore (con i moltiplicatori{" "}
              <Math>{"m_{ik}"}</Math>) e <Math>{"U"}</Math> e triangolare
              superiore.
            </p>
            <MathBlock>
              {`Ax = b \\Rightarrow LUx = b \\Rightarrow \\begin{cases} Ly = b \\\\ Ux = y \\end{cases}`}
            </MathBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
