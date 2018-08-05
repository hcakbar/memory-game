let cardIcons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
let openCards = [];
let matchedCards = [];
//TODO move this to inside the methods

document.addEventListener('DOMContentLoaded', function () {

    console.log('list of cardIcons: ' + cardIcons); //TODO
    // let shuffledCards = shuffle(cardIcons); //TODO
    // console.log('Shuffle cardIcons: ' + shuffledCards); //TODO
    displayCards(cardIcons); //TODO

});

/*
 * Create a list that holds all of your cards
 */


function displayCards(arrays) {
    const cardContainer = document.querySelector('.deck');
    // let openCards = [];

    for (let i = 0; i < arrays.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = "<i class='" + arrays[i] + "'></i>";
        cardContainer.appendChild(card);

        card.addEventListener('click', function () {
            const currentOpenCard = this;
            const previousOpenCard = openCards[0];

            if (openCards.length === 1) {
                //show open card
                card.classList.add('open', 'show');

                //add open card in array
                openCards.push(this);

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
                    openCards = [];
                    console.log("not matched"); //TODO
                    setTimeout(function () {
                        currentOpenCard.classList.remove('open', 'show');
                        previousOpenCard.classList.remove('open', 'show');
                    }, 500);
                }
            } else {
                //show open card
                currentOpenCard.classList.add('open', 'show');

                //add open card in array
                openCards.push(this);
            }
        })
    }
}

function isGameOver() {
    if (cardIcons.length === matchedCards.length) {
        alert('game over'); //TODO
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
