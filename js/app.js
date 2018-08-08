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
let startTime;
let endTime;
let totalTime;
let starContainer;

document.addEventListener('DOMContentLoaded', function () {
    init();
    restart();
});

function init() {
    shuffledCards = shuffle(cardIcons);
    displayCards(shuffledCards);
}


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

//click on card event
function click(card) {
    card.addEventListener('click', function () {
        const currentOpenCard = this;
        const previousOpenCard = openCards[0];

        startTime = new Date().getTime();

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
        console.log("not matched"); //TODO
        setTimeout(function () {
            currentOpenCard.classList.remove('open', 'show', 'disable');
            previousOpenCard.classList.remove('open', 'show', 'disable');
            openCards = [];
        }, 300);
    }
    //add move
    movesContainer = document.querySelector('.moves');
    addMoves(movesContainer);
}

function isGameOver() {
    setTimeout(function () {
        if (cardIcons.length === matchedCards.length) {
            endTime = new Date().getTime();
            totalTime = endTime - startTime;
            //TODO add modal to show successful / unsuccessful game

            alert('GAME OVER\nHooray! You matched all cards.\nTotal Moves: ' + moves + '.\nTotal Time: ' + (totalTime / 1000) + "S");
            rating(moves);
        }
    }, 300)
}

function restart() {
    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', function () {
        cardContainer.innerHTML = "";
        init();
        matchedCards = [];
        starContainer.innerHTML = "";
    })
}

function addMoves(movesContainer) {
    moves++;
    movesContainer.innerHTML = moves;
}

function rating(moves) {
    starContainer = document.querySelector('.stars');
    if (moves === 8) {
        //TODO make it better
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>';
    } else if (moves > 8 && moves < 11) {
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>';
    } else if (moves > 10 && moves < 16) {
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>';
    } else if (moves > 15 && moves < 21) {
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>';
    } else if (moves > 20) {
        starContainer.innerHTML = '<li><i class="fa fa-star"></i></li>';
    } else if (moves === 0) {
        starContainer.innerHTML = "";
    }

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
