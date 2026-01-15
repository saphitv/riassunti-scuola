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
        </Column>
      </Row>

      <Box color="yellow" border="left" title="Fattorizzazione LU — O(n³/3)">
        <Row>
          <Column width="half">
            <p>
              La fattorizzazione LU scompone una matrice <Math>{"A"}</Math> nel prodotto
              di due matrici triangolari: <Math>{"A = LU"}</Math>
            </p>
            <ul>
              <li><Math>{"L"}</Math> = triangolare <strong>inferiore</strong> con 1 sulla diagonale</li>
              <li><Math>{"U"}</Math> = triangolare <strong>superiore</strong> (risultato di Gauss)</li>
            </ul>
            <MathBlock>
              {`A = LU = 
\\begin{pmatrix}
1 & 0 & 0 \\\\
l_{21} & 1 & 0 \\\\
l_{31} & l_{32} & 1
\\end{pmatrix}
\\begin{pmatrix}
u_{11} & u_{12} & u_{13} \\\\
0 & u_{22} & u_{23} \\\\
0 & 0 & u_{33}
\\end{pmatrix}`}
            </MathBlock>
            <Note>
              <strong>Importante:</strong> Gli elementi <Math>{"l_{ik}"}</Math> sotto la diagonale
              di <Math>{"L"}</Math> sono esattamente i <strong>moltiplicatori</strong>{" "}
              <Math>{"m_{ik}"}</Math> usati nell&apos;eliminazione di Gauss!
            </Note>
          </Column>
          <Column width="half">
            <Definition term="Costruzione di L e U">
              Durante l&apos;eliminazione di Gauss:
              <ul>
                <li><Math>{"U"}</Math> = matrice finale triangolare superiore</li>
                <li><Math>{"L"}</Math> = matrice dei moltiplicatori + diagonale di 1</li>
              </ul>
            </Definition>
            <MathBlock>
              {`l_{ik} = m_{ik} = \\frac{a_{ik}^{(k-1)}}{a_{kk}^{(k-1)}} \\quad \\text{per } i > k`}
            </MathBlock>
            <p>
              Dove <Math>{"a_{ik}^{(k-1)}"}</Math> e l&apos;elemento al passo <Math>{"k-1"}</Math> di Gauss.
            </p>
          </Column>
        </Row>
      </Box>

      <Box color="blue" border="left" title="Esempio numerico LU">
        <Row>
          <Column width="half">
            <p><strong>Data la matrice:</strong></p>
            <MathBlock>
              {`A = \\begin{pmatrix}
2 & 1 & 1 \\\\
4 & 3 & 3 \\\\
8 & 7 & 9
\\end{pmatrix}`}
            </MathBlock>
            <p><strong>Passo 1:</strong> Elimina sotto <Math>{"a_{11} = 2"}</Math></p>
            <MathBlock>
              {`m_{21} = \\frac{4}{2} = 2, \\quad m_{31} = \\frac{8}{2} = 4`}
            </MathBlock>
            <MathBlock>
              {`A^{(1)} = \\begin{pmatrix}
2 & 1 & 1 \\\\
0 & 1 & 1 \\\\
0 & 3 & 5
\\end{pmatrix}`}
            </MathBlock>
            <p><strong>Passo 2:</strong> Elimina sotto <Math>{"a_{22}^{(1)} = 1"}</Math></p>
            <MathBlock>
              {`m_{32} = \\frac{3}{1} = 3`}
            </MathBlock>
            <MathBlock>
              {`U = A^{(2)} = \\begin{pmatrix}
2 & 1 & 1 \\\\
0 & 1 & 1 \\\\
0 & 0 & 2
\\end{pmatrix}`}
            </MathBlock>
          </Column>
          <Column width="half">
            <p><strong>Costruzione di L:</strong></p>
            <MathBlock>
              {`L = \\begin{pmatrix}
1 & 0 & 0 \\\\
m_{21} & 1 & 0 \\\\
m_{31} & m_{32} & 1
\\end{pmatrix}
= \\begin{pmatrix}
1 & 0 & 0 \\\\
2 & 1 & 0 \\\\
4 & 3 & 1
\\end{pmatrix}`}
            </MathBlock>
            <p><strong>Verifica:</strong> <Math>{"LU = A"}</Math></p>
            <Note>
              <strong>Regola:</strong> l&apos;elemento <Math>{"(i,j)"}</Math> del prodotto
              e il <strong>prodotto scalare</strong> della riga <Math>{"i"}</Math> di L
              per la colonna <Math>{"j"}</Math> di U.
            </Note>
          </Column>
        </Row>
        <Row>
          <Column width="half">
            <p><strong>Calcoliamo LU elemento per elemento:</strong></p>
            <MathBlock>
              {`L = \\begin{pmatrix}
\\color{blue}{1} & \\color{blue}{0} & \\color{blue}{0} \\\\
\\color{green}{2} & \\color{green}{1} & \\color{green}{0} \\\\
\\color{red}{4} & \\color{red}{3} & \\color{red}{1}
\\end{pmatrix}
\\quad
U = \\begin{pmatrix}
\\color{orange}{2} & \\color{purple}{1} & \\color{brown}{1} \\\\
\\color{orange}{0} & \\color{purple}{1} & \\color{brown}{1} \\\\
\\color{orange}{0} & \\color{purple}{0} & \\color{brown}{2}
\\end{pmatrix}`}
            </MathBlock>
            <p><strong>Prima riga di A</strong> (riga 1 di L × colonne di U):</p>
            <MathBlock>
              {`\\begin{aligned}
a_{11} &= (1,0,0) \\cdot (2,0,0) = 1{\\cdot}2 + 0{\\cdot}0 + 0{\\cdot}0 = \\mathbf{2} \\\\
a_{12} &= (1,0,0) \\cdot (1,1,0) = 1{\\cdot}1 + 0{\\cdot}1 + 0{\\cdot}0 = \\mathbf{1} \\\\
a_{13} &= (1,0,0) \\cdot (1,1,2) = 1{\\cdot}1 + 0{\\cdot}1 + 0{\\cdot}2 = \\mathbf{1}
\\end{aligned}`}
            </MathBlock>
          </Column>
          <Column width="half">
            <p><strong>Seconda riga di A</strong> (riga 2 di L × colonne di U):</p>
            <MathBlock>
              {`\\begin{aligned}
a_{21} &= (2,1,0) \\cdot (2,0,0) = 2{\\cdot}2 + 1{\\cdot}0 + 0{\\cdot}0 = \\mathbf{4} \\\\
a_{22} &= (2,1,0) \\cdot (1,1,0) = 2{\\cdot}1 + 1{\\cdot}1 + 0{\\cdot}0 = \\mathbf{3} \\\\
a_{23} &= (2,1,0) \\cdot (1,1,2) = 2{\\cdot}1 + 1{\\cdot}1 + 0{\\cdot}2 = \\mathbf{3}
\\end{aligned}`}
            </MathBlock>
            <p><strong>Terza riga di A</strong> (riga 3 di L × colonne di U):</p>
            <MathBlock>
              {`\\begin{aligned}
a_{31} &= (4,3,1) \\cdot (2,0,0) = 4{\\cdot}2 + 3{\\cdot}0 + 1{\\cdot}0 = \\mathbf{8} \\\\
a_{32} &= (4,3,1) \\cdot (1,1,0) = 4{\\cdot}1 + 3{\\cdot}1 + 1{\\cdot}0 = \\mathbf{7} \\\\
a_{33} &= (4,3,1) \\cdot (1,1,2) = 4{\\cdot}1 + 3{\\cdot}1 + 1{\\cdot}2 = \\mathbf{9}
\\end{aligned}`}
            </MathBlock>
            <MathBlock>
              {`\\therefore \\quad LU = \\begin{pmatrix}
2 & 1 & 1 \\\\
4 & 3 & 3 \\\\
8 & 7 & 9
\\end{pmatrix} = A \\quad \\checkmark`}
            </MathBlock>
          </Column>
        </Row>
      </Box>

      <Box color="green" border="left" title="Risoluzione con LU — Due sostituzioni">
        <Row>
          <Column width="half">
            <p>
              Una volta ottenuta <Math>{"A = LU"}</Math>, il sistema{" "}
              <Math>{"Ax = b"}</Math> si risolve in <strong>due fasi</strong>:
            </p>
            <MathBlock>
              {`Ax = b \\Rightarrow LUx = b`}
            </MathBlock>
            <Definition term="Fase 1: Sostituzione in avanti">
              Risolvi <Math>{"Ly = b"}</Math> per trovare <Math>{"y"}</Math>:
              <MathBlock>
                {`y_i = b_i - \\sum_{j=1}^{i-1} l_{ij} \\cdot y_j`}
              </MathBlock>
            </Definition>
            <Definition term="Fase 2: Sostituzione all'indietro">
              Risolvi <Math>{"Ux = y"}</Math> per trovare <Math>{"x"}</Math>:
              <MathBlock>
                {`x_i = \\frac{y_i - \\sum_{j=i+1}^{n} u_{ij} \\cdot x_j}{u_{ii}}`}
              </MathBlock>
            </Definition>
          </Column>
          <Column width="half">
            <p><strong>Esempio:</strong> Risolvi <Math>{"Ax = b"}</Math> con <Math>{"b = (4, 10, 24)^T"}</Math></p>
            <p><strong>Fase 1:</strong> <Math>{"Ly = b"}</Math></p>
            <MathBlock>
              {`\\begin{pmatrix}
1 & 0 & 0 \\\\
2 & 1 & 0 \\\\
4 & 3 & 1
\\end{pmatrix}
\\begin{pmatrix} y_1 \\\\ y_2 \\\\ y_3 \\end{pmatrix}
= \\begin{pmatrix} 4 \\\\ 10 \\\\ 24 \\end{pmatrix}`}
            </MathBlock>
            <MathBlock>
              {`\\begin{aligned}
y_1 &= 4 \\\\
y_2 &= 10 - 2 \\cdot 4 = 2 \\\\
y_3 &= 24 - 4 \\cdot 4 - 3 \\cdot 2 = 2
\\end{aligned}`}
            </MathBlock>
            <p><strong>Fase 2:</strong> <Math>{"Ux = y"}</Math></p>
            <MathBlock>
              {`\\begin{aligned}
x_3 &= \\frac{2}{2} = 1 \\\\
x_2 &= \\frac{2 - 1 \\cdot 1}{1} = 1 \\\\
x_1 &= \\frac{4 - 1 \\cdot 1 - 1 \\cdot 1}{2} = 1
\\end{aligned}`}
            </MathBlock>
            <Note>
              <strong>Soluzione:</strong> <Math>{"x = (1, 1, 1)^T"}</Math>
            </Note>
          </Column>
        </Row>
      </Box>

      <Box color="purple" border="left" title="Vantaggio della fattorizzazione LU">
        <Row>
          <Column width="half">
            <p>
              Il grande vantaggio di LU e risolvere <strong>sistemi multipli</strong>{" "}
              con la stessa matrice <Math>{"A"}</Math> ma diversi termini noti{" "}
              <Math>{"b^{(1)}, b^{(2)}, \\ldots"}</Math>
            </p>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Metodo</th>
                  <th>1 sistema</th>
                  <th>k sistemi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gauss diretto</td>
                  <td><Math>{"O(n^3)"}</Math></td>
                  <td><Math>{"O(k \\cdot n^3)"}</Math></td>
                </tr>
                <tr>
                  <td>LU (fattorizza una volta)</td>
                  <td><Math>{"O(n^3)"}</Math></td>
                  <td><Math>{"O(n^3 + k \\cdot n^2)"}</Math></td>
                </tr>
              </tbody>
            </table>
            <Note>
              Con LU, la fattorizzazione costa <Math>{"O(n^3)"}</Math> ma ogni
              sistema aggiuntivo costa solo <Math>{"O(n^2)"}</Math>!
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def lu_decomposition(A):
    """Fattorizza A = LU, restituisce L e U"""
    n = len(A)
    L = [[0.0] * n for _ in range(n)]
    U = [row[:] for row in A]  # copia di A
    
    for k in range(n):
        L[k][k] = 1.0  # diagonale di L = 1
        for i in range(k + 1, n):
            # Calcola e salva il moltiplicatore
            L[i][k] = U[i][k] / U[k][k]
            # Elimina sotto il pivot
            for j in range(k, n):
                U[i][j] -= L[i][k] * U[k][j]
    
    return L, U

