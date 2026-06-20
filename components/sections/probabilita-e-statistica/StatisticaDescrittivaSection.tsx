import {
  Section,
  Row,
  Column,
  Box,
  Math,
  MathBlock,
  Note,
} from "@/components/index";

export function StatisticaDescrittivaSection() {
  return (
    <Section title="6. Statistica descrittiva" allowPageBreak>
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Popolazione, campione, variabili">
            <p>
              La popolazione raccoglie tutte le unità di interesse; il campione è
              il sottoinsieme osservato. Le variabili possono essere quantitative
              continue, quantitative discrete, qualitative ordinali o qualitative nominali.
            </p>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Frequenze">
            <MathBlock>{`f_i=\\frac{n_i}{N} \\qquad F_i=\\sum_{j\\le i}f_j`}</MathBlock>
            <p>
              Le classi devono essere disgiunte ed esaustive. Con ampiezze diverse,
              nell&apos;istogramma è l&apos;area della barra a rappresentare la frequenza.
            </p>
          </Box>
        </Column>
      </Row>

      <Box color="purple" border="left" title="Misure di posizione">
        <ul>
          <li><strong>Moda:</strong> valore, categoria o classe più frequente; utilizzabile anche per dati nominali.</li>
          <li><strong>Mediana:</strong> divide i dati ordinati in due metà; è robusta agli outlier.</li>
          <li><strong>Media:</strong> <Math>{"\\bar x=N^{-1}\\sum_i x_i"}</Math>; usa tutti i valori ma è sensibile agli estremi.</li>
        </ul>
        <p>Il confronto media-mediana e la forma dei grafici aiutano a riconoscere asimmetria e code.</p>
      </Box>

      <Box color="yellow" border="left" title="Misure di dispersione">
        <MathBlock>{`R=x_{max}-x_{min} \\qquad SM=\\frac1N\\sum_i|x_i-\\bar x|`}</MathBlock>
        <MathBlock>
          {`s_N^2=\\frac1N\\sum_i(x_i-\\bar x)^2 \\qquad SQM=\\sqrt{s_N^2} \\qquad CV=\\frac{SQM}{\\bar x}`}
        </MathBlock>
        <p>
          Il range usa solo gli estremi. Il coefficiente di variazione è adimensionale,
          ma è poco interpretabile se la media è nulla o molto vicina a zero. Per stimare
          la varianza della popolazione si usa normalmente il denominatore
          <Math>{" n-1"}</Math>, distinto dalla descrizione dei dati osservati.
        </p>
      </Box>

      <Row>
        <Column width="half">
          <Box color="gray" border="left" title="Grafici corretti">
            <ul>
              <li>Serie temporale: evoluzione, crisi, cambi di volatilità.</li>
              <li>Istogramma: variabile quantitativa continua.</li>
              <li>Barre separate: discreta o qualitativa.</li>
              <li>Boxplot: mediana, quartili, IQR, baffi e outlier.</li>
            </ul>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Workflow su un dataset">
            <ol>
              <li>Controllare unità, periodo, mancanti e anomalie.</li>
              <li>Calcolare posizione, dispersione e frequenze.</li>
              <li>Creare grafici coerenti con il tipo di variabile.</li>
              <li>Interpretare insieme numeri e grafici.</li>
            </ol>
          </Box>
        </Column>
      </Row>

      <Note>
        Nel caso S&amp;P 500 (932 rendimenti mensili, 1945-2022): media 0.004,
        mediana 0.008, deviazione standard 0.035, minimo -0.196 e massimo
        0.117. Media sotto la mediana, minimo molto più estremo e boxplot con
        outlier negativi indicano una coda sinistra rilevante per il rischio.
      </Note>
    </Section>
  );
}
