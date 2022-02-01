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

    // RESETTO IL CAMPO DI GIOCO, STAMPANDO NELL'HTML IL VUOTO
    mainGrid.innerHTML = '';

    // AGGIUNGO CLASSE HIDDEN AL MESSAGGIO DI FINE GIOCO, PER NASCONDERLO
    document.getElementById('endgame').classList.add('hidden');

    // IMPOSTO UNA VARIABILE PER IL NUMERO DELLE BOMBE 
    const maxBombNumber = 16;
    console.log('Avvio del gioco');

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


    // COSTANTE PER RICHIAMARE FUNZIONE, PER GENERARE LE BOMBE, 
    // METTENDO IL NUMERO DI BOMBE DESIDERATE E IL NUMERO DI CELLE
    const bombComeArray = generateBombComeArray(numbersOfCells, maxBombNumber);
    console.log(bombComeArray);

    // CALCOLO IL NUMERO MASSIMO DI TENTATIVI CHE L'UTENTE PU0' FARE 
    const maxAttemps = parseInt(numbersOfCells - bombComeArray.lenght);

    // CREO UN ARRAY DOVE INSERISCO I TENTATIVI DELL'UTENTE - CELLE CLICCATE
    const rightAttemps = [];
    console.log('Tentativi utente: ' + rightAttemps);


    // CREO LE CELLE IN BASE ALLA SCELTA DEL LIVELLO SELEZIONATO
    // CICLO FOR PER FAR FUNZIONARE L'AZIONE
    for( let i = 1; i <= numbersOfCells; i++ ) {
        // GENERO LE CELLE CON LE RISPETTIVE DIMENSIONI IN BASE AL LIVELLO SELEZIONATO
        const newGeneratedCell = generateCellsItem(i, gridDimension);
        
        // AL CLICK RICHIAMO FUNZIONE CAMBIO DEL COLORE
        newGeneratedCell.addEventListener('click', cellsClick);
        mainGrid.appendChild(newGeneratedCell);
    }
    
    // FUNZIONE PER IL CLICK SULLA CELLA SCELTA
    function cellsClick() {
        // LEGGO IL VALORE DELLA CELLA CHE L'UTENTE HA CLICCATO
        const clickNumber = parseInt(this.querySelector('span').textContent);
        console.log('Al momento hai cliccato su: ' + clickNumber);

        // SE IL NUMERO E' PRESENTA NELLA LISTA DEGLI ARRAY / BOMBE GENERATE
        if (bombComeArray.includes(clickNumber)) {
            // LA CELLA SI COLORA DI ROSSO
            // E' STATA SELEZIONATA UNA CELLA BOMBA
            this.classList.add('red-bomb')
            endGame('perdita')
            // ALTRIMENTI 
        } else {
            // LA CELLA SI COLORA DI AZZURRO
            this.classList.add('active');
            // L'UTENTE CONTINUA IL GIOCO E CONTINUA A CLICCARE SULLE CELLE, MA NON SU QUELLE CLICCATE
            this.style.pointerEvents = "none";
            // IL NUMERO CLICCATO VIENE AGGIUNTO NELLA LISTA DEGLI ARRAY DELLE CELLE CLICCATE DALL'UTENTE
            rightAttemps.push(clickNumber);

            // TENTAIVI MASSIMI RAGGIUNTI, IL GIOCO FINISCE E L'UTENTE HA VINTO
            if (rightAttemps.lenght >= maxAttemps) {
                endGame('vittoria')
            }

        }

    }

    // FUNZIONE CHE DECRETA LA FINE DEL GIOCO, SE L'UTENTE HA PERSO O VINTO
    function endGame(result) {
        // VARIABILE PER IL MESSAGGIO DI FINE GIOCO
        let resultMessage;

        // CONDIZIONE PER DECRETARE LA VITTORIA
        if (result == 'vittoria') {
            // SE L'UTENTE HA VINTO - MESSAGGIO
            resultMessage = 'Congratulazioni sei il nuovo vincitore!'
        } else {
            // ALTRIMENTI L'UTENTE HA PERSO - MESSAGGIO
            resultMessage = 'Mi dispiace, hai perso! Hai effettuato ' + rightAttemps.length + ' tentativi!'
        }

        // MESSAGGIO DI FINE GIOCO
        const endGameText = document.getElementById('endgame');
        console.log('result' + endGameText);
        // STAMPA NELL'HTML IL RISULTATO
        endGameText.innerHTML = resultMessage;
        // RIMUOVO CLASSE HIDDEN PER RENDERE VISIBILE IL MESSAGGIO FINALE
        endGameText.classList.remove('hidden');

        // DECRETATA LA VITTORIA, IL GIOCO FINISCE
        // LE CELLE NON POSSONO PIU' ESSERE CLICCABIOLI, NESSUNA
        // DEVO SCEGLIERE IL LIVELLO E CLICCARE PLAY, RICOMINCIO, LANCIO UNA NUOVA PARTITA
        const allCells = document.getElementsByClassName('singlecell');

        // CICLO FOR PER POTER RICOMINCIARE
        for ( let i = 0; i < allCells.lenght; i++) {
            const thisCell = allCells[i];
            thisCell.style.pointerEvents = "none";
        }

    }

}


// CREARE LE BOMBE PER FAR FUNZIONARE IL CAMPO MINATO
// FUNZIONE CHE GENERA UN ARRAY DI 16 BOMBE / NUMERI CASUALI
function generateBombComeArray (maxNumber, maxBombNumber) {
    // CREO ARRAY VUOTO PER GENERARE LE BOMBE
    let bombGenerateArray = [];

    console.log(bombGenerateArray.length, maxBombNumber)

    while (bombGenerateArray.length < maxBombNumber) {
        const bombNumberRandom = getRandomNumber(1, maxNumber);
        console.log(bombNumberRandom)

        // SE bombGenerateArray NON INCLUDE UNA BOMBA, ALLORA CONTINUA
        if (!bombGenerateArray.includes(bombNumberRandom)) {
            // AGGIUNGO UN VALORE ALL'ARRAY CREATO
            bombGenerateArray.push(bombNumberRandom);
        }
    }

    return bombGenerateArray;
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
    // newCell.style.width = `calc(100% / ${cellDimention})`;
    // newCell.style.height = `calc(100% / ${cellDimention})`;

    // DIMENSIONE CELLE CALCOLATA DIRETTAMENTE CON JS
    const dimensione = `calc(100% / ${cellDimention})`
    newCell.style.width = dimensione;
    newCell.style.height = dimensione;

    // FINE FUNZIONE E TORNA A NEWCELL, VARIABILE INIZIALE
    return newCell;
}


// FUNZIONE CHE GENERA UN NUMERO CAUSALE
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