def forward_substitution(L, b):
    """Risolve Ly = b"""
    n = len(b)
    y = [0.0] * n
    for i in range(n):
        y[i] = b[i] - sum(L[i][j] * y[j] 
                         for j in range(i))
    return y

def back_substitution(U, y):
    """Risolve Ux = y"""
    n = len(y)
    x = [0.0] * n
    for i in range(n - 1, -1, -1):
        x[i] = (y[i] - sum(U[i][j] * x[j] 
                for j in range(i + 1, n))) / U[i][i]
    return x

def solve_lu(A, b):
    """Risolve Ax = b usando LU"""
    L, U = lu_decomposition(A)
    y = forward_substitution(L, b)
    x = back_substitution(U, y)
    return x`}
            </CodeBlock>
          </Column>
        </Row>
      </Box>

      <Box color="red" border="left" title="LU con Pivoting (PA = LU)">
        <Row>
          <Column width="half">
            <p>
              Se un pivot e zero o molto piccolo, serve il <strong>pivoting</strong>.
              La fattorizzazione diventa:
            </p>
            <MathBlock>
              {`PA = LU`}
            </MathBlock>
            <p>
              Dove <Math>{"P"}</Math> e una <strong>matrice di permutazione</strong>{" "}
              che registra gli scambi di righe.
            </p>
            <Definition term="Matrice di permutazione">
              <Math>{"P"}</Math> e una matrice con esattamente un 1 per riga e colonna.
              Moltiplicare <Math>{"PA"}</Math> scambia le righe di <Math>{"A"}</Math>.
            </Definition>
            <MathBlock>
              {`P = \\begin{pmatrix}
