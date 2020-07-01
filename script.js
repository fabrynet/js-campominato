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
  var min = 1;
  var max = 100;
  var elements = 16;
  var attempts = max - elements;
  var randomNumbersCPU = randomArray(min, max, elements);

  // se l'array è stato generato correttamente eseguo il programma
  if (randomNumbersCPU) {

    console.log(randomNumbersCPU);

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

    // do {
    //
    //   number = parseInt(prompt("Inserisci il " + i + " numero (da " + min + " a " + max + ")"));
    //
    //   // controllo che l'utente inserisca effettivamente un numero
    //   while (!number || isNaN(number)) {
    //     alert("Attenzione: inserisci un numero");
    //     number = parseInt(prompt("Inserisci il " + i + " numero (da " + min + " a " + max + ")"));
    //   }
    //   // controllo che l'utente inserisca un numero tra il min e il max
    //   while (number<min || number>max) {
    //     alert("Attenzione: inserisci un numero compreso tra " + min + " e " + max);
    //     number = parseInt(prompt("Inserisci il " + i + " numero (da " + min + " a " + max + ")"));
    //   }
    //   // controllo che l'utente non abbia inserito lo stesso numero
    //   while (inArray(attemptsUser,number)) {
    //     alert("Attenzione: hai già inserito quel numero");
    //     number = parseInt(prompt("Inserisci il " + i + " numero (da " + min + " a " + max + ")"));
    //   }
    //
    //   attemptsUser.push(number);
    //
    //   // Se il numero è presente nella lista dei numeri generati, la partita termina
    //   if (inArray(randomNumbersCPU,number)) {
    //     alert("Hai beccato una mina!");
    //     found = true;
    //     // Se il numero non è presente nella lista dei numeri generati, incremento il punteggio
    //   } else {
    //     score++;
    //   }
    //   i++;
    // } while (i<=10 && found == false);

  } else {
    result.innerHTML = "Attenzione: i tentativi sono minori o uguali delle mine";
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
// function randomArray(min, max, elements) {
//   // controllo che i numeri consentiti siano maggiori degli elementi dell'array
//   if (max-min >= elements-1) {
//     var array = [];
//     var random = 0;
//     for (var i = 0; i < elements; i++) {
//       random = getRandomIntInclusive(min, max);
//       // controllo che i numeri generati non siano duplicati
//       while (inArray(array,random)) {
//         random = getRandomIntInclusive(min, max);
//       }
//       array.push(random);
//     }
//     return array;
//   } else {
//     return false;
//   }
// }
