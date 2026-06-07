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

export function SplineSection() {
  return (
    <Section title="Spline" allowPageBreak>
      <Row>
        <Column width="half">
          <Definition term="Approccio spline">
            Una spline costruisce una funzione a tratti: su ogni intervallo{" "}
            <Math>{"[x_i,x_{i+1}]"}</Math> usa un polinomio{" "}
            <Math>{"f_i"}</Math> di grado fissato e impone{" "}
            <Math>{"f(x_i)=y_i"}</Math>.
          </Definition>
        </Column>
        <Column width="half">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Continuita imposta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lineare</td>
                <td>Continua, ma puo avere angoli</td>
              </tr>
              <tr>
                <td>Quadratica</td>
                <td>Derivata prima continua</td>
              </tr>
              <tr>
                <td>Cubica</td>
                <td>Derivata prima e seconda continue</td>
              </tr>
            </tbody>
          </table>
        </Column>
      </Row>

      <Box color="gray" border="left" title="Conteggio dei parametri">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Spline</th>
              <th>Parametri</th>
              <th>Vincoli</th>
              <th>Liberta residua</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lineare</td>
              <td>
                <Math>{"2n"}</Math>
              </td>
              <td>
                <Math>{"2n"}</Math> passaggi per i punti
              </td>
              <td>
                <Math>{"0"}</Math>
              </td>
            </tr>
            <tr>
              <td>Quadratica</td>
              <td>
                <Math>{"3n"}</Math>
              </td>
              <td>
                <Math>{"2n+(n-1)"}</Math>
              </td>
              <td>
                <Math>{"1"}</Math> parametro libero
              </td>
            </tr>
            <tr>
              <td>Cubica</td>
              <td>
                <Math>{"4n"}</Math>
              </td>
              <td>
                <Math>{"2n+2(n-1)"}</Math>
              </td>
              <td>
                <Math>{"2"}</Math> parametri liberi
              </td>
            </tr>
          </tbody>
        </table>
        <Note>
          Per la spline cubica naturale si fissano di solito{" "}
          <Math>{"z_0=0"}</Math> e <Math>{"z_n=0"}</Math>.
        </Note>
      </Box>

      <Box color="green" border="left" title="Spline quadratica">
        <Row>
          <Column width="half">
            <p>
              Si definisce <Math>{"z_i=f'(x_i)"}</Math>. La derivata della
              spline quadratica e lineare:
            </p>
            <MathBlock size="small">
              {"f_i'(x)=\\frac{z_{i+1}-z_i}{x_{i+1}-x_i}(x-x_i)+z_i"}
            </MathBlock>
            <MathBlock size="small">
              {"f_i(x)=\\frac{z_{i+1}-z_i}{2(x_{i+1}-x_i)}(x-x_i)^2+z_i(x-x_i)+y_i"}
            </MathBlock>
          </Column>
          <Column width="half">
            <MathBlock>
              {"z_{i+1}=-z_i+2\\frac{y_{i+1}-y_i}{x_{i+1}-x_i}"}
            </MathBlock>
            <ol>
              <li>Si sceglie <Math>{"z_0"}</Math>.</li>
              <li>Si calcolano <Math>{"z_1,z_2,\\ldots,z_n"}</Math> con la ricorrenza.</li>
              <li>Si costruisce ogni parabola <Math>{"f_i(x)"}</Math>.</li>
            </ol>
          </Column>
        </Row>
      </Box>

      <Box color="purple" border="left" title="Spline cubica">
        <Row>
          <Column width="half">
            <p>
              Si definisce <Math>{"z_i=f''(x_i)"}</Math> e{" "}
              <Math>{"h_i=x_{i+1}-x_i"}</Math>. Su ogni intervallo:
            </p>
            <MathBlock size="small">
              {"f_i''(x)=\\frac{z_{i+1}}{h_i}(x-x_i)+\\frac{z_i}{h_i}(x_{i+1}-x)"}
            </MathBlock>
            <MathBlock size="small">
              {"h_{i-1}z_{i-1}+2(h_{i-1}+h_i)z_i+h_iz_{i+1}=6\\left(\\frac{y_{i+1}-y_i}{h_i}-\\frac{y_i-y_{i-1}}{h_{i-1}}\\right)"}
            </MathBlock>
            <p>
              per <Math>{"i=1,\\ldots,n-1"}</Math>, con condizioni naturali{" "}
              <Math>{"z_0=z_n=0"}</Math>.
            </p>
          </Column>
          <Column width="half">
            <MathBlock size="small">
              {"f_i(x)=\\frac{z_{i+1}(x-x_i)^3+z_i(x_{i+1}-x)^3}{6h_i}+\\left(\\frac{y_{i+1}}{h_i}-\\frac{h_i}{6}z_{i+1}\\right)(x-x_i)+\\left(\\frac{y_i}{h_i}-\\frac{h_i}{6}z_i\\right)(x_{i+1}-x)"}
            </MathBlock>
            <Note>
              Caso equidistante con <Math>{"h_i=h=1"}</Math>:{" "}
              <Math>{"z_{i-1}+4z_i+z_{i+1}=6(y_{i+1}-2y_i+y_{i-1})"}</Math>.
            </Note>
          </Column>
        </Row>
      </Box>
    </Section>
  );
}
