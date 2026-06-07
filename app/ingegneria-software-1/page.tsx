import Image from "next/image";
import type { Metadata } from "next";
import { isValidElement } from "react";
import type { ReactNode } from "react";
import { CourseHeader } from "@/components/index";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

export const metadata: Metadata = {
  title: "Ingegneria Software 1 | Appunti",
  description:
    "Appunti visuali e stampabili di Ingegneria Software 1 con modelli, processi e concetti chiave.",
};

type Row = [string, ReactNode];

function reactNodeKey(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number" || typeof node === "bigint") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(reactNodeKey).join("|");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return reactNodeKey(node.props.children);
  }

  return "";
}

function Card({
  title,
  children,
  tone = "gray",
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "green" | "yellow" | "red" | "purple" | "gray";
}) {
  return (
    <section className={`isw-card isw-card-${tone}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Facts({ items }: { items: ReactNode[] }) {
  return (
    <ul className="isw-facts">
      {items.map((item) => (
        <li key={reactNodeKey(item)}>{item}</li>
      ))}
    </ul>
  );
}

function KeyValue({ rows }: { rows: Row[] }) {
  return (
    <table className="isw-table isw-kv">
      <tbody>
        {rows.map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Matrix({
  headings,
  rows,
}: {
  headings: string[];
  rows: ReactNode[][];
}) {
  return (
    <table className="isw-table">
      <thead>
        <tr>
          {headings.map((heading) => (
            <th key={heading}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.map(reactNodeKey).join("::")}>
            {row.map((cell, cellIndex) => (
              <td key={headings[cellIndex]}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Flow({ children }: { children: ReactNode }) {
  return <pre className="isw-flow">{children}</pre>;
}

function PlantUmlDiagram({
  src,
  alt,
  size = "full",
}: {
  src: string;
  alt: string;
  size?: "full" | "narrow";
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={760}
      height={420}
      className={`isw-uml-img isw-uml-img-${size}`}
      unoptimized
    />
  );
}

function UmlLegend({ items }: { items: string[] }) {
  return (
    <div className="isw-uml-legend">
      {items.map((item) => (
        <code key={item}>{item}</code>
      ))}
    </div>
  );
}

export default function IngegneriaSoftwarePage() {
  return (
    <div className="page page-compact isw-one-page">
      <CourseHeader
        title="Blackjack Deluxe - Foglio tecnico ISW1"
        viewTransitionName={getCourseTitleTransitionName("ingegneria-software-1")}
      />

      <div className="isw-grid">
        <ProjectColumn />
        <GameplayColumn />
        <ImplementationColumn />
      </div>
    </div>
  );
}

function ProjectColumn() {
  return (
    <div className="isw-col">
      <Card title="Progetto" tone="blue">
            <KeyValue
              rows={[
                ["App", "desktop JavaFX: Blackjack Deluxe"],
                ["Stack", "Java 25, JavaFX 25, Maven multi-module, FXML/CSS"],
                ["UI lib", "AtlantaFX PrimerDark"],
                ["Pack", "jpackage: macOS .dmg, Windows .exe, Linux .deb"],
              ]}
            />
            <Matrix
              headings={["Modulo", "Responsabilita"]}
              rows={[
                ["backend", "logica gioco, persistenza, settings, licenze"],
                ["license", "modulo nativo C per licenze"],
                ["frontend", "UI JavaFX"],
              ]}
            />
          </Card>

          <Card title="Requisiti funzionali/non funzionali" tone="yellow">
            <KeyValue
              rows={[
                ["Funzionale", "cosa fa il sistema: servizi, azioni, regole di business"],
                ["Non funzionale", "qualita, vincolo o proprieta: usabilita, affidabilita, portabilita, prestazioni"],
                ["Ambiguo", "Salvare/caricare e funzionale; salvataggi affidabili e recuperabili e non funzionale"],
              ]}
            />
            <Matrix
              headings={["Tipo", "Esempi Blackjack Deluxe"]}
              rows={[
                ["Funzionale", "Il sistema deve gestire automaticamente il turno del banco secondo le regole del Blackjack."],
                ["Funzionale", "Il giocatore deve poter cambiare lingua dalle impostazioni."],
                ["Funzionale", "Il sistema deve validare la licenza di un partecipante prima di permetterne l'uso nel gioco."],
                ["Non funzionale", "I dati di gioco devono essere persistenti e recuperabili tramite salvataggi, riducendo il rischio di perdita dello stato."],
                ["Non funzionale", "Il cambio lingua deve essere immediato o percepito come fluido, migliorando l'usabilita."],
                ["Non funzionale", "L'applicazione deve essere portabile/installabile su macOS, Windows e Linux tramite packaging."],
              ]}
            />
          </Card>

          <Card title="Frontend JavaFX" tone="green">
            <Facts
              items={[
                <>App crea Scene con host: <code>tableLayout</code>, <code>fullScreenHost</code>, <code>overlayHost</code>.</>,
                <><code>NavigationManager</code> carica view via <code>Route</code> + <code>FxmlView</code>.</>,
                <><code>FxmlView</code>: FXML + CSS + <code>I18n.currentBundle()</code>.</>,
                <><code>NavigationAware</code>: controller ricevono nav manager e fanno <code>dispose()</code>.</>,
                <>Start: se <code>LicenseFacade.isOnboardingNeeded()</code> =&gt; <code>LICENSE</code>, else <code>MAIN_MENU</code>.</>,
                <>ESC: chiude overlay; se nessun overlay apre <code>SETTINGS</code>.</>,
              ]}
            />
            <Matrix
              headings={["Route", "Host"]}
              rows={[
                ["MAIN_MENU", "fullscreen"],
                ["LOAD_GAMES", "fullscreen"],
                ["LICENSE", "fullscreen"],
                ["SETTINGS", "overlay"],
                ["GAMEPLAY", "table view"],
              ]}
            />
          </Card>

          <Card title="Backend + pattern" tone="purple">
            <Facts
              items={[
                <><code>BlackjackFacade</code> = accesso principale + Singleton.</>,
                <>Implementa <code>GameFacade</code>, <code>LicenseFacade</code>, <code>MainMenuFacade</code>, <code>SettingsFacade</code>.</>,
                <>Delega a <code>BlackjackCore</code>; usa <code>LicenseService</code> + repository filesystem.</>,
                <><code>BlackjackCore</code> implementa <code>GameplayViewState</code>: <code>phase()</code>, <code>players()</code>, <code>activePlayer()</code>, <code>activeHand()</code>, <code>dealerHand()</code>, <code>availableActions()</code>, <code>remainingShoeCards()</code>.</>,
              ]}
            />
            <div className="isw-chipline">
              <code>startNewGame()</code><code>confirmRoundSetup()</code><code>startNewRound()</code><code>loadGame()</code><code>saveCurrentGame()</code><code>listSaves()</code><code>deleteSave()</code><code>performCurrentPlayerAction()</code><code>subscribeToGameplayUpdates()</code>
            </div>
            <KeyValue
              rows={[
                ["Facade", "UI vede API semplice frontend-backend"],
                ["Singleton", "BlackjackFacade.getInstance(), GameEventBus.getInstance()"],
                ["Repository", "SaveGameRepository, AppSettingsRepository, UserProfileRepository + FS impl."],
                ["Observer", "backend eventi -> Facade -> GameplaySubscription -> GameplayAnimationProxy"],
                ["MVC/MV*", "Model backend/domain; View FXML/CSS; Controller JavaFX; Facade separa UI/dominio"],
              ]}
            />
          </Card>

          <Card title="Modello dominio" tone="gray">
            <Flow>{`GameSession
*-- Shoe, GameRules, currentRound, pastRounds, players
Round: dealerHand, participants, activePlayerIndex,
       activeHandId, phase
PlayerRound = BettingPlayer + 1..* Hand
Hand = cards + Bet + HandStatus + fromSplit flags
Participant = playerId, name, balance, License
Bet = mainStake + insuranceStake`}</Flow>
            <Matrix
              headings={["Classe", "Promemoria"]}
              rows={[
                ["Shoe", "deck, draw(), shuffle(), refill(), needsRefill()"],
                ["License", "licenseKey, tier, expiresAt"],
                ["HandStatus", "PLAYING, STOOD, BUST, BLACKJACK"],
                ["Participant", "implementa PlayerLike"],
              ]}
            />
      </Card>
    </div>
  );
}

function GameplayColumn() {
  return (
    <div className="isw-col">
      <Card title="Fasi e azioni" tone="yellow">
            <Flow>SETUP -&gt; PLAYER_TURN -&gt; DEALER_TURN -&gt; ROUND_SETTLED -&gt; SETUP</Flow>
            <Matrix
              headings={["Azione", "Regola"]}
              rows={[
                ["HIT/STAND", "mano attiva + PLAYING"],
                ["DOUBLE_DOWN", "solo 2 carte; extra = mainStake; pesca 1 e poi STOOD"],
                ["SPLIT", "2 carte stesso rank; max 4 mani; no split di assi; extra = mainStake"],
                ["INSURANCE", "dealer upcard Asso; mano originale 2 carte; no split; insuranceStake=0; costo mainStake/2"],
                ["SURRENDER", "presente in enum, non supportata"],
                ["Saldo", "azioni filtrate anche dal balance del Participant"],
              ]}
            />
          </Card>

          <Card title="Flussi programma" tone="green">
            <h3>Distribuzione iniziale</h3>
            <Flow>{`Giocatore -> GameSession.startRound()
GameSession -> Round.dealInitialCards(shoe)
loop x2:
  player: carta face-up
  dealer: 1a face-up, 2a face-down/hole
Round.start() -> PLAYER_TURN
eventi: CardDealt, PhaseChanged, TurnChanged`}</Flow>
            <h3>Azione giocatore</h3>
            <Flow>{`Controller -> BlackjackFacade.performCurrentPlayerAction()
Facade -> BlackjackCore
Core: saldo + availableActions()
Core -> GameSession.applyAction()
GameSession -> Round.applyAction() -> GameEvent
Facade: GameEventBus.drain()
Facade -> GameplaySubscription(state + events)
GameplayAnimationProxy: animazioni + stato UI`}</Flow>
            <h3>Dealer/settlement</h3>
            <Flow>{`fine mani player: PLAYER_TURN -> DEALER_TURN
reveal hole card; pesca finche score < 17
soft 17: GameRules.dealerStandsOnSoft17
Round.settle() -> ROUND_SETTLED`}</Flow>
          </Card>

          <Card title="Scoring + pagamenti" tone="red">
            <Facts
              items={[
                <><code>Hand.score()</code>: hard values; Asso=1, promosso a 11 se <code>hardSum + 10 &lt;= 21</code>.</>,
                <>Blackjack naturale = 2 carte = 21 e NON da split. 21 da split paga normale.</>,
                <>Puntate gia tolte dal saldo prima del settlement. <code>BUST</code> se score &gt; 21.</>,
              ]}
            />
            <Matrix
              headings={["Caso", "Gross credit"]}
              rows={[
                ["player bust", "0"],
                ["BJ nat. vs dealer BJ", "mainStake"],
                ["BJ nat. vs no dealer BJ", "mainStake + mainStake * 3/2"],
                ["dealer bust o player > dealer", "mainStake * 2"],
                ["pareggio", "mainStake"],
                ["perdita", "0"],
                ["insurance se dealer BJ nat.", "insuranceStake * 3"],
              ]}
            />
          </Card>

          <Card title="Eventi + UI animata" tone="blue">
            <Facts
              items={[
                <><code>GameEventBus</code>: Singleton con queue; <code>emit(event)</code>, <code>drain()</code> svuota e restituisce snapshot.</>,
                <><code>GameplayAnimationProxy</code>: riceve stato finale + eventi, mantiene carte visibili temporanee, pause JavaFX, pubblica <code>GameplayAnimationState</code>.</>,
              ]}
            />
            <div className="isw-chipline">
              <code>CardDealtEvent</code><code>HandSplitEvent</code><code>DealerHoleCardRevealedEvent</code><code>PhaseChangedEvent</code><code>TurnChangedEvent</code><code>ShoeRefillEvent</code>
            </div>
            <div className="isw-chipline">
              <code>DealerController</code><code>PlayerSeatsController</code><code>ShoeStatusController</code><code>RoundResultPanelController</code><code>PlayerActionBarController</code>
            </div>
          </Card>

          <Card title="UML sequence/activity" tone="yellow">
            <h3>Sequence diagram</h3>
            <PlantUmlDiagram
              src="/uml/isw-sequence.svg"
              alt="Sequence diagram UML renderizzato con PlantUML"
            />
            <UmlLegend
              items={[
                "A -> B: call",
                "B --> A: return",
                "activate/deactivate",
                "loop",
                "alt/else",
                "opt/par",
              ]}
            />

            <h3>Activity diagram</h3>
            <PlantUmlDiagram
              src="/uml/isw-activity.svg"
              alt="Activity diagram UML renderizzato con PlantUML"
              size="narrow"
            />
            <UmlLegend
              items={[
                "start / stop",
                ":azione;",
                "if (...) then (...) else (...) endif",
                "fork/end fork",
                "|swimlane|",
              ]}
            />
      </Card>
    </div>
  );
}

function ImplementationColumn() {
  return (
    <div className="isw-col">
      <Card title="Persistenza" tone="gray">
            <KeyValue
              rows={[
                ["Save repo", "list(), find(saveId), upsert(snapshot), delete(saveId)"],
                ["Impl", "FileSystemSaveGameRepository"],
                ["Path", "~/.blackjack/saves/*.dat"],
                ["Atomicita", ".tmp + ATOMIC_MOVE"],
              ]}
            />
            <Matrix
              headings={["Snapshot", "Campi"]}
              rows={[
                ["GameSnapshot", "saveId, savedAtUtc, snapshotVersion, participants, players, shoe, currentRound, pastRounds, rules, phase, favourite"],
                ["Preview", "playerCount, totalBetAmount, pastRoundsCount, phase, favourite, preview players"],
              ]}
            />
            <KeyValue
              rows={[
                ["Settings", "~/.blackjack/settings.dat"],
                ["AppSettings", "language, audioVolume, musicVolume, backgroundMusicId, animationMode, soundEffectsEnabled, autosaveEnabled"],
                ["Lingue", "Italiano, English, Deutsch, 中文"],
                ["AnimationMode", "SYSTEM, OFF, QUICK, NORMAL"],
                ["Profili", "~/.blackjack/players.properties"],
                ["Key profilo", "licenseKey.name / licenseKey.balance"],
              ]}
            />
          </Card>

          <Card title="Licenze / nativo" tone="purple">
            <Facts
              items={[
                <><code>isOnboardingNeeded()</code> = <code>getValidPlayers().isEmpty()</code>.</>,
                <><code>LicenseService</code> valida via <code>LicenseValidator</code>.</>,
                <>Panama FFM API, non JNI: <code>Linker</code>, <code>SymbolLookup</code>, <code>MethodHandle</code>, <code>Arena</code>, <code>MemorySegment</code>.</>,
                <>Libreria estratta da <code>/native/</code> in file temporaneo.</>,
              ]}
            />
            <KeyValue
              rows={[
                ["Win", "license.dll"],
                ["macOS", "liblicense.dylib"],
                ["Linux", "liblicense.so"],
                ["Native fn", "generate_license(), validate_license(), read_license()"],
                ["Chiave", "XXXX-XXXX-XXXX-SSSSSSSS"],
                ["Payload", "tier, scadenza UTC, nonce"],
                ["Firma", "HMAC-SHA256 troncato"],
                ["Status", "INVALID, VALID, EXPIRED"],
                ["Saldo iniz.", "BASE 200, PRO 500, ULTIMATE 2000"],
              ]}
            />
          </Card>

          <Card title="UML use case/class" tone="yellow">
            <h3>Use case</h3>
            <PlantUmlDiagram
              src="/uml/isw-use-case.svg"
              alt="Use case UML renderizzato con PlantUML"
            />
            <UmlLegend
              items={[
                "actor Giocatore",
                "Giocatore -- Gameplay",
                "Gameplay ..> Visualizzare : <<include>>",
                "Menu ..> Pause : <<extend>>",
              ]}
            />
            <Matrix
              headings={["Rel.", "Da ricordare"]}
              rows={[
                ["include", "Sempre richiesto: Registrare partecipante <<include>> Validare licenza; Giocare round <<include>> Visualizzare carte/saldo + Eseguire azione."],
                ["extend", "Opzionale/condizionale, non exclude: Menu pausa <<extend>> Giocare partita; Eliminare salvataggio <<extend>> Gestire salvataggi."],
              ]}
            />

            <h3>Class diagram</h3>
            <PlantUmlDiagram
              src="/uml/isw-class.svg"
              alt="Class diagram UML renderizzato con PlantUML"
            />
            <UmlLegend
              items={[
                'A "1" *-- "*" B',
                "A o-- B",
                "A --> B",
                "A ..> B",
                "Super <|-- Sub",
                "Interface <|.. Class",
              ]}
            />
          </Card>

          <Card title="Qualita software" tone="green">
            <Facts
              items={[
                <>Modularita: <code>frontend</code> / <code>backend</code> / <code>license</code> separati.</>,
                <>Manutenibilita: Facade + Repository + dominio diviso in <code>GameSession</code>/<code>Round</code>/<code>Hand</code>.</>,
                <>Robustezza: eccezioni specifiche save/settings/profili/licenze; fallback settings/profili.</>,
                <>Testabilita: logica backend separata dalla UI. Non promettere grande suite di test.</>,
                <>Usabilita/HIG: feedback, animazioni, audio, carte/saldo/punteggio, overlay settings, <code>availableActions()</code> previene mosse illegali.</>,
              ]}
            />
      </Card>
    </div>
  );
}
