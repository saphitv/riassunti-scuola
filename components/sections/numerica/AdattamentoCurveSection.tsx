import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
  Definition,
} from "@/components/index";

export function AdattamentoCurveSection() {
  return (
    <Section title="Adattamento delle Curve" forceFirstPage>
      <Row>
        <Column width="half">
          <Definition term="Regressione vs interpolazione">
            L&apos;adattamento delle curve serve per stimare valori intermedi o
            semplificare una funzione complessa usando valori discreti.
          </Definition>
        </Column>
        <Column width="half">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Caso</th>
                <th>Metodo</th>
                <th>Idea</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dati rumorosi</td>
                <td>Regressione</td>
                <td>Segue l&apos;andamento generale, senza passare per tutti i punti.</td>
              </tr>
              <tr>
                <td>Dati precisi</td>
                <td>Interpolazione</td>
                <td>Passa esattamente per tutti i punti dati.</td>
              </tr>
            </tbody>
          </table>
        </Column>
      </Row>

      <Box color="blue" border="left" title="Regressione lineare con minimi quadrati">
        <Row>
          <Column width="half">
            <MathBlock>{"y = a_0 + a_1x + e"}</MathBlock>
            <p>
              <Math>{"a_0"}</Math> e l&apos;intercetta, <Math>{"a_1"}</Math> la
              pendenza, <Math>{"e"}</Math> il residuo. Per ogni punto:
            </p>
            <MathBlock>{"e_i = y_i - a_0 - a_1x_i"}</MathBlock>
            <MathBlock>
              {"S_r = \\sum_{i=1}^{n} e_i^2 = \\sum_{i=1}^{n}(y_i-a_0-a_1x_i)^2"}
            </MathBlock>
          </Column>
          <Column width="half">
            <p>La retta migliore minimizza la somma dei quadrati dei residui.</p>
            <MathBlock>
              {"a_1 = \\frac{n\\sum x_iy_i - \\sum x_i\\sum y_i}{n\\sum x_i^2 - (\\sum x_i)^2}"}
            </MathBlock>
            <MathBlock>{"a_0 = \\bar y - a_1\\bar x"}</MathBlock>
            <MathBlock>
              {"\\begin{cases} na_0 + a_1\\sum x_i = \\sum y_i \\\\ a_0\\sum x_i + a_1\\sum x_i^2 = \\sum x_iy_i \\end{cases}"}
            </MathBlock>
            <Note>
              Esempio: <Math>{"p(x)=0.83928571x+0.07142857"}</Math>, quindi{" "}
              <Math>{"a_1=0.83928571"}</Math> e <Math>{"a_0=0.07142857"}</Math>.
            </Note>
          </Column>
        </Row>
      </Box>

      <Box color="green" border="left" title="Regressione polinomiale">
        <Row>
          <Column width="half">
            <MathBlock>
              {"y = a_nx^n + a_{n-1}x^{n-1} + \\cdots + a_1x + a_0"}
            </MathBlock>
            <p>
              Si applicano ancora i minimi quadrati, ma il modello e un
              polinomio invece di una retta.
            </p>
          </Column>
          <Column width="half">
            <Note>
              Un grado maggiore aumenta la flessibilita, ma non va scelto
              automaticamente: prima si guarda il grafico dei dati e poi si
              sceglie il modello adatto al problema.
            </Note>
          </Column>
        </Row>
      </Box>

      <Box color="purple" border="left" title="Linearizzazione di modelli non lineari">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Modello</th>
              <th>Trasformazione lineare</th>
              <th>Parametri</th>
              <th>Condizioni</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Math>{"y=\\alpha_1e^{\\beta_1x}"}</Math>
              </td>
              <td>
                <Math>{"Y=\\ln y=A+Bx"}</Math>
              </td>
              <td>
                <Math>{"\\beta_1=B,\\ \\alpha_1=e^A"}</Math>
              </td>
              <td>
                <Math>{"y>0"}</Math>
              </td>
            </tr>
            <tr>
              <td>
                <Math>{"y=\\alpha_2x^{\\beta_2}"}</Math>
              </td>
              <td>
                <Math>{"Y=\\log y=A+B\\log x"}</Math>
              </td>
              <td>
                <Math>{"\\beta_2=B,\\ \\alpha_2=10^A"}</Math> con{" "}
                <Math>{"\\log_{10}"}</Math>
              </td>
              <td>
                <Math>{"x>0,\\ y>0"}</Math>
              </td>
            </tr>
            <tr>
              <td>
                <Math>{"y=\\alpha_3\\frac{x}{\\beta_3+x}"}</Math>
              </td>
              <td>
                <Math>{"Y=\\frac{1}{y}=A+B\\frac{1}{x}"}</Math>
              </td>
              <td>
                <Math>{"\\alpha_3=\\frac{1}{A},\\ \\beta_3=\\frac{B}{A}"}</Math>
              </td>
              <td>
                <Math>{"x\\neq0,\\ y\\neq0"}</Math>
              </td>
            </tr>
          </tbody>
        </table>
        <Row>
          <Column width="half">
            <Note>
              Esponenziale: se <Math>{"\\beta_1>0"}</Math> cresce, se{" "}
              <Math>{"\\beta_1<0"}</Math> decresce.
            </Note>
          </Column>
          <Column width="half">
            <Note>
              Potenza, esempio: <Math>{"\\log(y)=1.75\\log(x)-0.300"}</Math>{" "}
              implica <Math>{"\\alpha_2=10^{-0.300}=0.501"}</Math>, quindi{" "}
              <Math>{"y=0.501x^{1.75}"}</Math>.
            </Note>
          </Column>
        </Row>
      </Box>
    </Section>
  );
}
