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
        <Row>
          <Column width="half">
            <p>
              Trasforma <Math>{"A"}</Math> in una matrice triangolare superiore{" "}
              <Math>{"U"}</Math> tramite operazioni elementari sulle righe.
            </p>
            <MathBlock>
              {`a_{ij}^{(k+1)} = a_{ij}^{(k)} - \\frac{a_{ik}^{(k)}}{a_{kk}^{(k)}} \\cdot a_{kj}^{(k)}`}
            </MathBlock>
            <p>
              Il <strong>moltiplicatore</strong> per la riga <Math>{"i"}</Math>{" "}
              rispetto al pivot <Math>{"k"}</Math> e:
            </p>
            <MathBlock>{`m_{ik} = \\frac{a_{ik}^{(k)}}{a_{kk}^{(k)}}`}</MathBlock>
            <Note>
              <strong>Pivot:</strong> <Math>{"a_{kk}^{(k)}"}</Math> deve essere{" "}
              <Math>{"\\neq 0"}</Math>. Se e zero, si usa il pivoting.
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def gauss(A, b):
    n = len(b)
    # Crea matrice aumentata
    Ab = [A[i] + [b[i]] for i in range(n)]
    
    # Eliminazione in avanti
    for k in range(n - 1):
        for i in range(k + 1, n):
            if Ab[k][k] == 0:
                raise ValueError("Pivot nullo!")
            m = Ab[i][k] / Ab[k][k]
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
              <Math>{"k"}</Math> con la riga <Math>{"r \\geq k"}</Math> che ha
              il <strong>pivot massimo in valore assoluto</strong>:
            </p>
            <MathBlock>
              {`r = \\arg\\max_{i \\geq k} |a_{ik}^{(k)}|`}
            </MathBlock>
            <p>
              Questo evita divisioni per numeri piccoli che amplificano gli
              errori di arrotondamento.
            </p>
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
        for i in range(k + 1, n):
            if Ab[k][k] == 0:
                raise ValueError("Sistema singolare")
            m = Ab[i][k] / Ab[k][k]
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
              Dopo aver ottenuto il sistema triangolare superiore{" "}
              <Math>{"Ux = c"}</Math>, si risolvono le incognite partendo
              dall&apos;ultima:
            </p>
            <MathBlock>
              {`x_n = \\frac{c_n}{u_{nn}}`}
            </MathBlock>
            <MathBlock>
              {`x_i = \\frac{1}{u_{ii}} \\left( c_i - \\sum_{j=i+1}^{n} u_{ij} x_j \\right)`}
            </MathBlock>
            <p>
              Per <Math>{"i = n-1, n-2, \\ldots, 1"}</Math>.
            </p>
            <Note>
              <strong>Sostituzione in avanti:</strong> per matrici triangolari
              inferiori, si parte da <Math>{"x_1"}</Math> e si procede verso{" "}
              <Math>{"x_n"}</Math>.
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def back_substitution(Ab):
    n = len(Ab)
    x = [0] * n
    
    for i in range(n - 1, -1, -1):
        # Somma dei termini gia calcolati
        somma = sum(Ab[i][j] * x[j] 
                    for j in range(i + 1, n))
        x[i] = (Ab[i][n] - somma) / Ab[i][i]
    
    return x

# Soluzione completa
def solve(A, b):
    Ab = gauss_pivot(A, b)
    return back_substitution(Ab)`}
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
    Ab = [A[i] + [b[i]] for i in range(n)]
    
    for k in range(n):
        # Pivoting parziale
        max_idx = max(range(k, n), 
                      key=lambda i: abs(Ab[i][k]))
        Ab[k], Ab[max_idx] = Ab[max_idx], Ab[k]
        
        # Normalizza riga pivot
        pivot = Ab[k][k]
        for j in range(k, n + 1):
            Ab[k][j] /= pivot
        
        # Elimina sopra E sotto
        for i in range(n):
            if i != k:
                m = Ab[i][k]
                for j in range(k, n + 1):
                    Ab[i][j] -= m * Ab[k][j]
    
    # Soluzione nella colonna dei termini noti
    return [Ab[i][n] for i in range(n)]`}
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
