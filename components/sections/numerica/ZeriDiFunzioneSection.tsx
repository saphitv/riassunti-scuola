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
  RootFindingVisualizer,
} from "@/components";

export function ZeriDiFunzioneSection() {
  return (
    <Section title="Zeri di Funzione" forceFirstPage>
      <Row>
        <Column width="half">
          <Definition term="Zero di una funzione">
            Uno zero di <Math>{"f"}</Math> è un valore <Math>{"\\xi"}</Math> tale
            che <Math>{"f(\\xi) = 0"}</Math>.
          </Definition>
        </Column>
        <Column width="half">
          <Theorem title="Teorema di Bolzano">
            Se <Math>{"f"}</Math> continua in <Math>{"[a, b]"}</Math> e{" "}
            <Math>{"f(a) \\cdot f(b) < 0"}</Math>, allora{" "}
            <Math>{"\\exists \\xi \\in (a, b): f(\\xi) = 0"}</Math>.
          </Theorem>
        </Column>
      </Row>

      <Box color="yellow" border="left" title="Ordine di convergenza p — Misura della velocità di convergenza">
        <Row>
          <Column width="third">
            <p style={{ marginBottom: "0.5rem", fontSize: "var(--font-size-small)" }}>
              <strong>Definizione:</strong> <Math>{"e_n = x_n - \\xi"}</Math> è l&apos;errore al passo <Math>{"n"}</Math>.
            </p>
            <MathBlock>
              {"\\lim_{n \\to \\infty} \\frac{|e_{n+1}|}{|e_n|^p} = C \\neq 0"}
            </MathBlock>
            <p style={{ marginTop: "0.5rem", fontSize: "var(--font-size-small)" }}>
              <strong>Stima sperimentale di p:</strong>
            </p>
            <MathBlock>
              {"p \\approx \\frac{\\ln|e_{n+1}/e_n|}{\\ln|e_n/e_{n-1}|}"}
            </MathBlock>
            <p style={{ fontSize: "var(--font-size-small)", marginTop: "0.3rem" }}>
              Usando gli incrementi <Math>{"\\delta_n = |x_{n+1} - x_n|"}</Math>:
            </p>
            <MathBlock>
              {"p \\approx \\frac{\\ln(\\delta_{n+1}/\\delta_n)}{\\ln(\\delta_n/\\delta_{n-1})}"}
            </MathBlock>
          </Column>
          <Column width="two-thirds">
            <p style={{ marginBottom: "0.5rem" }}>
              L&apos;ordine di convergenza <Math>{"p"}</Math> descrive <strong>quanto velocemente</strong> l&apos;errore si riduce ad ogni iterazione.
            </p>
            <table className="comparison-table" style={{ fontSize: "var(--font-size-small)" }}>
              <thead>
                <tr>
                  <th>Valore</th>
                  <th>Nome</th>
                  <th>Significato pratico</th>
                  <th>Esempio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Math>{"p = 1"}</Math></td>
                  <td>Lineare</td>
                  <td>Errore si riduce di un <strong>fattore costante</strong> C ad ogni passo</td>
                  <td>Se <Math>{"C = 0.5"}</Math>, guadagno ~1 cifra ogni 3 iterazioni</td>
                </tr>
                <tr>
                  <td><Math>{"p \\approx 1.618"}</Math></td>
                  <td>Superlineare</td>
                  <td>Più veloce del lineare, meno del quadratico</td>
                  <td>Secanti: ~1.6 cifre nuove per iterazione</td>
                </tr>
                <tr>
                  <td><Math>{"p = 2"}</Math></td>
                  <td>Quadratica</td>
                  <td>Le <strong>cifre corrette raddoppiano</strong> ad ogni iterazione</td>
                  <td>Newton: 1→2→4→8→16 cifre corrette</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: "0.5rem" }}>
              <Note>
                <strong>Come si calcola p?</strong> Dalla definizione, prendendo il logaritmo: se <Math>{"|e_{n+1}| \\approx C|e_n|^p"}</Math>, 
                allora <Math>{"\\ln|e_{n+1}| \\approx \\ln C + p \\ln|e_n|"}</Math>. 
                Confrontando due passi consecutivi si elimina C e si ottiene la formula di stima.
                In pratica si usano gli incrementi <Math>{"\\delta_n"}</Math> come approssimazione degli errori.
              </Note>
            </div>
          </Column>
        </Row>
      </Box>

      <Box color="blue" border="left" title="Metodo di Bisezione — Convergenza lineare (p = 1)">
        <Row>
          <Column width="half">
            <MathBlock>{"x_{n+1} = \\frac{a_n + b_n}{2}"}</MathBlock>
            <p>
              Dato <Math>{"[a, b]"}</Math> con <Math>{"f(a) \\cdot f(b) < 0"}</Math>,
              calcola <Math>{"c = \\frac{a+b}{2}"}</Math>.
              Se <Math>{"f(a) \\cdot f(c) < 0"}</Math>: radice in <Math>{"[a, c]"}</Math>,
              altrimenti in <Math>{"[c, b]"}</Math>. Ripeti.
            </p>
            <Note>
              <strong>Errore:</strong> <Math>{"|\\xi - x_n| \\leq \\frac{b-a}{2^{n+1}}"}</Math>.{" "}
              <strong>Pro:</strong> Sempre converge. <strong>Contro:</strong> Lenta.
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def bisezione(f, a, b, tol):
    while (b - a) / 2 > tol:
        c = (a + b) / 2
        if f(a) * f(c) < 0:
            b = c
        else:
            a = c
    return (a + b) / 2`}
            </CodeBlock>
          </Column>
        </Row>
        <RootFindingVisualizer method="bisezione" width={650} height={170} />
      </Box>

      <Box color="green" border="left" title="Metodo delle Secanti — Convergenza superlineare (p ≈ 1.618)">
        <Row>
          <Column width="half">
            <MathBlock>
              {"x_{n+1} = x_n - f(x_n) \\cdot \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}"}
            </MathBlock>
            <p>
              Dati <Math>{"x_0, x_1"}</Math>, traccia la retta secante per{" "}
              <Math>{"(x_0, f(x_0))"}</Math> e <Math>{"(x_1, f(x_1))"}</Math>.
              Il nuovo <Math>{"x_2"}</Math> è l&apos;intersezione con l&apos;asse x.
            </p>
            <Note>
              <strong>Pro:</strong> Non richiede <Math>{"f'(x)"}</Math>.{" "}
              <strong>Contro:</strong> Può divergere se punti iniziali lontani.
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def secanti(f, x0, x1, tol):
    while abs(x1 - x0) > tol:
        fx0, fx1 = f(x0), f(x1)
        x2 = x1 - fx1*(x1-x0)/(fx1-fx0)
        x0, x1 = x1, x2
    return x1`}
            </CodeBlock>
          </Column>
        </Row>
        <RootFindingVisualizer method="secanti" width={650} height={170} />
      </Box>

      <Box color="red" border="left" title="Metodo di Newton — Convergenza quadratica (p = 2)">
        <Row>
          <Column width="half">
            <MathBlock>{"x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}"}</MathBlock>
            <p>
              Dato <Math>{"x_0"}</Math>, traccia la tangente in <Math>{"(x_0, f(x_0))"}</Math>.
              Il nuovo <Math>{"x_1"}</Math> è l&apos;intersezione con l&apos;asse x.
            </p>
            <Note>
              <strong>Requisito:</strong> <Math>{"f'(x) \\neq 0"}</Math>.{" "}
              <strong>Pro:</strong> Molto veloce.{" "}
              <strong>Contro:</strong> Richiede derivata, può divergere.
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def newton(f, df, x0, tol):
    x = x0
    while abs(f(x)) > tol:
        x = x - f(x) / df(x)
    return x`}
            </CodeBlock>
          </Column>
        </Row>
        <RootFindingVisualizer method="newton" width={650} height={220} />
      </Box>

      <Box color="purple" border="left" title="Metodo del Punto Fisso — Convergenza lineare (p = 1)">
        <Row>
          <Column width="half">
            <p style={{ marginBottom: "0.5rem" }}>
              Si riscrive <Math>{"f(x) = 0"}</Math> come <Math>{"x = g(x)"}</Math> e si itera:
            </p>
            <MathBlock>{"x_{n+1} = g(x_n)"}</MathBlock>
            <Theorem title="Condizione di convergenza">
              Se <Math>{"g"}</Math> continua, <Math>{"g([a,b]) \\subseteq [a,b]"}</Math> e{" "}
              <Math>{"|g'(x)| \\leq L < 1"}</Math> per ogni <Math>{"x \\in [a,b]"}</Math>,
              allora esiste un unico punto fisso <Math>{"\\xi"}</Math> e la successione converge.
            </Theorem>
            <Note>
              <strong>Pro:</strong> Semplice, no derivata di <Math>{"f"}</Math>.{" "}
              <strong>Contro:</strong> Serve costruire <Math>{"g"}</Math>, convergenza solo lineare.
            </Note>
          </Column>
          <Column width="half">
            <CodeBlock title="Python" language="python">
              {`def punto_fisso(g, x0, tol, max_iter=100):
    x = x0
    for _ in range(max_iter):
        x_new = g(x)
        if abs(x_new - x) < tol:
            return x_new
        x = x_new
    return x  # max iter raggiunto`}
            </CodeBlock>
            <p style={{ fontSize: "var(--font-size-small)", marginTop: "0.5rem" }}>
              <strong>Esempio:</strong> Per trovare lo zero di <Math>{"f(x) = e^{-x} - x"}</Math>, 
              si itera <Math>{"x_{n+1} = e^{-x_n}"}</Math>. Lo zero <Math>{"\\xi \\approx 0.567"}</Math>.
            </p>
          </Column>
        </Row>
        <RootFindingVisualizer method="punto-fisso" width={650} height={220} />
      </Box>

      <Row>
        <Column width="half">
          <Box color="gray" border="left" title="Confronto dei metodi">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Metodo</th>
                  <th>Ordine p</th>
                  <th>Requisiti</th>
                  <th>Caratteristiche</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bisezione</td>
                  <td>1</td>
                  <td><Math>{"f(a)f(b) < 0"}</Math></td>
                  <td>Sempre converge, lenta</td>
                </tr>
                <tr>
                  <td>Secanti</td>
                  <td>≈ 1.618</td>
                  <td><Math>{"x_0, x_1"}</Math></td>
                  <td>No derivata, può divergere</td>
                </tr>
                <tr>
                  <td>Newton</td>
                  <td>2</td>
                  <td><Math>{"f'(x)"}</Math></td>
                  <td>Molto veloce, può divergere</td>
                </tr>
                <tr>
                  <td>Punto fisso</td>
                  <td>1</td>
                  <td><Math>{"|g'(x)| < 1"}</Math></td>
                  <td>Semplice, convergenza lenta</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Criteri di arresto">
            <p>L&apos;algoritmo si arresta quando:</p>
            <MathBlock>
              {`\\begin{aligned}
|x_{n+1} - x_n| &< \\varepsilon \\quad \\text{(incremento)} \\\\
|f(x_n)| &< \\varepsilon \\quad \\text{(residuo)} \\\\
n &> N_{\\max} \\quad \\text{(max iterazioni)}
\\end{aligned}`}
            </MathBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
