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

btn.addEventListener('click', function(){

  var level = parseInt(prompt("Scegli il livello di difficoltà (da 0 a 2)"));

  // controllo che l'utente inserisca effettivamente un numero
  while (isNaN(level)) {
    alert("Attenzione: inserisci un numero");
    level = parseInt(prompt("Scegli il livello di difficoltà (da 0 a 2)"));
  }
  // controllo che l'utente inserisca effettivamente un numero da 0 a 2
  while (level<0 || level>2) {
    alert("Attenzione: inserisci un numero da 0 a 2");
    level = parseInt(prompt("Scegli il livello di difficoltà (da 0 a 2)"));
  }
  console.log(level);

  // genero un array di numeri casuali a seconda del livello scelto
  switch (level) {
    case 0:
      var min = 1;
      var max = 100;
      var elements = 16;
      // genero un array di 16 numeri casuali tra 1 e 100
      var randomNumbersCPU = randomArray(min, max, elements);
      break;
    case 1:
    // genero un array di 16 numeri casuali tra 1 e 80
      var min = 1;
      var max = 80;
      var elements = 16;
      var randomNumbersCPU = randomArray(min, max, elements);
      break;
    case 2:
      // genero un array di 16 numeri casuali tra 1 e 50
      var min = 1;
      var max = 50;
      var elements = 16;
      var randomNumbersCPU = randomArray(min, max, elements);
      break;
  }

  var attempts = max - elements;

  console.log(randomNumbersCPU);

  // se l'array è stato generato correttamente eseguo il programma
  if (randomNumbersCPU) {

    // chiedo all'utente di inserire 84 numeri da 1 a 100
    var attemptsUser = [];
    var number;
    var score = 0;

    var i = 1;
    var found = false;

    // ciclo finchè ho raggiunto il numero massimo di tentativi e finchè non trovo una mina
    while (attemptsUser.length < attempts && found == false) {
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
      } else if(inRange(min, max, number) && !inArray(randomNumbersCPU, number)) {
        attemptsUser.push(number);
        score++;
        i++;
      }
    }

    if (score == attempts) {
      result.innerHTML = "Hai vinto! Hai totalizzato un punteggio di: " + score;
    } else {
      result.innerHTML = "Hai perso. Hai totalizzato un punteggio di: " + score;
    }

  } else {
    result.innerHTML = "Attenzione: i tentativi sono minori o uguali alle mine";
  }

});

// Funzioni

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

// funzione che restituisce un array di numeri casuali, non ripetuti, dando come parametri valore min, valore max e numero elementi. Se i parametri non sono corretti restituisce false
function randomArray(min, max, elements) {
  // controllo che i numeri consentiti siano maggiori degli elementi dell'array
  if (max-min >= elements-1) {
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
  } else {
    return false;
  }
}
