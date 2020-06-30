// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.


var btn = document.getElementById('btn');
var result = document.getElementById('result');

btn.addEventListener('click', function(){

  // genero un array di 16 numeri casuali tra 1 e 100
  var randomNumbersCPU = randomArray(1, 100, 16);

  if (randomNumbersCPU) {

    console.log(randomNumbersCPU);

    // chiedo all'utente di inserire 84 numeri da 1 a 100
    var randomNumbersUser = [];
    var number;
    var score = 0;

    var i = 1;
    do {

      number = parseInt(prompt("Inserisci il " + i + " numero"));

      while (!number || isNaN(number)) {
        alert("Attenzione: inserisci un numero");
        number = parseInt(prompt("Inserisci il " + i + " numero"));
      }

      while (inArray(randomNumbersUser,number)) {
        alert("Attenzione: hai già inserito quel numero");
        number = parseInt(prompt("Inserisci il " + i + " numero"));
      }

      randomNumbersUser.push(number);

      // Se il numero non è presente nella lista dei numeri generati, incremento il punteggio
      if (!inArray(randomNumbersCPU,number)) {
        score++;
        // Se il numero è presente nella lista dei numeri generati, la partita termina
      } else {
        alert("Hai beccato una mina!")
      }
      i++;
    } while (i<=10 && !inArray(randomNumbersCPU,number));

    console.log(score);

    result.innerHTML = "Hai totalizzato un punteggio di: " + score;
  } else {
    result.innerHTML = "Attenzione: i numeri consentiti sono minori degli elementi dell'array";
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
  for (var i = 0; i < array.length; i++) {
    if(array[i] == element) {
      return true;
    }
  }
  return false;
}

// funzione che restituisce un array di numeri casuali, non ripetuti, dando come parametri valore min, valore max e numero elementi. Se i parametri non sono corretti restituisce false
function randomArray(min, max, elements) {
  // controllo che i numeri consentiti siano maggiori degli elementi dell'array
  if (max-min >= elements-1) {
    var array = [];
    var random = 0;
    for (var i = 0; i < elements; i++) {
      random = getRandomIntInclusive(min, max);
      // controllo che i numeri generati non siano duplicati
      while (inArray(array,random)) {
        random = getRandomIntInclusive(min, max);
      }
      array.push(random);
    }
    return array;
  } else {
    return false;
  }
}
