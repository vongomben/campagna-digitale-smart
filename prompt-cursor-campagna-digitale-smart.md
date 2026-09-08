# Prompt per Cursor — Nuovo repo standalone "Campagna Digitale Smart"

## Contesto
Progetto "IT'S YOUR FUTURE" (Davide). "Campagna Digitale Smart" è un
mini-gioco escape-room a stage sequenziali per il Digital Media Specialist
challenge, che deve girare come **repo/progetto a sé stante**, con build
indipendente da copiare successivamente dentro il sito Jekyll
`its-your-future` (stesso pattern già usato per `lanterna` e per
`cyber-shield`: build separata, poi asset copiati nella sottocartella del
sito).

Nessun engine condiviso: questo repo serve SOLO a "Campagna Digitale Smart".

## Stack
- Vite (vanilla JS, no framework)
- Nessuna dipendenza esterna non necessaria
- `vite.config.js` con `base: "./"` (obbligatorio per l'embedding in
  sottocartella Jekyll)

## Struttura repo da creare
```
campagna-digitale-smart/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── style.css
│   └── game-config.js   ← ti allego il contenuto già pronto, vedi sotto
└── README.md
```

## Contenuto di game-config.js
Usa il file `digital-campaign-game-config.js` già preparato (allegato)
come `src/game-config.js`, SENZA modificarne i contenuti testuali
(situazioni, domande, opzioni, feedback, messaggi didattici, esito). Puoi
adattare solo la sintassi di export se necessario per l'integrazione con
main.js.

## Logica di gioco richiesta
Identica, per struttura, a quella già implementata per "cyber-shield":

1. **Schermata intro**: mostra `gameConfig.intro.context`, bottone "Inizia".
2. **6 stage sequenziali**, uno alla volta, nell'ordine dell'array `stages`.
   - Mostra `title`, `situation`, `question`, le 3 `options` (scelta singola).
   - Al click su un'opzione:
     - se corretta → mostra `feedback.correct`, abilita "Avanti" allo stage successivo.
     - se sbagliata → mostra `feedback.incorrect`, l'utente può riprovare
       (nessun blocco); segna internamente che questo stage ha avuto
       **almeno un tentativo errato** (serve per il punteggio finale).
3. **Schermata esito finale**, calcolata così:
   - conta quanti stage su 6 hanno avuto almeno un tentativo errato al primo colpo (`mistakeCount`).
   - se `mistakeCount <= 1` → esito positivo: mostra `outcomes.positive.title`
     + `outcomes.positive.message` + il codice `gameConfig.lockerCode` in
     evidenza (grande, leggibile, pensato per essere letto a colpo d'occhio
     allo stand).
   - se `mistakeCount >= 2` → esito negativo: mostra `outcomes.negative.title`
     + `outcomes.negative.message`. NESSUN codice mostrato.
4. Nessun timer richiesto.
5. Nessuna persistenza dati necessaria (localStorage VIETATO); tutto lo
   stato vive in memoria per la sessione di gioco.

## Stile
- Tema agenzia digital marketing / dashboard analytics: palette chiara e
  vivace o dark mode con accenti "social" (a scelta, ma coerente con un
  contesto marketing/creative, distinto dal tema "terminale/SOC" già usato
  per cyber-shield).
- Leggibile da schermo touch/tablet allo stand fieristico: font grande,
  bottoni ampi, poco testo per schermata.
- Nessun font o asset caricato da CDN esterno: tutto locale, il gioco deve
  funzionare offline al 100% (stand fieristico, connessione non garantita).

## Vincoli
- Nessuna dipendenza di rete in runtime (fetch, CDN, font esterni, analytics).
- Nessun uso di localStorage/sessionStorage.
- Codice pulito e commentato, ma senza over-engineering: è un solo gioco,
  non serve un'architettura pensata per essere riusata da altri giochi.
- Non creare nulla al di fuori della cartella `campagna-digitale-smart/`
  di questo repo.

## Passi
1. Scaffold del progetto Vite vanilla come da struttura sopra.
2. Implementa la logica di gioco descritta.
3. `npm run build` e verifica che `dist/` sia generato correttamente con
   `base: "./"` (percorsi relativi, pronto per essere copiato dentro una
   sottocartella del sito Jekyll `its-your-future`).
4. Testa in locale (`npm run dev`) il flusso completo: intro → 6 stage →
   esito positivo e, separatamente, esito negativo (puoi forzare gli errori
   per verificare entrambi i rami).

## STOP — checkpoint di conferma
Non eseguire `git init`/`git commit`/`git push` su nessun repository.
Al termine riporta:
- struttura file creata,
- eventuali scelte fatte in autonomia (es. palette colori, micro-copy dei
  bottoni non specificati nel brief),
- conferma che `npm run build` ha prodotto un `dist/` funzionante.
Attendi conferma esplicita di Davide prima di qualunque commit, e prima di
copiare `dist/` dentro il repo del sito Jekyll.
