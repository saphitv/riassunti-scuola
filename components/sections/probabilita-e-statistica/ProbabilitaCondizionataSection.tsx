import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Example,
} from "@/components/index";

export function ProbabilitaCondizionataSection() {
  return (
    <Section title="Parte II - Strategie per esercizi" allowPageBreak>
      <Box color="blue" border="left" title="1. Probabilita totale e Bayes">
        <ol>
          <li>
            Identifica la partizione <Math>{"F_1,\\ldots,F_n"}</Math> e le
            probabilita <Math>{"P(F_j)"}</Math>.
          </li>
          <li>
            Identifica l&apos;attributo osservato <Math>{"E"}</Math> e le
            condizionate <Math>{"P(E\\mid F_j)"}</Math>.
          </li>
          <li>
            Calcola l&apos;attributo con la probabilita totale:
            <Math>{"P(E)=\\sum_j P(E\\mid F_j)P(F_j)"}</Math>.
          </li>
          <li>
            Se il testo chiede &quot;categoria sapendo attributo&quot;, usa Bayes.
            Se chiede &quot;non ha l&apos;attributo&quot;, lavora con{" "}
            <Math>{"\\overline E"}</Math>.
          </li>
        </ol>
        <MathBlock gap="sm">
          {`P(F_j\\mid E)=\\frac{P(E\\mid F_j)P(F_j)}{P(E)},\\qquad P(\\overline E\\mid F_j)=1-P(E\\mid F_j)`}
        </MathBlock>
      </Box>

      <Row>
        <Column width="half">
          <Box color="green" border="left" title="2. Variabile discreta da tabella">
            <ol>
              <li>
                Parole come &quot;meno di&quot;, &quot;almeno&quot;, &quot;tra&quot;:
                somma solo le probabilita dei valori ammessi.
              </li>
              <li>
                Per media e varianza calcola prima <Math>{"E[X]"}</Math>, poi{" "}
                <Math>{"E[X^2]"}</Math>.
              </li>
              <li>
                Eventi ripetuti e indipendenti: moltiplica le probabilita o usa
                la binomiale.
              </li>
              <li>
                Somma su piu giorni/prove: elenca le combinazioni che rispettano
                la soglia e conta quante disposizioni hanno.
              </li>
            </ol>
          </Box>
        </Column>
        <Column width="half">
          <Example title="Schema tabella" color="green" border="left">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Richiesta</th>
                  <th>Cosa fare</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Math>{"P(X<2)"}</Math>
                  </td>
                  <td>
                    Somma <Math>{"P(0)+P(1)"}</Math>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Math>{"E[X]"}</Math>
                  </td>
                  <td>
                    Somma <Math>{"x_iP(X=x_i)"}</Math>
                  </td>
                </tr>
                <tr>
                  <td>
                    Tutti successi in <Math>{"k"}</Math> prove
                  </td>
                  <td>
                    Usa <Math>{"p^k"}</Math>
                  </td>
                </tr>
                <tr>
                  <td>
                    Almeno <Math>{"m"}</Math> successi
                  </td>
                  <td>
                    Usa <Math>{"\\sum_{r=m}^n \\binom nr p^r(1-p)^{n-r}"}</Math>
                  </td>
                </tr>
              </tbody>
            </table>
          </Example>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="3. Densita continua">
            <ol>
              <li>
                Parametri incogniti: imponi{" "}
                <Math>{"\\int f(x)\\,dx=1"}</Math> e gli eventuali momenti dati.
              </li>
              <li>
                Verifica densita: mostra <Math>{"f(x)\\ge0"}</Math> sul dominio e
                integrale totale uguale a 1.
              </li>
              <li>
                Probabilita: costruisci <Math>{"F(x)"}</Math> e usa differenze
                come <Math>{"P(a<X<b)=F(b)-F(a)"}</Math>.
              </li>
              <li>
                Condizionata con eventi inclusi: se <Math>{"c<d"}</Math>,{" "}
                <Math>{"P(X\\le c\\mid X\\le d)=F(c)/F(d)"}</Math>.
              </li>
            </ol>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="4. Normale">
            <ol>
              <li>
                Standardizza sempre:{" "}
                <Math>{"z=(x-\\mu)/\\sigma"}</Math>.
              </li>
              <li>
                Per code destre: <Math>{"P(X>x)=1-\\Phi(z)"}</Math>.
              </li>
              <li>
                Somme e differenze di normali indipendenti restano normali:
                somma le medie con il segno, somma sempre le varianze.
              </li>
              <li>
                &quot;Almeno <Math>{"m"}</Math> giorni su{" "}
                <Math>{"n"}</Math>&quot;: prima trovi{" "}
                <Math>{"p"}</Math> con la normale, poi usi{" "}
                <Math>{"B(n,p)"}</Math>.
              </li>
            </ol>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="red" border="left" title="5. Esponenziale">
            <ol>
              <li>
                Se il testo parla di tempo/durata/attesa con parametro{" "}
                <Math>{"\\lambda"}</Math>, parti dalla coda{" "}
                <Math>{"P(X>x)=e^{-\\lambda x}"}</Math>.
              </li>
              <li>
                Assenza di memoria:
                <Math>{"P(X>s+t\\mid X>t)=P(X>s)"}</Math>.
              </li>
              <li>
                Piu prove indipendenti: trasforma ogni prova in successo con
                probabilita <Math>{"p"}</Math>, poi binomiale.
              </li>
              <li>
                Soglie su <Math>{"\\lambda"}</Math>: scrivi la disequazione e
                controlla il verso usando la monotonia.
              </li>
            </ol>
          </Box>
        </Column>
        <Column width="half">
          <Box color="gray" border="left" title="6. Intervalli di confidenza">
            <ol>
              <li>
                Dal solo intervallo, la media campionaria e il centro.
              </li>
              <li>
                La semiampiezza e{" "}
                <Math>{"q_{1-\\alpha/2}\\sigma/\\sqrt n"}</Math>.
              </li>
              <li>
                Per trovare <Math>{"n"}</Math>, uguaglia la semiampiezza nota o
                imponi la precisione richiesta.
              </li>
              <li>
                Se <Math>{"\\sigma"}</Math> e ignota e hai i momenti:{" "}
                <Math>{"\\widehat\\sigma^2=m_2-m_1^2"}</Math>.
              </li>
            </ol>
            <MathBlock gap="sm">
              {`\\left[\\widehat\\mu_n-q_{1-\\alpha/2}\\frac{\\sigma}{\\sqrt n},\\ \\widehat\\mu_n+q_{1-\\alpha/2}\\frac{\\sigma}{\\sqrt n}\\right]`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

    </Section>
  );
}
