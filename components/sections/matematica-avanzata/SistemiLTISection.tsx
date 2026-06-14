import {
  Box,
  Column,
  Definition,
  Example,
  Math,
  MathBlock,
  Note,
  Row,
  Section,
} from "@/components/index";

export function SistemiLTISection() {
  return (
    <Section title="Sistemi lineari tempo-invarianti (LTI)" allowPageBreak>
      <Row gap="sm">
        <Column width="half">
          <Box color="blue" border="left" title="Idea e modello">
            <Definition term="Sistema LTI">
              Un sistema e lineare se vale la sovrapposizione degli effetti, ed
              e tempo-invariante se le matrici che lo descrivono non dipendono
              dal tempo.
            </Definition>
            <MathBlock gap="sm">
              {`\\dot{\\mathbf{x}}(t)=A\\mathbf{x}(t)+B\\mathbf{u}(t)
\\qquad
\\mathbf{y}(t)=C\\mathbf{x}(t)+D\\mathbf{u}(t)`}
            </MathBlock>
            <ul>
              <li>
                <Math>{"\\mathbf{x}"}</Math>: stato interno del sistema.
              </li>
              <li>
                <Math>{"\\mathbf{u}"}</Math>: ingresso applicato.
              </li>
              <li>
                <Math>{"\\mathbf{y}"}</Math>: uscita osservata.
              </li>
            </ul>
          </Box>
        </Column>
        <Column width="half">
          <Box color="gray" border="left" title="Dimensioni">
            <p>
              Se lo stato ha dimensione <Math>{"n"}</Math>, gli ingressi sono{" "}
              <Math>{"m"}</Math> e le uscite sono <Math>{"p"}</Math>, allora:
            </p>
            <MathBlock gap="sm">
              {`A\\in\\mathbb{R}^{n\\times n}
\\qquad
B\\in\\mathbb{R}^{n\\times m}
\\qquad
C\\in\\mathbb{R}^{p\\times n}
\\qquad
D\\in\\mathbb{R}^{p\\times m}`}
            </MathBlock>
            <Note>
              Controllare le dimensioni evita molti errori:{" "}
              <Math>{"A\\mathbf{x}"}</Math> e <Math>{"B\\mathbf{u}"}</Math>{" "}
              devono produrre entrambi un vettore in{" "}
              <Math>{"\\mathbb{R}^n"}</Math>.
            </Note>
          </Box>
        </Column>
      </Row>

      <Row gap="sm">
        <Column width="half">
          <Box color="green" border="left" title="Risposta nel tempo">
            <p>
              Con condizione iniziale{" "}
              <Math>{"\\mathbf{x}(t_0)=\\mathbf{x}_0"}</Math>, la soluzione si
              ottiene con l&apos;esponenziale di matrice:
            </p>
            <MathBlock gap="sm" size="small">
              {`\\mathbf{x}(t)
=e^{A(t-t_0)}\\mathbf{x}_0
+\\int_{t_0}^{t}e^{A(t-\\tau)}B\\mathbf{u}(\\tau)\\,d\\tau`}
            </MathBlock>
            <ul>
              <li>
                Risposta libera:{" "}
                <Math>{"e^{A(t-t_0)}\\mathbf{x}_0"}</Math>.
              </li>
              <li>
                Risposta forzata: integrale dovuto a{" "}
                <Math>{"\\mathbf{u}(t)"}</Math>.
              </li>
            </ul>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="Collegamento con Laplace">
            <p>
              Con <Math>{"t_0=0"}</Math> e condizioni iniziali nulle, applicare
              Laplace al modello di stato trasforma le derivate in prodotti per{" "}
              <Math>{"s"}</Math>:
            </p>
            <MathBlock gap="sm" size="small">
              {`sX(s)=AX(s)+BU(s)
\\qquad
Y(s)=CX(s)+DU(s)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`X(s)=(sI-A)^{-1}BU(s)`}
            </MathBlock>
            <p>
              Per questo la trasformata di Laplace e il linguaggio naturale per
              passare da stato a ingresso-uscita.
            </p>
          </Box>
        </Column>
      </Row>

      <Row gap="sm">
        <Column width="half">
          <Box color="blue" border="left" title="Funzione di trasferimento">
            <Definition term="Funzione di trasferimento">
              Con condizioni iniziali nulle, descrive il rapporto tra uscita e
              ingresso nel dominio di Laplace.
            </Definition>
            <MathBlock gap="sm">
              {`G(s)=\\frac{Y(s)}{U(s)}
=C(sI-A)^{-1}B+D`}
            </MathBlock>
            <Note>
              La formula sopra e scalare nei sistemi SISO. Nei sistemi MIMO{" "}
              <Math>{"G(s)"}</Math> e una matrice di trasferimento{" "}
              <Math>{"p\\times m"}</Math>.
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Procedura pratica">
            <ol>
              <li>
                Scrivi il sistema nella forma{" "}
                <Math>{"\\dot{x}=Ax+Bu,\\ y=Cx+Du"}</Math>.
              </li>
              <li>
                Calcola <Math>{"sI-A"}</Math>.
              </li>
              <li>
                Trova <Math>{"(sI-A)^{-1}"}</Math>.
              </li>
              <li>
                Moltiplica nell&apos;ordine{" "}
                <Math>{"C(sI-A)^{-1}B"}</Math>.
              </li>
              <li>
                Somma il termine diretto <Math>{"D"}</Math>, se presente.
              </li>
            </ol>
          </Box>
        </Column>
      </Row>

      <Row gap="sm">
        <Column width="half">
          <Box color="green" border="left" title="Poli e stabilita">
            <p>
              I poli del sistema sono legati agli zeri del denominatore di{" "}
              <Math>{"G(s)"}</Math>. Dal modello di stato si leggono da:
            </p>
            <MathBlock gap="sm">
              {`\\det(sI-A)=0`}
            </MathBlock>
            <p>
              Questi valori coincidono con gli autovalori di{" "}
              <Math>{"A"}</Math>, salvo cancellazioni nella funzione di
              trasferimento.
            </p>
            <Note>
              In tempo continuo, il sistema libero e asintoticamente stabile se
              tutti gli autovalori di <Math>{"A"}</Math> hanno parte reale
              negativa.
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Errori comuni">
            <ul>
              <li>
                Usare <Math>{"G(s)"}</Math> senza condizioni iniziali nulle.
              </li>
              <li>
                Confondere i poli con gli zeri: i poli vengono dal
                denominatore, gli zeri dal numeratore.
              </li>
              <li>
                Dimenticare il termine diretto <Math>{"D"}</Math>.
              </li>
              <li>
                Moltiplicare le matrici nell&apos;ordine sbagliato.
              </li>
            </ul>
          </Box>
        </Column>
      </Row>

      <Example title="Esempio SISO" color="blue">
        <Row>
          <Column width="half">
            <p>Considera il sistema:</p>
            <MathBlock gap="sm">
              {`\\dot{x}=-2x+u
\\qquad
y=3x`}
            </MathBlock>
            <p>
              Qui <Math>{"A=-2"}</Math>, <Math>{"B=1"}</Math>,{" "}
              <Math>{"C=3"}</Math>, <Math>{"D=0"}</Math>.
            </p>
          </Column>
          <Column width="half">
            <p>La funzione di trasferimento e:</p>
            <MathBlock gap="sm">
              {`G(s)=C(sI-A)^{-1}B+D
=3\\frac{1}{s+2}\\cdot1
=\\frac{3}{s+2}`}
            </MathBlock>
            <p>
              Il polo e <Math>{"s=-2"}</Math>, quindi la risposta libera decade
              esponenzialmente.
            </p>
          </Column>
        </Row>
      </Example>
    </Section>
  );
}
