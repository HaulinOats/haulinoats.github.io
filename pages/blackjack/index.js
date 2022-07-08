import { cards } from './cards.js';
let cardIdx;
let playerCards = [];
let playerTotal = 0;
let dealerCards = [];
let dealerTotal = 0;
let playerIsStanding = false;
let dealerIsStanding = false;
let dealerTurn = false;
let gameIsActive = true;

//store deck container
document.body.addEventListener('click', actionHandler);
document.body.addEventListener('transitionend', transitionEnd);
let topCardContainer = document.querySelector('.top-card-container');
let playerCardsContainer = document.querySelector('.player-cards-container');
let dealerCardsContainer = document.querySelector('.dealer-cards-container');
let standBtn = document.querySelector('.stand-btn');
let playerHeader = document.querySelector('#player-header');
let dealerHeader = document.querySelector('#dealer-header');
let playerStatus = document.querySelector('#player-status');
let dealerStatus = document.querySelector('#dealer-status');
let gameStatusText = document.getElementById('game-status-text');
let nextRoundBtn = document.querySelector('.next-round-btn');

startGame();

function actionHandler(e){
  let id = e.target.id;
  let classes = e.target.classList;

  //IDs
  switch(id){
    case "game-status-text":
      gameStatusText.classList.remove('show');
      break;
    default:
  }
  //Classes
  if(classes){
    classes.forEach(className=>{
      switch(className){
        case "deck-card-back-img":
          if(gameIsActive){
            playNextCard();
          }
          break;
        case "stand-btn":
          standBtn.classList.add('hide');
          playerStatus.textContent = "STANDING";
          playerIsStanding = true;
          dealerTurn = true;
          if(!dealerIsStanding){
            playNextCard();
          } else {
            checkEndResults();
          }
          break;
        case "next-round-btn":
          startNextRound();
          break;
        default:
      }
    })
  }
}

function transitionEnd(e){
  let id = e.target.id;
  let classes = e.target.classList;
  //IDs
  switch(id){
    default:
  }
  //Classes
  if(classes){
    classes.forEach(className=>{
      switch(className){
        case "deck-top-card":
          let cardNode = e.target.cloneNode(true);
          
          //remove card classes (card has finished flip) and card from top of deck container
          cardNode.classList.remove('flip-card', 'deck-top-card');
          e.target.remove();

          if(dealerTurn){
            dealerCards.push(cards[cardIdx]);
            dealerCardsContainer.appendChild(cardNode);
            dealerTotal = getCardTotals();
            dealerTurn = false;

            if(dealerTotal > 21){
              gameFinished('player');
            } else if(dealerTotal > 16 && dealerTotal <= 21){
              dealerStatus.textContent = "STANDING";
              dealerIsStanding = true;
              if(playerIsStanding){
                checkEndResults();
              }
            } else {
              if(playerIsStanding){
                dealerTurn = true;
                playNextCard();
              }
            }
          } else {
            playerCards.push(cards[cardIdx]);
            playerCardsContainer.appendChild(cardNode);
            playerTotal = getCardTotals();
            dealerTurn = true;

            if(playerTotal > 21){
              gameFinished('dealer');
            } else {
              if(dealerIsStanding){
                dealerTurn = false;
              } else {
                playNextCard();
              }
            }
          }

          highlightActivePlayer();
          buildAndPlaceTopCard();

          //keep dealing cards until both the dealer and player have 2 cards
          if(dealerCards.length < 2){
            playNextCard();
          }
          //enable 'stand' button after both players have been dealt 2 cards
          if(dealerCards.length === 2 && playerCards.length === 2){
            standBtn.removeAttribute('disabled');
          }
          break;
      }
    })
  }
}

function startGame(){
  cardIdx = -1;
  playerCards = [];
  playerTotal = 0;
  dealerCards = [];
  dealerTotal = 0;

  shuffle(cards);

  buildAndPlaceTopCard();
  playNextCard();
}

function startNextRound(){
  gameIsActive = true;
  dealerTurn = false;
  playerCards = [];
  playerTotal = 0;
  dealerCards = [];
  dealerTotal = 0;
  dealerIsStanding = false;
  playerIsStanding = false;

  if(cardIdx > 40){
    cardIdx = -1;
    shuffle(cards);
  }

  standBtn.setAttribute('disabled', true);

  //remove all cards from each player's container
  playerCardsContainer.querySelectorAll('.card').forEach(el=>{
    el.remove();
  })
  dealerCardsContainer.querySelectorAll('.card').forEach(el=>{
    el.remove();
  })

  playerStatus.textContent = "";
  dealerStatus.textContent = "";
  gameStatusText.classList.remove('show');
  nextRoundBtn.classList.remove('show');
  standBtn.classList.remove('hide');

  buildAndPlaceTopCard();
  playNextCard();
}

function highlightActivePlayer(){
  if(dealerTurn){
    dealerHeader.classList.add('active');
    playerHeader.classList.remove('active');
  } else {
    dealerHeader.classList.remove('active');
    playerHeader.classList.add('active');
  }
}

function getCardTotals(){
  let cards = dealerTurn ? dealerCards : playerCards;
  let cardTotal = 0;
  let totalAces = 0;

  cards.forEach(card=>{
    cardTotal += card.value;
    switch(card.name){
      case 'AC':
      case 'ADD':
      case 'AH':
      case 'AS':
        totalAces++;
        break;
    }
  })

  while(totalAces){
    if(cardTotal > 21){
      cardTotal -= 10;
    }
    totalAces--;
  }
  
  // console.log('------------------------');
  // console.log(dealerTurn ? 'DEALER' : 'PLAYER');
  // console.log('card total: ', cardTotal);
  // console.log('cards: ', cards);

  return cardTotal;
}

function checkEndResults(){
  standBtn.classList.add('hide');
  nextRoundBtn.classList.add('show');
  if(playerTotal > dealerTotal){
    gameFinished('player');
  } else if (playerTotal < dealerTotal) {
    gameFinished('dealer');
  } else {
    gameFinished('tie');
  }
}

function gameFinished(player){
  gameIsActive = false;
  standBtn.classList.add('hide');
  nextRoundBtn.classList.add('show');
  switch(player){
    case "player":
      gameStatusText.textContent = 'PLAYER WINS';
      break;
    case "dealer":
      gameStatusText.textContent = 'DEALER WINS';
      break;
    case "tie":
      gameStatusText.textContent = 'TIE';
      break;
  }
  gameStatusText.classList.add('show');
}

function playNextCard(){
  //timeout gives DOM time to build card html before initiating flip animation
  setTimeout(()=>{
    document.querySelector('.deck-top-card').classList.add('flip-card');
  }, 100);
}

function buildAndPlaceTopCard(){
  cardIdx++;
  let card = cards[cardIdx];

  //if card doesn't exist at index, shuffle deck, reset index, and set card
  if(!card){
    cardIdx = 0;
    shuffle(cards);
    card = cards[cardIdx];
  }

  let cardHtml = `
    <div data-name="${card.name}" data-value="${card.value}" class="deck-top-card card">
      <div class="deck-card-back">
        <img class="deck-card-back-img" src="img/back.svg" alt="card-back" />
      </div>
      <div class="deck-card-front">
        <img src="img/${card.name}.svg" alt="back" />
      </div>
    </div>`;
  topCardContainer.innerHTML = cardHtml;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}