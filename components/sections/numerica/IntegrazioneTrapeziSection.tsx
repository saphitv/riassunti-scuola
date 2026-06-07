import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
} from "@/components/index";

export function IntegrazioneTrapeziSection() {
  return (
    <Section title="Integrazione Numerica" allowPageBreak>
      <Box color="blue" border="left" title="Metodo dei trapezi">
        <Row>
          <Column width="half">
            <p>
              Approssima l&apos;integrale sommando i trapezi tra punti
              consecutivi. Tra <Math>{"x_j"}</Math> e <Math>{"x_{j+1}"}</Math>:
            </p>
            <MathBlock>
              {"A_{\\text{trapez}}=\\frac{f(x_j)+f(x_{j+1})}{2}(x_{j+1}-x_j)"}
            </MathBlock>
            <MathBlock size="small">
              {"\\int_{x_0}^{x_n} f(x)\\,dx \\approx \\sum_{j=0}^{n-1}\\frac{f(x_j)+f(x_{j+1})}{2}(x_{j+1}-x_j)"}
            </MathBlock>
          </Column>
          <Column width="half">
            <p>
              Se i punti sono equidistanti con passo{" "}
              <Math>{"h=\\frac{x_n-x_0}{n}"}</Math>:
            </p>
            <MathBlock size="small">
              {"\\int_{x_0}^{x_n} f(x)\\,dx \\approx \\frac{h}{2}\\left[f(x_0)+2\\sum_{j=1}^{n-1}f(x_j)+f(x_n)\\right]"}
            </MathBlock>
            <Note>
              Si usa quando sono disponibili valori discreti della funzione e
              si vuole approssimare l&apos;area sotto la curva.
            </Note>
          </Column>
        </Row>
      </Box>

      <Box color="yellow" border="left" title="Mini-tabella decisionale per l'esame">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Situazione</th>
              <th>Metodo da usare</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dati rumorosi, trend generale</td>
              <td>Regressione lineare / polinomiale</td>
            </tr>
            <tr>
              <td>Dati precisi, passaggio per tutti i punti</td>
              <td>Interpolazione</td>
            </tr>
            <tr>
              <td>
                <Math>{"n+1"}</Math> punti, polinomio unico di grado{" "}
                <Math>{"n"}</Math>
              </td>
              <td>Vandermonde o Newton</td>
            </tr>
            <tr>
              <td>Aggiungere nuovi punti facilmente</td>
              <td>Newton / differenze divise</td>
            </tr>
            <tr>
              <td>Evitare un unico polinomio di grado alto</td>
              <td>Spline</td>
            </tr>
            <tr>
              <td>Funzione continua ma semplice</td>
              <td>Spline lineare</td>
            </tr>
            <tr>
              <td>Derivata prima continua</td>
              <td>Spline quadratica</td>
            </tr>
            <tr>
              <td>Derivata prima e seconda continue</td>
              <td>Spline cubica</td>
            </tr>
            <tr>
              <td>Approssimare un integrale da punti discreti</td>
              <td>Metodo dei trapezi</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Section>
  );
}
