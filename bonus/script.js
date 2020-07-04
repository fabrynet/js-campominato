// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
// BONUS: (da fare solo se funziona tutto il resto)
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 =>  tra 1 e 80
// con difficoltà 2 => tra 1 e 50

var btn = document.getElementById('btn');
var result = document.getElementById('result');

btn.addEventListener('click', function() {

  // genero un array di numeri casuali a seconda del livello scelto
  var level;
  var levelMin = 0;
  var levelMax = 2;
  var min = 1;
  var max;
  var elements = 16;

  do {
    level = parseInt(prompt("Scegli il livello di difficoltà (da 0 a 2)"));
    switch (level) {
      case 0:
        // genero un array di 16 numeri casuali tra 1 e 100
        max = 100;
        break;
      case 1:
        // genero un array di 16 numeri casuali tra 1 e 80
        max = 80;
        break;
      case 2:
        // genero un array di 16 numeri casuali tra 1 e 50
        max = 50;
        break;
      default:
        alert("Attenzione: inserisci un livello compreso tra " + levelMin + " e " + levelMax);
        break;
    }
  } while (!inRange(levelMin, levelMax, level));

  if (max-min >= elements-1) {
    startGame(elements, min, max);
  } else {
    result.innerHTML = "Attenzione: i tentativi sono minori o uguali alle mine";
  }

});

// --------------------------- FUNCTIONS Utility --------------------------- //

// funzione che genera un numero casuale compreso tra i due parametri min e max
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}

// funzione che controlla se un elemento è presente nell'array
function inArray(array, element) {
  var i = 0;
  var found = false;
  while (i < array.length && found == false) {
    if(array[i] == element) {
      found = true;
    }
    i++;
  }
  return found;
}

// funzione che controlla se un numero sia nel range voluto
function inRange(min, max, num) {
  if(num >= min && num <= max && !isNaN(num)) {
    return true;
  }
  return false;
}

// --------------------------- FUNCTIONS Avvio --------------------------- //
function startGame (elements, min, max) {

  // controllo che l'utente inserisca effettivamente un livello da 0 a 2
  // do {
  //   level = parseInt(prompt("Scegli il livello di difficoltà (da 0 a 2)"));
  //   if (!inRange(levelMin, levelMax, level)) {
  //     alert("Attenzione: inserisci un livello compreso tra " + levelMin + " e " + levelMax);
  //   }
  // } while (!inRange(levelMin, levelMax, level));

  var randomNumbersCPU = randomArray(elements, min, max);
  var attempts = max - elements;

  console.log(randomNumbersCPU);

  var attemptsUser = [];
  var number;
  var score = 0;

  var i = 1;
  var found = false;

  // chiedo all'utente di inserire tot numeri, in base al livello scelto, da 1 a 100
  // ciclo finchè ho raggiunto il numero massimo di tentativi e finchè non trovo una mina
  while (attemptsUser.length < attempts && !found) {
    number = parseInt(prompt("Inserisci il " + i + " numero (da " + min + " a " + max + ")"));
    // se il numero inserito dall'utente è già presente nell'array lancio un alert ed esco dal ciclo
    if (inArray(attemptsUser,number)) {
      alert("Attenzione: hai già inserito questo numero");
      // se il numero inserito dall'utente non è nel range lancio un alert ed esco dal ciclo
    } else if (!inRange(min, max, number)) {
      alert("Attenzione: inserisci un numero compreso tra " + min + " e " + max);
      // Se il numero è una mina la partita termina
    } else if (inArray(randomNumbersCPU, number)) {
      alert("Hai beccato una mina!");
      found = true;
      // altrimenti dopo aver superato tutte le condizioni aggiungo il numero tra i numeri inseriti e incremento il punteggio e il contatore del ciclo
    } else {
      attemptsUser.push(number);
      score++;
      i++;
    }
  }

  if (score == attempts) {
    result.innerHTML = "Hai vinto! Hai totalizzato " + score + " punti.";
  } else {
    result.innerHTML = "Hai perso. Hai totalizzato " + score + " punti.";
  }

}

// funzione che restituisce un array di numeri casuali, non ripetuti, dando come parametri valore min, valore max e numero elementi. Se i parametri non sono corretti restituisce false
function randomArray(elements, min, max) {
  var array = [];
  var random;
  while (array.length < elements) {
    random = getRandomIntInclusive(min, max);
    // controllo che i numeri generati non siano duplicati
    if (!inArray(array,random)) {
      array.push(random);
    }
  }
  return array;
}
