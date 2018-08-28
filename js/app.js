/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


/*
 * Create a list that holds all of your cards
 */
let cardIcons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
let shuffledCards;
let cardContainer;
let openCards = [];
let matchedCards = [];
let moves = 0;
let movesContainer;
let endTime;
let starContainer;

let totalSeconds = 0;
let timeInt = 0;
let timer;

document.addEventListener('DOMContentLoaded', function () {
    init();
    restart();
});

function init() {
    movesContainer = document.querySelector('.moves');
    timer = document.querySelector('.timer');
    timer.innerHTML = '00:00';

    shuffledCards = shuffle(cardIcons);
    displayCards(shuffledCards);
}

//display the card's symbol
function displayCards(arrays) {
    cardContainer = document.querySelector('.deck');

    for (let i = 0; i < arrays.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = "<i class='" + arrays[i] + "'></i>";
        cardContainer.appendChild(card);

        //click event to each card
        click(card);
    }
}

/**
 set up the event listener for a card. If a card is clicked:
 click on card event, if the cards do match, lock the cards in the open position, if the cards do not match, remove the cards from the list
 */
function click(card) {
    card.addEventListener('click', function () {
        const currentOpenCard = this;
        const previousOpenCard = openCards[0];

        timeInt = setInterval(startTimer, 1000);

        if (openCards.length === 1) {
            //show open card
            card.classList.add('open', 'show', 'disable');

            //add open card in array
            openCards.push(this);

            //compare card
            compareCard(currentOpenCard, previousOpenCard);

        } else {
            //show open card
            currentOpenCard.classList.add('open', 'show');

            //add open card in array
            openCards.push(this);
        }
        rating(moves);
    })
}

function compareCard(currentOpenCard, previousOpenCard) {
    //compare two open cards
    if (currentOpenCard.innerHTML === previousOpenCard.innerHTML) {
        //show if matched
        console.log("matched"); //TODO
        currentOpenCard.classList.add('match');
        previousOpenCard.classList.add('match');

        matchedCards.push(currentOpenCard, previousOpenCard);

        openCards = [];

        isGameOver();
    } else {
        //don't show if not matched
        setTimeout(function () {
            currentOpenCard.classList.remove('open', 'show', 'disable');
            previousOpenCard.classList.remove('open', 'show', 'disable');
            openCards = [];
        }, 300);
    }
    //add move
    addMoves();
}

// display a message with the final score
function isGameOver() {
    setTimeout(function () {
        if (cardIcons.length === matchedCards.length) {
            stopTimer();
            endTime = new Date().getTime();
            //TODO add modal to show successful / unsuccessful game

            alert('CONGRATULATIONS\nHooray! You matched all cards.\nTotal Moves: ' + moves + '.\nTotal Time: ');
        }
    }, 300)
}

function restart() {
    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', function () {
        cardContainer.innerHTML = "";
        init();
        matchedCards = [];
        movesContainer.innerHTML = '0';
        rating(0);
        resetTimer();
    })
}

//increment the move counter and display it on the page
function addMoves() {
    moves++;
    movesContainer.innerHTML = moves;
}

function rating(moves) {
    starContainer = document.querySelector('.stars');
    //TODO make it better
    if (moves <= 9) {
        starContainer.innerHTML = "";
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>';
    } else if (moves > 9 && moves < 15) {
        starContainer.innerHTML = "";
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>';
    } else if (moves > 15) {
        starContainer.innerHTML = "";
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>';
    }
}

//Timer
function startTimer() {
    ++totalSeconds;

    function addZero(i) {
        return (i < 10) ? `0` + i : i;
    }

    let min = addZero(Math.floor(totalSeconds / 60));
    let sec = addZero(totalSeconds - (min * 60));
    timer.innerHTML = min + ':' + sec;
}

function resetTimer() {
    clearInterval(timeInt);
    totalSeconds = 0;
    timer.innerHTML = '00:00';
}

function stopTimer() {
    clearInterval(timeInt)
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


