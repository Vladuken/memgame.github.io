




//var memory_array = ["A","A","B","B"];





//const deck = document.querySelector(".deck");

let size = prompt('Choose size of deck', 12);


const deck = document.getElementById('deck');
let openedCards = [];
let matchedCards = document.getElementsByClassName('match');
let cards =[];
let moves = 0;
function CreateArray(len){
  if (len<0 || len > 40){
    alert("Deck size is set to 12");
    len = 12};
  if (len % 2 == 1){
    len= len +  1;
  }
  return Array.from({length : len},(k,i)=>Math.floor(i / 2));
}
function StartGame(){
  moves = 0;
  let a = CreateArray(size);
  newBoard(a);
  cards = createCardArrayAndAddListeners();
  var shuffledCards = shuffle(cards);

  // loop to add event listeners to each card
  for (var i = 0; i < shuffledCards.length; i++){
    card = shuffledCards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
  };

  deck.innerHTML ="";
  for (var i= 0; i < shuffledCards.length; i++){
     [].forEach.call(shuffledCards, function(item){
        deck.appendChild(item);
     });
  }

}
window.onload = StartGame();
//shuffles cards in array
function shuffle(array){
  let currentIndex = array.length;
  let temp,randomIndex;

  while(currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function displayCard(){
   this.classList.toggle("open");
   this.classList.toggle("show");
   this.classList.toggle("disabled");
}



function newBoard(card_array){
  let output ="";
  for(let i = 0; i<card_array.length; i++){
    output+= '<div class="card" id="tile_'+i+'" type="A'+card_array[i]+'">'+card_array[i]+'</div>';
  }
  document.getElementById('deck').innerHTML = output;
}

// cards array holds all cards
function createCardArrayAndAddListeners(){
  let card = document.getElementsByClassName("card");
  let cards = [...card];
  // loop to add event listeners to each card
  for (var i = 0; i < cards.length; i++){
     cards[i].type = Math.floor(i / 2);
     cards[i].addEventListener("click", displayCard);
  };
  return cards;
}



////////////////////////////////////////////////////////////
function cardOpen(){
  openedCards.push(this);
  let len = openedCards.length;
  if(len === 2){
    moveCounter();
    if(openedCards[0].type === openedCards[1].type){
      matched();
    }else {
      unmatched();
    }
  }
}
let counter = document.querySelector(".counter");
function moveCounter(){
    moves++;
    counter.innerHTML = "Moves:" + moves;
    //start timer on first move
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}

    //game timer
  var second = 0, minute = 0;
  var timer = document.querySelector(".timer");
  var interval;
  function startTimer(){
      interval = setInterval(function(){
          timer.innerHTML = "Timer: "+minute+"mins "+second+"secs";
          second++;
          if(second == 60){
              minute++;
              second = 0;
          }
          if(minute == 60){
              hour++;
              minute = 0;
          }
      },1000);
  }

  //modal
  let modal = document.getElementById("popup1")
  //stars list
  //close icon in modal
  let closeicon = document.querySelector(".close");
  //congratulations when all cards match, show modal and moves, time and rating
  function congratulations(){
      if (matchedCards.length == document.getElementsByClassName("card").length){
          clearInterval(interval);
          let finalTime = timer.innerHTML;
          //show congratulations modal
          modal.classList.add("show");
          //showing move, rating, time on modal
          document.getElementById("finalMove").innerHTML = moves;
          document.getElementById("totalTime").innerHTML = finalTime;
          //closeicon on modal
          closeModal();

      };
  }

  //close icon on modal
  function closeModal(){
      closeicon.addEventListener("click", function(e){
          modal.classList.remove("show");
          StartGame();
      });
  }
  //for player to play Again
  function playAgain(){
      modal.classList.remove("show");
      StartGame();
  }

//for when cards match
function matched(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}

//for when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    },700);
}

//disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

//enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCards.length; i++){
            matchedCards[i].classList.add("disabled");
        }
    });
}


//win
