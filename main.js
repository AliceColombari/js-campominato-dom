// INDICAZIONI JS-CAMPOMINATO-GRID
// utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// quando l'utente clicca sulla cella, la cella cliccata cambia colore

// INDICAZIONI JS-CAMPOMINATO-DOM || AGGIUNTA BOMBE
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// la cella si colora di rosso e la partita termina, 
// altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti
// Al termine della partita il software deve comunicare il punteggio


// SELEZIONO BUTTON PLAY, AL CLICK SU DI ESSO SI GENERA UN EVENTO -> APPARE GRIGLIA
const userPlay = document.getElementById('play');
userPlay.addEventListener('click', playGame);

// FUNZIONE INIZIALE PER POTER AVVIARE IL GIOCO
function playGame() {

    // NASCONDO LA SCRITTA DI AVVIO DEL GIOCO
    const introText = document.getElementById('intro-text');
    introText.classList.add('hidden');

    // ORA RENDO VISIBILE LA GRIGLIA DEL GIOCO
    const mainGrid = document.getElementById('grid');
    mainGrid.classList.remove('hidden');
    mainGrid.innerHTML = '';

    // SCELTA LIVELLO DA PARTE DEL GIOCATORE - SCELTA
    const userDifficulty = document.getElementById('leveltype').value;

    // VARIABILI CON DIVERSE CARATTERISTICHE IN BASE ALLA SCELTA DEL LIVELLO
    // VARIABILE PER NUMERO DI CELLE VISIBILI
    let numbersOfCells;
    // VARIABILE COLONNE SU UNA RIGA DELLA GRIGLIA
    let gridDimension;

    // CONDIZIONE IN BASE ALLA SCELTA DEL LIVELLO SELEZIONATO
    // SE LIVELLO SCELTO DALL'UTENTE == AL LIVELLO EASY
    // ALTRIMENTI ... ALTRE DUE OPZIONI DI LIVELLO HARD E CRAZY
    if(userDifficulty === 'easy') {
        numbersOfCells = 100;
        gridDimension = 10;
    } else if(userDifficulty === 'hard') {
        numbersOfCells = 81;
        gridDimension = 9;
    } else if(userDifficulty === 'crazy') {
        numbersOfCells = 49;
        gridDimension = 7;
    }


    // CREO LE CELLE IN BASE ALLA SCELTA DEL LIVELLO SELEZIONATO
    // CICLO FOR PER FAR FUNZIONARE L'AZIONE
    for( let i = 1; i <= numbersOfCells; i++ ) {
        // GENERO LE CELLE CON LE RISPETTIVE DIMENSIONI IN BASE AL LIVELLO SELEZIONATO
        const newGeneratedCell = generateCellsItem(i, gridDimension);
        
        // AL CLICK RICHIAMO FUNZIONE CAMBIO DEL COLORE
        newGeneratedCell.addEventListener('click', cellsClick);
        mainGrid.appendChild(newGeneratedCell);
    }
    
}


    // FUNZIONE CAMBIO DEL COLORE 
    function cellsClick() {
        // AL CLICK SULLA CELLA SCELTA CAMBIO IL COLORE ATTIVANDO LA CLASSE ACTIVE
        this.classList.add('active');   
    }
    
    // FUNZIONE CHE CREA GLI ELEMENTI ALL'INTERNO DELLA GRIGLIA + ARGOMENTI NUMERO E DIMENSIONE CELLA
    function generateCellsItem(number, cellDimention) {
        // VARIABILE CHE GENERA UN DIV - CONTENITORE CELLA DELLA GRIGLIA
        const newCell = document.createElement('div');
        // RICHIAMO VARIABILE E ASSEGNO LA CLASSE PRESA DAL CSS PER LA SINGOLA CELLA DELLA GRIGLIA
        newCell.classList.add('singlecell');
        // GENERO IL NUMERO DA INSERIRE ALL'INTERNO DELLA CELLA 
        newCell.innerHTML = `<span>${number}</span>`; 

        // IMPOSTO ALTEZZA E LARGHEZZA IN BASE ALLA DIMENSIONE DELLA CELLA SCELTA IN BASE AL LIVELLO SELEZIONATO
        // RICHIAMO VARIABILE NEWCELL E ASSEGNO CON LO STILE LE CARATTERISTICHE W + H
        // IN AUTOMATICO ANDRANNO A SELEZIONARSI LE DIMENSIONI DATE NEL CSS || CELL-EASY/HARD/CRAZY
        newCell.style.width = `calc(100% / ${cellDimention})`;
        newCell.style.height = `calc(100% / ${cellDimention})`;
        // FINE FUNZIONE E TORNA A NEWCELL, VARIABILE INIZIALE
        return newCell;
    }