import "./style.css";
import { gameConfig } from "./game-config.js";
import img00 from "../img/00.jpg";
import img01 from "../img/01.jpg";
import img02 from "../img/02.jpg";
import img03 from "../img/03.jpg";
import img04 from "../img/04.jpg";
import img05 from "../img/05.jpg";
import img06 from "../img/06.jpg";

/**
 * Quanti stage con almeno un errore si possono “perdonare”
 * per mostrare esito positivo e il codice locker.
 * Confermare con Davide prima del merge: 1 = al massimo un stage sbagliato.
 */
const MAX_MISTAKES_FOR_SUCCESS = 1;

const app = document.getElementById("app");

/** Header locali in img/ (00 = intro/esito, 01–06 = stage). Vite li emette in dist/assets. */
const HEADERS = {
  intro: { src: img00, alt: "Due creativi in agenzia intorno a una borraccia smart e a una moodboard" },
  outcome: { src: img00, alt: "Due creativi in agenzia intorno a una borraccia smart e a una moodboard" },
  stages: [
    { src: img01, alt: "Scelta del target: studente sportivo evidenziato rispetto ad altri pubblici" },
    { src: img02, alt: "Video brevi su un telefono, il canale giusto per il pubblico giovane" },
    { src: img03, alt: "Ripresa di un video breve della borraccia con call to action" },
    { src: img04, alt: "Obiettivo awareness: far conoscere il prodotto, non vendere subito" },
    { src: img05, alt: "Dashboard: dalle visualizzazioni ai click, la metrica CTR" },
    { src: img06, alt: "Ottimizzazione: pagina prodotto più chiara e messaggi di retargeting" },
  ],
};

function headerArt(header) {
  if (!header) return null;
  return el(
    "figure",
    { class: "header-art" },
    el("img", {
      src: header.src,
      alt: header.alt,
      width: "1200",
      height: "400",
      decoding: "async",
    }),
  );
}

const state = {
  screen: "intro",
  stageIndex: 0,
  /** Indici degli stage in cui c’è stato almeno un tentativo errato. */
  stagesWithMistake: new Set(),
  solved: false,
  optionOrder: [],
};

function shuffleIds(ids) {
  const copy = ids.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function mistakeCount() {
  return state.stagesWithMistake.size;
}

function isPositiveOutcome() {
  return mistakeCount() <= MAX_MISTAKES_FOR_SUCCESS;
}

function currentStage() {
  return gameConfig.stages[state.stageIndex];
}

function resetGame() {
  state.screen = "intro";
  state.stageIndex = 0;
  state.stagesWithMistake = new Set();
  state.solved = false;
  state.optionOrder = [];
}

function startGame() {
  state.screen = "stage";
  state.stageIndex = 0;
  state.stagesWithMistake = new Set();
  state.solved = false;
  prepareStage();
}

function prepareStage() {
  const stage = currentStage();
  state.solved = false;
  state.optionOrder = shuffleIds(stage.options.map((o) => o.id));
}

function goNext() {
  if (state.stageIndex >= gameConfig.stages.length - 1) {
    state.screen = "outcome";
  } else {
    state.stageIndex += 1;
    prepareStage();
  }
}

function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (value == null || value === false) return;
      if (key === "class") node.className = value;
      else if (key === "html") node.innerHTML = value;
      else if (key.startsWith("on") && typeof value === "function") {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === "disabled") node.disabled = Boolean(value);
      else node.setAttribute(key, value);
    });
  }
  children.flat().forEach((child) => {
    if (child == null || child === false) return;
    node.append(typeof child === "string" ? document.createTextNode(child) : child);
  });
  return node;
}

function renderIntro() {
  return el(
    "main",
    { class: "panel panel--intro" },
    headerArt(HEADERS.intro),
    el("p", { class: "kicker" }, gameConfig.subtitle),
    el("h1", null, gameConfig.title),
    el("p", { class: "context" }, gameConfig.intro.context),
    el("button", { class: "btn btn--primary", type: "button", onClick: () => { startGame(); paint(); } }, "Inizia"),
  );
}

function renderStage() {
  const stage = currentStage();
  const total = gameConfig.stages.length;
  const n = state.stageIndex + 1;
  const byId = Object.fromEntries(stage.options.map((o) => [o.id, o]));

  const feedback = state.solved
    ? el("p", { class: "feedback feedback--ok", role: "status" }, stage.feedback.correct)
    : state.stagesWithMistake.has(state.stageIndex) && !state.solved
      ? el("p", { class: "feedback feedback--bad", role: "status" }, stage.feedback.incorrect)
      : null;

  const options = el(
    "div",
    { class: "options", role: "group", "aria-label": "Opzioni" },
    ...state.optionOrder.map((id) => {
      const opt = byId[id];
      const classes = ["opt"];
      if (state.solved && opt.correct) classes.push("opt--ok");
      return el(
        "button",
        {
          class: classes.join(" "),
          type: "button",
          disabled: state.solved,
          onClick: () => onPick(opt),
        },
        opt.text,
      );
    }),
  );

  const nextLabel = n >= total ? "Vedi l’esito" : "Avanti";

  return el(
    "main",
    { class: "panel panel--stage" },
    headerArt(HEADERS.stages[state.stageIndex]),
    el(
      "header",
      { class: "hud" },
      el("p", { class: "kicker" }, `${gameConfig.title} · ${gameConfig.subtitle}`),
      el("p", { class: "hud__step" }, `Brief ${n} / ${total}`),
    ),
    el("div", { class: "lights", "aria-hidden": "true" },
      ...gameConfig.stages.map((_, i) =>
        el("span", {
          class: `light${i < state.stageIndex ? " light--done" : ""}${i === state.stageIndex ? " light--now" : ""}`,
        }),
      ),
    ),
    el("h1", null, stage.title),
    el("p", { class: "situation" }, stage.situation),
    el("p", { class: "question" }, stage.question),
    options,
    feedback,
    state.solved
      ? el("button", { class: "btn btn--primary", type: "button", onClick: () => { goNext(); paint(); } }, nextLabel)
      : null,
  );
}

function onPick(opt) {
  if (state.solved) return;
  if (opt.correct) {
    state.solved = true;
  } else {
    state.stagesWithMistake.add(state.stageIndex);
  }
  paint();
}

function renderOutcome() {
  const ok = isPositiveOutcome();
  const outcome = ok ? gameConfig.outcomes.positive : gameConfig.outcomes.negative;

  return el(
    "main",
    { class: `panel panel--outcome${ok ? " panel--win" : " panel--fail"}` },
    headerArt(HEADERS.outcome),
    el("p", { class: "kicker" }, ok ? "Agenzia · brief approvato" : "Agenzia · campagna da rivedere"),
    el("h1", null, outcome.title),
    el("p", { class: "context" }, outcome.message),
    ok
      ? el(
          "div",
          { class: "locker", "aria-label": `Codice locker ${gameConfig.lockerCode}` },
          el("p", { class: "locker__label" }, "Codice locker"),
          el("p", { class: "locker__code" }, gameConfig.lockerCode),
        )
      : null,
    el("button", { class: "btn btn--ghost", type: "button", onClick: () => { resetGame(); paint(); } }, "Ricomincia"),
  );
}

function paint() {
  app.replaceChildren(
    state.screen === "intro"
      ? renderIntro()
      : state.screen === "outcome"
        ? renderOutcome()
        : renderStage(),
  );
}

paint();
