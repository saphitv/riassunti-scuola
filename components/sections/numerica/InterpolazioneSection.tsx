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
} from "@/components/index";

export function InterpolazioneSection() {
  return (
    <Section title="Interpolazione Polinomiale" allowPageBreak>
      <Row>
        <Column width="half">
          <Definition term="Interpolazione">
            Dati punti <Math>{"(x_i,y_i)"}</Math>, si cerca una funzione{" "}
            <Math>{"f"}</Math> tale che <Math>{"f(x_i)=y_i"}</Math> per ogni
            nodo. A differenza della regressione, deve passare per tutti i
            punti.
          </Definition>
        </Column>
        <Column width="half">
          <Theorem title="Unicita">
            Per <Math>{"n+1"}</Math> punti con ascisse distinte esiste un solo
            polinomio di grado al massimo <Math>{"n"}</Math> che passa per tutti
            i punti.
          </Theorem>
        </Column>
      </Row>

      <Box color="blue" border="left" title="Matrice di Vandermonde">
        <Row>
          <Column width="half">
            <MathBlock>{"p(x)=a_0+a_1x+\\cdots+a_nx^n"}</MathBlock>
            <p>
              Imponendo <Math>{"p(x_i)=y_i"}</Math> si ottiene il sistema{" "}
              <Math>{"Va=y"}</Math>.
            </p>
            <MathBlock size="small">
              {"V=\\begin{bmatrix} 1 & x_0 & x_0^2 & \\cdots & x_0^n \\\\ 1 & x_1 & x_1^2 & \\cdots & x_1^n \\\\ \\vdots & \\vdots & \\vdots & & \\vdots \\\\ 1 & x_n & x_n^2 & \\cdots & x_n^n \\end{bmatrix}"}
            </MathBlock>
          </Column>
          <Column width="half">
            <p>
              Con <strong>3 punti</strong> si cercano 3 coefficienti:{" "}
              <Math>{"a_0,a_1,a_2"}</Math>. Quindi <Math>{"V"}</Math> ha 3
              righe e 3 colonne, mentre <Math>{"y"}</Math> e un vettore
              colonna separato.
            </p>
            <MathBlock size="small">
              {"\\begin{bmatrix} 1 & x_0 & x_0^2 \\\\ 1 & x_1 & x_1^2 \\\\ 1 & x_2 & x_2^2 \\end{bmatrix}\\begin{bmatrix} a_0 \\\\ a_1 \\\\ a_2 \\end{bmatrix}=\\begin{bmatrix} y_0 \\\\ y_1 \\\\ y_2 \\end{bmatrix}"}
            </MathBlock>
            <Note>
              Esempio: per <Math>{"(0,1),(1,3),(2,7)"}</Math>:
              <MathBlock size="small">
                {"\\begin{bmatrix} 1 & 0 & 0 \\\\ 1 & 1 & 1 \\\\ 1 & 2 & 4 \\end{bmatrix}\\begin{bmatrix} a_0 \\\\ a_1 \\\\ a_2 \\end{bmatrix}=\\begin{bmatrix} 1 \\\\ 3 \\\\ 7 \\end{bmatrix}"}
              </MathBlock>
              La matrice di Vandermonde e <Math>{"3\\times3"}</Math>; se si
              scrive la matrice aumentata <Math>{"[V\\mid y]"}</Math>, allora
              compare una colonna in piu per i valori <Math>{"y"}</Math>.
            </Note>
            <p>
              Se il polinomio e scritto in ordine decrescente,{" "}
              <Math>{"p(x)=a_nx^n+\\cdots+a_1x+a_0"}</Math>, la riga diventa:
            </p>
            <MathBlock>{"[x_i^n,\\ x_i^{n-1},\\ \\ldots,\\ x_i,\\ 1]"}</MathBlock>
            <Note>
              Esempio: per <Math>{"x_i=[-2,-1,1,2]"}</Math> e{" "}
              <Math>{"y_i=[4,5,1,8]"}</Math> si ottiene{" "}
              <Math>{"p(x)=x^3+x^2-3x+2"}</Math>. Con il punto{" "}
              <Math>{"(3,5)"}</Math>:{" "}
              <Math>{"p_4(x)=-\\frac{3}{5}x^4+x^3+4x^2-3x-\\frac{2}{5}"}</Math>.
            </Note>
          </Column>
        </Row>
      </Box>

      <Box color="green" border="left" title="Newton e differenze divise">
        <Row>
          <Column width="half">
            <MathBlock size="small">
              {"p_n(x)=c_0+c_1(x-x_0)+c_2(x-x_0)(x-x_1)+\\cdots+c_n\\prod_{j=0}^{n-1}(x-x_j)"}
            </MathBlock>
            <p>
              Forme iniziali: <Math>{"p_0(x)=c_0"}</Math>,{" "}
              <Math>{"p_1(x)=c_0+c_1(x-x_0)"}</Math>,{" "}
              <Math>{"p_2(x)=c_0+c_1(x-x_0)+c_2(x-x_0)(x-x_1)"}</Math>.
            </p>
            <MathBlock>{"c_0=y_0,\\qquad c_1=\\frac{y_1-y_0}{x_1-x_0}"}</MathBlock>
            <MathBlock size="small">
              {"p_n(x)=p_{n-1}(x)+c_n(x-x_0)(x-x_1)\\cdots(x-x_{n-1})"}
            </MathBlock>
          </Column>
          <Column width="half">
            <MathBlock>{"f[x_i]=y_i"}</MathBlock>
            <MathBlock>
              {"f[x_i,x_{i-1}]=\\frac{y_i-y_{i-1}}{x_i-x_{i-1}}"}
            </MathBlock>
            <MathBlock size="small">
              {"f[x_k,x_{k-1},\\ldots,x_0]=\\frac{f[x_k,x_{k-1},\\ldots,x_1]-f[x_{k-1},\\ldots,x_0]}{x_k-x_0}"}
            </MathBlock>
            <Note>
              I coefficienti sono <Math>{"c_0=f[x_0]"}</Math>,{" "}
              <Math>{"c_1=f[x_1,x_0]"}</Math>,{" "}
              <Math>{"c_k=f[x_k,x_{k-1},\\ldots,x_0]"}</Math>. Aggiungendo un
              nodo, i coefficienti gia calcolati non cambiano.
            </Note>
          </Column>
        </Row>
      </Box>

      <Box color="yellow" border="left" title="Esempio Newton">
        <Row>
          <Column width="half">
            <p>
              Con <Math>{"(-2,4),\\ (-1,5),\\ (1,1),\\ (2,8)"}</Math>:
            </p>
            <MathBlock size="small">
              {`\\begin{aligned}
c_0 &= f[x_0]=4 \\\\
c_1 &= f[x_1,x_0]=\\frac{5-4}{-1-(-2)}=1 \\\\
c_2 &= f[x_2,x_1,x_0]
=\\frac{\\frac{1-5}{1-(-1)}-1}{1-(-2)}
=\\frac{-2-1}{3}=-1 \\\\
c_3 &= f[x_3,x_2,x_1,x_0]
=\\frac{\\frac{\\frac{8-1}{2-1}-\\frac{1-5}{1-(-1)}}{2-(-1)}-(-1)}{2-(-2)}
=\\frac{3-(-1)}{4}=1
\\end{aligned}`}
            </MathBlock>
            <MathBlock size="small">
              {"p_3(x)=4+(x+2)-(x+2)(x+1)+(x+2)(x+1)(x-1)"}
            </MathBlock>
            <MathBlock>{"p_3(x)=x^3+x^2-3x+2"}</MathBlock>
          </Column>
          <Column width="half">
            <p>
              Aggiungendo <Math>{"(3,5)"}</Math>:
            </p>
            <MathBlock size="small">
              {`\\begin{aligned}
f[x_4,x_3] &= \\frac{5-8}{3-2}=-3 \\\\
f[x_4,x_3,x_2] &= \\frac{-3-7}{3-1}=-5 \\\\
f[x_4,x_3,x_2,x_1] &= \\frac{-5-3}{3-(-1)}=-2 \\\\
c_4 &= f[x_4,x_3,x_2,x_1,x_0]
=\\frac{-2-1}{3-(-2)}=-\\frac{3}{5}
\\end{aligned}`}
            </MathBlock>
            <MathBlock size="small">
              {"p_4(x)=p_3(x)-\\frac{3}{5}(x+2)(x+1)(x-1)(x-2)"}
            </MathBlock>
            <MathBlock>
              {"p_4(x)=-\\frac{3}{5}x^4+x^3+4x^2-3x-\\frac{2}{5}"}
            </MathBlock>
          </Column>
        </Row>
      </Box>

      <Box color="gray" border="left" title="Vandermonde vs regressione polinomiale">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Aspetto</th>
              <th>Vandermonde / interpolazione</th>
              <th>Regressione polinomiale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Scopo</td>
              <td>Passare esattamente per i punti</td>
              <td>Approssimare l&apos;andamento dei dati</td>
            </tr>
            <tr>
              <td>Errore nei nodi</td>
              <td>Zero, se risolto esattamente</td>
              <td>Non necessariamente zero</td>
            </tr>
            <tr>
              <td>Dati</td>
              <td>Precisi</td>
              <td>Rumorosi</td>
            </tr>
            <tr>
              <td>Grado tipico</td>
              <td>
                <Math>{"n"}</Math> per <Math>{"n+1"}</Math> punti
              </td>
              <td>Scelto in base al problema</td>
            </tr>
            <tr>
              <td>Metodo</td>
              <td>Sistema lineare <Math>{"Va=y"}</Math></td>
              <td>Minimi quadrati</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Section>
  );
}
