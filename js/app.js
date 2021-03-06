"use strict";
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

let cardList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const cardIcons = cardList.concat(cardList);

let shuffledCards;
let cardContainer;
let openCards = [];
let matchedCards = [];
let moves = 0;
let movesContainer;
let starContainer = document.querySelector('.stars');

let totalSeconds = 0;
let timeInt = 0;
let timer;
let currentTimeTook;
let cardClicked = 0;

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

        //Timer on only first click
        if (cardClicked === 0) {
            timeInt = setInterval(startTimer, 1000);
        }

        if (openCards.length === 1) {
            //show open card
            card.classList.add('open', 'show', 'disable');

            if (currentOpenCard != previousOpenCard) {
                //add open card in array
                openCards.push(this);

                //compare card
                compareCard(currentOpenCard, previousOpenCard);
            }
        } else {
            //show open card
            currentOpenCard.classList.add('open', 'show');

            //add open card in array
            openCards.push(this);
        }
        rating(moves);
        cardClicked++;
    })
}

function compareCard(currentOpenCard, previousOpenCard) {
    //compare two open cards
    if (currentOpenCard.innerHTML === previousOpenCard.innerHTML) {
        //show if matched
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
            gameModal();
        }
    }, 300)
}

function restart() {
    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', function () {
        resetGame();
    })
}

function resetGame() {
    cardContainer.innerHTML = "";
    init();
    matchedCards = [];
    movesContainer.innerHTML = '0';
    rating(0);
    resetTimer();
    stopTimer();
    cardClicked = 0;
    moves = 0;
}

//increment the move counter and display it on the page
function addMoves() {
    moves++;
    movesContainer.innerHTML = moves;
}

function rating(moves) {
    //TODO make it better
    if (moves <= 10) {
        starContainer.innerHTML = "";
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>';
    } else if (moves > 10 && moves < 16) {
        starContainer.innerHTML = "";
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>';
    } else if (moves > 16) {
        starContainer.innerHTML = "";
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>';
    }
}

//Timer
function startTimer() {
    totalSeconds++;

    function addZero(i) {
        return (i < 10) ? `0` + i : i;
    }

    let min = addZero(Math.floor(totalSeconds / 60));
    let sec = addZero(totalSeconds - (min * 60));
    currentTimeTook = min + ':' + sec;
    timer.innerHTML = currentTimeTook;
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
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function gameModal() {
    let modal = document.getElementById('modal');
    let modalContent = document.getElementById('modal-content');
    let replayBtn = document.getElementById('modal-restart');

    let moveString = 'Total Moves: ' + moves;
    let timeString = 'Total Time: ' + currentTimeTook;
    modalContent.innerHTML =
        '<p>Congratulations! You matched all the cards!</p>' +
        '<p>' + moveString + '</p>' +
        '<span>Rating: </span>' + starContainer.innerHTML +
        '<p>' + timeString + '</p>';

    modal.style.display = 'block';

    replayBtn.addEventListener('click', function () {
        modal.style.display = 'none';

        moves = 0;
        resetGame();
    })
}

