import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Titolarita e termini d'uso | Appunti",
  description:
    "Nota su titolarita, uso personale di studio e limitazione di responsabilita.",
};

export default function TermsPage() {
  return (
    <main className="appunti-root legal-page">
      <header className="legal-hero">
        <p className="legal-eyebrow">Nota legale</p>
        <h1 className="legal-title">Titolarita&apos; e termini d&apos;uso</h1>
        <p className="legal-lead">
          Questi appunti sono miei, sono pubblicati per consultazione personale
          e non costituiscono materiale ufficiale del corso.
        </p>
      </header>

      <section className="legal-section">
        <h2>Proprieta&apos;</h2>
        <p>
          I contenuti didattici, i riassunti e l&apos;organizzazione del materiale
          presenti in questo sito e repository appartengono a Simon Maggini,
          salvo diversa indicazione.
        </p>
        <p>
          Il fatto che il materiale sia pubblico non trasferisce la titolarita&apos;
          e non significa che sia materiale ufficiale o approvato da docenti,
          corsi o ateneo.
        </p>
      </section>

      <section className="legal-section">
        <h2>Uso consentito</h2>
        <ul>
          <li>Lettura online del materiale.</li>
          <li>Download o stampa per uso personale di studio.</li>
          <li>Condivisione del link al sito o al repository.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Uso non consentito senza permesso scritto</h2>
        <ul>
          <li>Ricaricare o ridistribuire i contenuti altrove.</li>
          <li>Vendere il materiale o usarlo a fini commerciali.</li>
          <li>Rimuovere l&apos;attribuzione o presentarlo come proprio.</li>
          <li>Pubblicare versioni modificate o raccolte derivate.</li>
          <li>
            Usare il materiale in modo da far pensare a un&apos;approvazione
            ufficiale da parte mia.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Esclusione di responsabilita&apos;</h2>
        <p>
          Il materiale e&apos; fornito cosi&apos; com&apos;e&apos;, solo per supporto allo studio.
          Potrebbe contenere errori, omissioni o informazioni non aggiornate.
        </p>
        <p>
          Chi lo usa se ne assume interamente la responsabilita&apos;, compreso il
          controllo della correttezza dei contenuti e della liceita&apos; o
          ammissibilita&apos; del loro utilizzo secondo le regole del docente, del
          corso o dell&apos;istituzione.
        </p>
        <p>
          Non rispondo di voti, errori, incomprensioni, contestazioni del
          professore, conseguenze disciplinari o altri problemi derivanti
          dall&apos;uso o dal riuso del materiale.
        </p>
      </section>

      <section className="legal-section">
        <h2>Disponibilita&apos; futura</h2>
        <p>
          Posso modificare, rimuovere o smettere di distribuire il materiale in
          qualsiasi momento. Qualsiasi autorizzazione ulteriore rispetto all&apos;uso
          personale di studio deve essere esplicita e scritta.
        </p>
      </section>

      <p className="legal-back">
        <Link href="/">Torna all&apos;indice</Link>
      </p>
    </main>
  );
}