0 & 1 & 0 \\\\
1 & 0 & 0 \\\\
0 & 0 & 1
\\end{pmatrix} \\Rightarrow PA = \\text{scambia } R_1 \\leftrightarrow R_2`}
            </MathBlock>
            <p>Per risolvere <Math>{"Ax = b"}</Math>:</p>
            <MathBlock>
              {`PAx = Pb \\Rightarrow LUx = Pb \\Rightarrow \\begin{cases} Ly = Pb \\\\ Ux = y \\end{cases}`}
            </MathBlock>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def lu_pivot(A):
    """PA = LU con pivoting parziale"""
    n = len(A)
    L = [[0.0] * n for _ in range(n)]
    U = [row[:] for row in A]
    P = list(range(n))  # permutazione come lista
    
    for k in range(n):
        # Trova pivot massimo
        max_idx = k
        for i in range(k + 1, n):
            if abs(U[i][k]) > abs(U[max_idx][k]):
                max_idx = i
        
        # Scambia righe in U, L e P
        U[k], U[max_idx] = U[max_idx], U[k]
        P[k], P[max_idx] = P[max_idx], P[k]
        # Scambia anche la parte gia calcolata di L
        for j in range(k):
            L[k][j], L[max_idx][j] = L[max_idx][j], L[k][j]
        
        L[k][k] = 1.0
        for i in range(k + 1, n):
            L[i][k] = U[i][k] / U[k][k]
            for j in range(k, n):
                U[i][j] -= L[i][k] * U[k][j]
    
    return P, L, U

def solve_lu_pivot(A, b):
    """Risolve Ax = b con LU + pivoting"""
    P, L, U = lu_pivot(A)
    # Applica permutazione a b
    Pb = [b[P[i]] for i in range(len(b))]
    y = forward_substitution(L, Pb)
    x = back_substitution(U, y)
    return x`}
            </CodeBlock>
          </Column>
        </Row>
      </Box>

      <Row>
        <Column width="auto">
          <Box color="gray" border="left" title="Riepilogo: Quando usare LU?">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Metodo consigliato</th>
                  <th>Motivazione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Un solo sistema <Math>{"Ax = b"}</Math></td>
                  <td>Gauss + Back Substitution</td>
                  <td>Piu semplice, stesso costo</td>
                </tr>
                <tr>
                  <td>Sistemi multipli con stessa <Math>{"A"}</Math></td>
                  <td><strong>Fattorizzazione LU</strong></td>
                  <td>Fattorizzi una volta, risolvi in <Math>{"O(n^2)"}</Math></td>
                </tr>
                <tr>
                  <td>Calcolo del determinante</td>
                  <td>LU</td>
                  <td><Math>{"\\det(A) = \\det(L) \\cdot \\det(U) = \\prod u_{ii}"}</Math></td>
                </tr>
                <tr>
                  <td>Matrice mal condizionata</td>
                  <td>LU con pivoting (PA = LU)</td>
                  <td>Stabilita numerica</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
