import { Section, Row, Column, Box } from "@/components";

export function DocumentationIndexSection() {
  return (
    <Section title="Indice rapido documentazione">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Datasheet">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Argomento</th>
                  <th>Pagina</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pin tables</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>I/O ports</td>
                  <td>137</td>
                </tr>
                <tr>
                  <td>Timer 1</td>
                  <td>167</td>
                </tr>
                <tr>
                  <td>Timer 2-5</td>
                  <td>171</td>
                </tr>
                <tr>
                  <td>UART</td>
                  <td>205</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>

        <Column width="half">
          <Box color="green" border="left" title="Reference Manual">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Argomento</th>
                  <th>Pagina</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>I/O ports</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>Timers</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td>UART</td>
                  <td>21</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
