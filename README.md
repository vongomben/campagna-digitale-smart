# Campagna Digitale Smart

Mini-gioco Digital Media Specialist per **IT'S YOUR FUTURE** (ITS Accademia Digitale).

Repo a sé: Vite vanilla, nessuna dipendenza di rete a runtime. La cartella `dist/` si copia poi nella sottocartella Jekyll del sito.

## Avvio

```powershell
npm install
npm run dev
```

Apri l’indirizzo che stampa Vite (di solito http://localhost:5173/).

## Build per il sito

```powershell
npm run build
```

`vite.config.js` usa `base: "./"`: i percorsi in `dist/` sono relativi, pronti per una sottocartella Jekyll (stesso schema di lanterna e cyber-shield).

Non copiare `dist/` nel sito finché Davide non conferma.

## Gioco

- 6 stage sequenziali, una risposta alla volta; se sbagli puoi riprovare.
- Esito positivo se al massimo **1** stage ha avuto un tentativo errato: in quel caso compare il codice locker.
- Esito negativo da **2** errori in su: nessun codice.
- Niente timer, niente `localStorage`.

## Note

- `lockerCode` in `src/game-config.js` è ancora **provvisorio** (`3958`): da allineare al registro locker prima del commit.
- La soglia errori (`MAX_MISTAKES_FOR_SUCCESS` in `src/main.js`) è un’assunzione da confermare.
