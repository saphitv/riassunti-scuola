import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
} from "@/components/index";

export function FondamentiProbabilitaSection() {
  return (
    <Section title="Parte I - Richiami di teoria" forceFirstPage allowPageBreak>
      <Note>
        Notazione: <Math>{"P(\\cdot)"}</Math> probabilita,{" "}
        <Math>{"E[\\cdot]"}</Math> valore atteso,{" "}
        <Math>{"\\operatorname{Var}(\\cdot)"}</Math> varianza,{" "}
        <Math>{"\\Phi"}</Math> ripartizione della normale standard.
      </Note>

      <h3 className="subsection-title">
        T1. Probabilita, condizionata e Bayes
      </h3>
      <Row>
        <Column width="half">
          <Box color="gray" border="left" title="Assiomi e regole base">
            <MathBlock gap="sm">
              {`0 \\le P(E) \\le 1,\\quad P(\\varnothing)=0,\\quad P(\\Omega)=1`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(\\overline E)=1-P(E),\\quad P(E\\cup F)=P(E)+P(F)-P(E\\cap F)`}
            </MathBlock>
            <p>
              Se gli eventi sono disgiunti, la probabilita dell&apos;unione e
              la somma delle probabilita.
            </p>
          </Box>
        </Column>
        <Column width="half">
          <Box color="blue" border="left" title="Condizionata, totale, Bayes">
            <MathBlock gap="sm">
              {`P(E\\mid F)=\\frac{P(E\\cap F)}{P(F)},\\quad P(E\\cap F)=P(E\\mid F)P(F)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(E)=\\sum_j P(E\\mid F_j)P(F_j)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(F_j\\mid E)=\\frac{P(E\\mid F_j)P(F_j)}{\\sum_i P(E\\mid F_i)P(F_i)}`}
            </MathBlock>
          </Box>
        </Column>
      </Row>

      <Box color="yellow" border="left" title="Indipendenza">
        <MathBlock gap="sm">
          {`E,F\\text{ indipendenti}\\iff P(E\\cap F)=P(E)P(F)\\iff P(E\\mid F)=P(E)`}
        </MathBlock>
        <p>
          Per piu eventi indipendenti:{" "}
          <Math>{"P(F_1\\cap\\cdots\\cap F_n)=P(F_1)\\cdots P(F_n)"}</Math>.
        </p>
      </Box>

      <h3 className="subsection-title">T2. Variabili aleatorie discrete</h3>
      <Row>
        <Column width="half">
          <Box color="gray" border="left" title="Da tabella valori/probabilita">
            <MathBlock gap="sm">
              {`\\sum_i P(X=x_i)=1,\\quad F(x)=P(X\\le x)=\\sum_{x_i\\le x}P(X=x_i)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`E[X]=\\sum_i x_iP(X=x_i),\\quad E[X^2]=\\sum_i x_i^2P(X=x_i)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\operatorname{Var}(X)=E[X^2]-E[X]^2`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Modelli discreti notevoli">
            <p>
              <strong>Bernoulli</strong> <Math>{"B(1,p)"}</Math>:{" "}
              <Math>{"E[X]=p"}</Math>,{" "}
              <Math>{"\\operatorname{Var}(X)=p(1-p)"}</Math>.
            </p>
            <p>
              <strong>Binomiale</strong> <Math>{"B(n,p)"}</Math>:
            </p>
            <MathBlock gap="sm">
              {`P(X=r)=\\binom nr p^r(1-p)^{n-r}`}
            </MathBlock>
            <MathBlock gap="sm">
              {`E[X]=np,\\quad \\operatorname{Var}(X)=np(1-p)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`A_i=\\text{successo prova }i,\\quad p=P(A_i)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`S_n=\\sum_{i=1}^n \\mathbf1_{A_i}\\sim B(n,p)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(S_n\\ge m)=\\sum_{r=m}^{n}\\binom nr p^r(1-p)^{n-r}`}
            </MathBlock>
            <p>
              <strong>Poisson</strong> <Math>{"P(\\lambda)"}</Math>:{" "}
              <Math>{"P(X=k)=\\frac{\\lambda^k}{k!}e^{-\\lambda}"}</Math>,{" "}
              <Math>{"E[X]=\\operatorname{Var}(X)=\\lambda"}</Math>.
            </p>
          </Box>
        </Column>
      </Row>

      <Box color="purple" border="left" title="Coefficiente binomiale">
        <p>
          <Math>{"\\binom nk"}</Math> conta in quanti modi si scelgono{" "}
          <Math>{"k"}</Math> posizioni tra <Math>{"n"}</Math>, senza ordine.
        </p>
        <MathBlock gap="sm">
          {`\\binom nk=\\frac{n!}{k!(n-k)!}\\qquad \\binom{10}{3}=\\frac{10!}{3!7!}=\\frac{10\\cdot9\\cdot8}{3\\cdot2\\cdot1}=120`}
        </MathBlock>
        <p>
          In una binomiale serve per contare dove cadono i successi: per
          esempio 3 successi in 10 prove possono occupare 120 terne di
          posizioni diverse.
        </p>
      </Box>

      <h3 className="subsection-title">T3. Variabili aleatorie continue</h3>
      <Row>
        <Column width="half">
          <Box color="gray" border="left" title="Densita e ripartizione">
            <MathBlock gap="sm">
              {`f(x)\\ge0,\\quad \\int_{-\\infty}^{+\\infty}f(x)\\,dx=1,\\quad P(X\\in A)=\\int_A f(x)\\,dx`}
            </MathBlock>
            <MathBlock gap="sm">
              {`F(x)=P(X\\le x)=\\int_{-\\infty}^{x}f(t)\\,dt`}
            </MathBlock>
            <MathBlock gap="sm">
              {`E[X]=\\int xf(x)\\,dx,\\quad E[X^2]=\\int x^2f(x)\\,dx,\\quad \\operatorname{Var}(X)=E[X^2]-E[X]^2`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\text{parametri: }\\int f(x)\\,dx=1,\\quad \\int xf(x)\\,dx=E[X]\\text{ dato}`}
            </MathBlock>
            <MathBlock gap="sm">
              {`c\\le d:\\quad P(X\\le c\\mid X\\le d)=\\frac{F(c)}{F(d)}`}
            </MathBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Uniforme, normale, esponenziale">
            <p>
              <strong>Uniforme</strong> <Math>{"U([a,b])"}</Math>:{" "}
              <Math>{"f=1/(b-a)"}</Math>,{" "}
              <Math>{"E[X]=(a+b)/2"}</Math>,{" "}
              <Math>{"\\operatorname{Var}(X)=(b-a)^2/12"}</Math>.
            </p>
            <p>
              <strong>Normale</strong> <Math>{"N(\\mu,\\sigma^2)"}</Math>:{" "}
              <Math>{"\\mu=E[X]"}</Math>,{" "}
              <Math>{"\\sigma=\\sqrt{\\operatorname{Var}(X)}"}</Math>; standardizza con{" "}
              <Math>{"Z=\\frac{X-\\mu}{\\sigma}\\sim N(0,1)"}</Math>.
            </p>
            <MathBlock gap="sm">
              {`z_t=\\frac{t-\\mu}{\\sigma},\\quad P(X\\le t)=\\Phi(z_t)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(X>t)=1-\\Phi(z_t),\\quad P(a<X<b)=\\Phi(z_b)-\\Phi(z_a)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`D=X-Y,\\quad \\mu_D=\\mu_X-\\mu_Y`}
            </MathBlock>
            <MathBlock gap="sm">
              {`X,Y\\text{ indip.}:\\quad \\sigma_D=\\sqrt{\\sigma_X^2+\\sigma_Y^2}`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(X\\le Y-c)=P(D\\le -c)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\overline X_k:\\quad \\mu_{\\overline X}=\\mu,\\quad \\sigma_{\\overline X}=\\frac{\\sigma}{\\sqrt k}`}
            </MathBlock>
            <MathBlock gap="sm">
              {`P(\\overline X_k\\le x)=\\Phi\\left(\\frac{x-\\mu}{\\sigma_{\\overline X}}\\right),\\quad \\text{soglia: }P<\\alpha`}
            </MathBlock>
            <p>
              <strong>Esponenziale</strong> <Math>{"E(\\lambda)"}</Math>:{" "}
              <Math>{"P(X>x)=e^{-\\lambda x}"}</Math>,{" "}
              <Math>{"F(x)=1-e^{-\\lambda x}"}</Math>,{" "}
              <Math>{"E[X]=1/\\lambda"}</Math>.
            </p>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Valori utili di Phi">
            <p>
              <Math>{"\\Phi(1.00)=0.8413"}</Math>,{" "}
              <Math>{"\\Phi(1.25)=0.8944"}</Math>,{" "}
              <Math>{"\\Phi(1.36)=0.9131"}</Math>,{" "}
              <Math>{"\\Phi(1.62)=0.9474"}</Math>,{" "}
              <Math>{"\\Phi(1.93)=0.9732"}</Math>,{" "}
              <Math>{"\\Phi(2.00)=0.9772"}</Math>.
            </p>
            <p>
              Quantili: <Math>{"q_p"}</Math> indica il valore tale che{" "}
              <Math>{"P(Z\\le q_p)=p"}</Math>, con{" "}
              <Math>{"Z\\sim N(0,1)"}</Math>. Valori utili:{" "}
              <Math>{"q_{0.95}=1.64"}</Math>,{" "}
              <Math>{"q_{0.975}=1.96"}</Math>,{" "}
              <Math>{"q_{0.995}=2.58"}</Math>.
            </p>
          </Box>
        </Column>
        <Column width="half">
          <Box color="blue" border="left" title="Stima, TLC, intervalli">
            <p>
              <Math>{"\\widehat\\mu_n"}</Math> e la media campionaria: somma i
              dati del campione e dividi per <Math>{"n"}</Math>.{" "}
              <Math>{"\\widehat\\mu_{k,n}"}</Math> e la media delle potenze
              <Math>{"k"}</Math>-esime, utile per i momenti.
            </p>
            <MathBlock gap="sm">
              {`\\widehat\\mu_n=\\frac1n\\sum_i X_i,\\quad \\widehat\\mu_{k,n}=\\frac1n\\sum_i X_i^k`}
            </MathBlock>
            <MathBlock gap="sm">
              {`\\frac{\\widehat\\mu_n-\\mu}{\\sigma/\\sqrt n}\\approx N(0,1)`}
            </MathBlock>
            <MathBlock gap="sm">
              {`IC_{1-\\alpha}:\\quad \\widehat\\mu_n\\pm q_{1-\\alpha/2}\\frac{\\sigma}{\\sqrt n}`}
            </MathBlock>
            <p>
              <Math>{"IC"}</Math> significa intervallo di confidenza: e
              l&apos;intervallo che stima dove puo stare il vero{" "}
              <Math>{"\\mu"}</Math>. Il livello <Math>{"1-\\alpha"}</Math> e la
              confidenza, per esempio <Math>{"0.95"}</Math> al 95%.
            </p>
            <MathBlock gap="sm">
              {`[a;b]:\\quad \\widehat\\mu_n=\\frac{a+b}{2},\\quad E_{max}=\\frac{b-a}{2}`}
            </MathBlock>
            <p>
              Per precisione <Math>{"\\varepsilon_0"}</Math>:{" "}
              <Math>{"n\\ge\\left(q_{1-\\alpha/2}\\sigma/\\varepsilon_0\\right)^2"}</Math>,
              arrotondato all&apos;intero superiore.
            </p>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
