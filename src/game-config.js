// game-config.js — CAMPAGNA DIGITALE SMART
// Progetto standalone (stesso pattern di "cyber-shield": repo a sé stante,
// build copiata poi nel sito Jekyll its-your-future).
//
// Obiettivo didattico: il Digital Media Specialist progetta strategie
// digitali, produce contenuti, gestisce social, advertising, SEO,
// analytics e reportistica.

export const gameConfig = {
  id: "campagna-digitale-smart",
  title: "Campagna Digitale Smart",
  subtitle: "Digital Media Specialist Challenge",
  intro: {
    context:
      "Siete appena entrati in un'agenzia di digital marketing. Un cliente " +
      "vuole lanciare una borraccia smart eco-friendly e ha bisogno del " +
      "vostro aiuto: dovete definire il target, il canale, il contenuto, " +
      "l'obiettivo pubblicitario e leggere i primi dati per ottimizzare " +
      "la campagna.",
  },
  stages: [
    {
      id: 1,
      title: "Definire il target",
      situation:
        "Il cliente vi chiede: a chi dobbiamo parlare per una campagna test?",
      question: "Qual è il target più adatto per il lancio della borraccia smart?",
      options: [
        { id: "a", text: "Giovani sportivi e studenti attenti a tecnologia e sostenibilità", correct: true },
        { id: "b", text: "Manager over 50 interessati a prodotti di lusso classico", correct: false },
        { id: "c", text: "Bambini sotto i 10 anni", correct: false },
      ],
      feedback: {
        correct: "Corretto. Una buona campagna parte dal pubblico giusto.",
        incorrect: "Non è il target più coerente con il prodotto: rivedi chi useresti davvero una borraccia smart eco-friendly.",
      },
    },
    {
      id: 2,
      title: "Scegliere il canale",
      situation:
        "Il target individuato consuma soprattutto video brevi e contenuti in trend.",
      question: "Quale canale scegli per la campagna?",
      options: [
        { id: "a", text: "TikTok / Instagram Reels", correct: true },
        { id: "b", text: "Email marketing", correct: false },
        { id: "c", text: "LinkedIn Ads", correct: false },
      ],
      feedback: {
        correct: "Corretto. Il canale va scelto in base al comportamento del pubblico.",
        incorrect: "Non è il canale più coerente con un pubblico giovane che consuma video brevi e trend.",
      },
    },
    {
      id: 3,
      title: "Costruire il contenuto",
      situation:
        "Dovete decidere il formato più efficace per presentare il prodotto.",
      question: "Quale contenuto funziona meglio?",
      options: [
        { id: "a", text: "Video breve con beneficio chiaro e call to action", correct: true },
        { id: "b", text: "Lungo articolo tecnico senza immagini", correct: false },
        { id: "c", text: "Foto statica senza testo né contesto", correct: false },
      ],
      feedback: {
        correct: "Corretto. Il contenuto deve essere chiaro, visivo e orientato all'azione.",
        incorrect: "Non è il formato più efficace per il canale e il target scelti: manca chiarezza, visività o call to action.",
      },
    },
    {
      id: 4,
      title: "Impostare la sponsorizzata",
      situation:
        "L'obiettivo di questa fase è far conoscere il prodotto a un pubblico nuovo.",
      question: "Quale obiettivo pubblicitario imposti?",
      options: [
        { id: "a", text: "Awareness / Copertura / Visualizzazioni", correct: true },
        { id: "b", text: "Conversioni dirette all'acquisto", correct: false },
        { id: "c", text: "Fidelizzazione dei clienti già esistenti", correct: false },
      ],
      feedback: {
        correct: "Corretto. L'obiettivo pubblicitario deve essere coerente con la fase del funnel.",
        incorrect: "Non è coerente con la fase di lancio: qui l'obiettivo è farsi conoscere, non vendere subito o fidelizzare.",
      },
    },
    {
      id: 5,
      title: "Leggere i dati",
      situation:
        "Dovete misurare quante persone, tra chi ha visto l'annuncio, ci hanno anche cliccato.",
      question: "Quale metrica usi?",
      options: [
        { id: "a", text: "CTR, come rapporto tra click e visualizzazioni", correct: true },
        { id: "b", text: "ROAS, come rapporto tra ricavo e spesa pubblicitaria", correct: false },
        { id: "c", text: "Reach, come numero di persone raggiunte", correct: false },
      ],
      feedback: {
        correct: "Corretto. Analytics trasformano i dati in decisioni di miglioramento.",
        incorrect: "Non è la metrica giusta per misurare il passaggio da visualizzazione a click.",
      },
    },
    {
      id: 6,
      title: "Ottimizzare la campagna",
      situation:
        "I dati mostrano molti click sull'annuncio, ma pochi acquisti effettivi.",
      question: "Come intervieni per migliorare i risultati?",
      options: [
        { id: "a", text: "Migliorare la pagina prodotto e attivare automation/retargeting", correct: true },
        { id: "b", text: "Aumentare solo il budget pubblicitario", correct: false },
        { id: "c", text: "Cambiare canale senza analizzare i dati", correct: false },
      ],
      feedback: {
        correct: "Corretto. Il lavoro digitale continua dopo il primo click.",
        incorrect: "Non risolve il problema: il traffico arriva già, serve migliorare la conversione a valle del click.",
      },
    },
  ],
  outcomes: {
    positive: {
      title: "Brief approvato",
      message: "Benvenuto nel team Digital Media Specialist digitale.",
    },
    negative: {
      title: "Campagna da rivedere",
      message: "Servono nuove verifiche su target, contenuti, canali, advertising e dati.",
    },
  },
};
