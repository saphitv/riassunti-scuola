import {
  Box,
  Column,
  Example,
  Math,
  MathBlock,
  Note,
  Row,
  Section,
} from "@/components/index";

export function TrasformataFourierSection() {
  return (
    <Section title="Trasformata di Fourier ed energia in banda" allowPageBreak>
      <Row gap="sm">
        <Column width="half">
          <Box color="blue" border="left" title="Convenzione">
            <p>
              La trasformata di Fourier descrive quanto segnale c&apos;e a ogni
              pulsazione <Math>{"\\omega"}</Math>. Con questa convenzione:
            </p>
            <MathBlock gap="sm" size="small">
              {`X(\\omega)=\\mathcal{F}\\{x(t)\\}
=\\int_{-\\infty}^{+\\infty}x(t)e^{-j\\omega t}\\,dt`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`x(t)=\\frac{1}{2\\pi}\\int_{-\\infty}^{+\\infty}
X(\\omega)e^{j\\omega t}\\,d\\omega`}
            </MathBlock>
            <Note>
              Se l&apos;esercizio usa la frequenza <Math>{"f"}</Math> invece di{" "}
              <Math>{"\\omega"}</Math>, cambia solo la costante di Parseval.
              Nel rapporto tra energie la costante si cancella.
            </Note>
          </Box>
        </Column>

        <Column width="half">
          <Box color="green" border="left" title="Parseval">
            <p>
              L&apos;energia totale puo essere calcolata nel tempo oppure in
              frequenza:
            </p>
            <MathBlock gap="sm">
              {`E=\\int_{-\\infty}^{+\\infty}|x(t)|^2\\,dt
=\\frac{1}{2\\pi}\\int_{-\\infty}^{+\\infty}|X(\\omega)|^2\\,d\\omega`}
            </MathBlock>
            <p>
              Per una banda <Math>{"B"}</Math>, l&apos;energia nella banda e:
            </p>
            <MathBlock gap="sm">
              {`E_B=\\frac{1}{2\\pi}\\int_B |X(\\omega)|^2\\,d\\omega`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <Box color="yellow" border="left" title="Frazione di energia in una banda">
        <Row gap="sm">
          <Column width="half">
            <p>
              La domanda tipica chiede quale percentuale dell&apos;energia totale cade
              in una certa banda. Si usa direttamente lo spettro:
            </p>
            <MathBlock gap="sm" size="small">
              {`\\boxed{
\\rho_B=\\frac{E_B}{E}
=\\frac{\\int_B |X(\\omega)|^2\\,d\\omega}
{\\int_{-\\infty}^{+\\infty}|X(\\omega)|^2\\,d\\omega}
}`}
            </MathBlock>
          </Column>
          <Column width="half">
            <p>
              Per la banda simmetrica <Math>{"[-\\Omega,\\Omega]"}</Math>:
            </p>
            <MathBlock gap="sm" size="small">
              {`\\rho(\\Omega)=
\\frac{\\int_{-\\Omega}^{\\Omega}|X(\\omega)|^2\\,d\\omega}
{\\int_{-\\infty}^{+\\infty}|X(\\omega)|^2\\,d\\omega}`}
            </MathBlock>
            <Note>
              Il fattore <Math>{"1/(2\\pi)"}</Math> non va messo nel rapporto:
              compare sia sopra sia sotto.
            </Note>
          </Column>
        </Row>
      </Box>

      <Row gap="sm">
        <Column width="half">
          <Box color="purple" border="left" title="Procedura d'esame">
            <ol>
              <li>
                Trova o scrivi <Math>{"X(\\omega)"}</Math>.
              </li>
              <li>
                Calcola <Math>{"|X(\\omega)|^2"}</Math>.
              </li>
              <li>
                Integra <Math>{"|X(\\omega)|^2"}</Math> nella banda richiesta.
              </li>
              <li>
                Integra <Math>{"|X(\\omega)|^2"}</Math> su tutto{" "}
                <Math>{"\\mathbb{R}"}</Math>.
              </li>
              <li>
                Fai il rapporto e, se richiesto, moltiplica per{" "}
                <Math>{"100"}</Math>.
              </li>
            </ol>
          </Box>
        </Column>

        <Column width="half">
          <Box color="gray" border="left" title="Bande comuni">
            <p>Banda passa-basso ideale:</p>
            <MathBlock gap="sm" size="small">
              {`B=[-\\Omega,\\Omega]`}
            </MathBlock>
            <p>Banda tra due pulsazioni positive, considerando anche la parte negativa:</p>
            <MathBlock gap="sm" size="small">
              {`B=[-\\Omega_2,-\\Omega_1]\\cup[\\Omega_1,\\Omega_2]`}
            </MathBlock>
            <p>Se <Math>{"|X(\\omega)|^2"}</Math> e pari, dimezza il lavoro:</p>
            <MathBlock gap="sm" size="small">
              {`\\int_{-\\Omega}^{\\Omega}|X(\\omega)|^2\\,d\\omega
=2\\int_0^{\\Omega}|X(\\omega)|^2\\,d\\omega`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <Example title="Esempio 1: spettro noto" color="green">
        <Row gap="sm">
          <Column width="half">
            <p>
              Sia <Math>{"x(t)=e^{-|t|}"}</Math>. La sua trasformata e:
            </p>
            <MathBlock gap="sm">
              {`X(\\omega)=\\frac{2}{1+\\omega^2}`}
            </MathBlock>
            <p>
              Trova la frazione di energia nella banda{" "}
              <Math>{"[-\\Omega,\\Omega]"}</Math>. Prima eleva al quadrato:
            </p>
            <MathBlock gap="sm">
              {`|X(\\omega)|^2=\\frac{4}{(1+\\omega^2)^2}`}
            </MathBlock>
            <p>La costante <Math>{"4"}</Math> si cancella nel rapporto.</p>
          </Column>

          <Column width="half">
            <p>Usa la primitiva:</p>
            <MathBlock gap="sm" size="small">
              {`\\int \\frac{1}{(1+\\omega^2)^2}\\,d\\omega
=\\frac{\\omega}{2(1+\\omega^2)}+\\frac12\\arctan(\\omega)`}
            </MathBlock>
            <MathBlock gap="sm" size="small">
              {`\\int_{-\\Omega}^{\\Omega}\\frac{1}{(1+\\omega^2)^2}\\,d\\omega
=\\frac{\\Omega}{1+\\Omega^2}+\\arctan(\\Omega)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\int_{-\\infty}^{+\\infty}\\frac{1}{(1+\\omega^2)^2}\\,d\\omega
=\\frac{\\pi}{2}`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\boxed{\\rho(\\Omega)=\\frac{2}{\\pi}
\\left(\\arctan(\\Omega)+\\frac{\\Omega}{1+\\Omega^2}\\right)}`}
            </MathBlock>
          </Column>
        </Row>
      </Example>

      <Example title="Esempio 2: banda assegnata" color="blue">
        <Row gap="sm">
          <Column width="half">
            <p>
              Per lo stesso segnale, calcola la percentuale di energia in{" "}
              <Math>{"[-1,1]"}</Math>. Metti <Math>{"\\Omega=1"}</Math>:
            </p>
            <MathBlock gap="sm">
              {`\\rho(1)=\\frac{2}{\\pi}
\\left(\\arctan(1)+\\frac{1}{2}\\right)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\rho(1)=\\frac{2}{\\pi}
\\left(\\frac{\\pi}{4}+\\frac12\\right)
=\\frac12+\\frac{1}{\\pi}`}
            </MathBlock>
          </Column>

          <Column width="half">
            <p>Quindi:</p>
            <MathBlock gap="sm">
              {`\\boxed{\\rho(1)\\approx 0.818}`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\boxed{\\text{energia in }[-1,1]\\approx 81.8\\%}`}
            </MathBlock>
            <Note>
              Un risultato tra <Math>{"0"}</Math> e <Math>{"1"}</Math> e un
              controllo immediato. Se supera <Math>{"1"}</Math>, hai perso una
              costante, una simmetria o il denominatore totale.
            </Note>
          </Column>
        </Row>
      </Example>
    </Section>
  );
}
