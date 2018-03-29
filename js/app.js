
const gameState= {
    cards: [
        {
            name: 'anchor',
            class: 'card',
            icon: 'fa fa-anchor'
        },
        {
            name: 'anchor',
            class: 'card',
            icon: 'fa fa-anchor'
        },
        {
            name: 'bicycle',
            class: 'card',
            icon: 'fa fa-bicycle'
        },
        {
            name: 'bicycle',
            class: 'card',
            icon: 'fa fa-bicycle'
        },
        {
            name: 'bolt',
            class: 'card',
            icon: 'fa fa-bolt'
        },
        {
            name: 'bolt',
            class: 'card',
            icon: 'fa fa-bolt'
        },
        {
            name: 'bomb',
            class: 'card',
            icon: 'fa fa-bomb'
        },
        {
            name: 'bomb',
            class: 'card',
            icon: 'fa fa-bomb'
        },
        {
            name: 'cube',
            class: 'card',
            icon: 'fa fa-cube'
        },
        {
            name: 'cube',
            class: 'card',
            icon: 'fa fa-cube'
        },
        {
            name: 'diamond',
            icon: 'fa fa-diamond',
            class: 'card'
        },
        {
            name: 'diamond',
            class: 'card',
            icon: 'fa fa-diamond'
        },
        {
            name: 'leaf',
            class: 'card',
            icon: 'fa fa-leaf'
        },
        {
            name: 'leaf',
            class: 'card',
            icon: 'fa fa-leaf'
        },
        {
            name: 'plane',
            class: 'card',
            icon: 'fa fa-paper-plane-o'
        },
        {
            name: 'plane',
            class: 'card',
            icon: 'fa fa-paper-plane-o'
        }
    ],
    state: ['open', 'match', 'mismatch'],
    counts: 0,
    moves: 0,
    openCards: [],
    stars: 3
};

const gameController = {
    cardOpen() {
        return gameState.state[0];
    },
    cardMatch() {
        return gameState.state[1];
    },
    cardMismatch() {
        return gameState.state[2];
    },
    getCards() {
        return gameState.cards;
    },
    getOpenCards() {
        return gameState.openCards;
    },
    getCounts() {
        return gameState.counts;
    },
    getMoves() {
        return gameState.moves;
    },
    getStars() {
        return gameState.stars;
    },
    // Shuffle function from http://stackoverflow.com/a/2450976
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    },
    addCount() {
        return memoryModel.counts += 2;
    },

    addMoves() {
        return memoryModel.moves += 1;
    },
    reloadGame() {
        location.reload();
    }
};

const gameView = {
    render() {
        const cards = gameController.getCards();
        const openCards = gameController.getOpenCards();
        const open =gameController.cardOpen();
        const match = gameController.cardMatch();
        const mismatch = gameController.cardMismatch();

        gameController.shuffle(cards);

        for (let card of cards) {
            let liElem = document.createElement('li');
            let iElem = document.createElement('i');
            liElem.classList.add(card.class, card.name);
            iElem.className = card.icon;
            liElem.appendChild(iElem);
            this.deck.appendChild(liElem);
            liElem.addEventListener('click', function() {
                let stars = gameController.getStars();
                let nMoves = gameController.getMoves();
                if (liElem.classList.contains(open)) {
                    return false;
                }
                else {
                    gameController.addmoves();
                    if (nMoves > 28 && nMoves <= 40) {
                        stars = 2;

                    } 
                    else if (nMoves > 40) {
                        stars = 1;
                    }
                    liElem.classList.add(open);
                    openCards.push(liElem);
                    if (openCards.length === 2) {
                        let card1 = openCards[0];
                        let card2 = openCards[1];
                        if (card1.classList.contains(card.name) && card2.classList.contains(card.name)) {
                            gameController.addCount();
                            card1.classList.add(match);
                            card2.classList.add(match);
                            gameController.clearList(openCards);
                        }
                        else {
                            card1.classList.add(mismatch);
                            card2.classList.add(mismatch);
                        }
                    }
                    if (gameModel.counter === 16) {
                        // End game
                        console.log("Congratulations!");
                    }
                }
            });
        }
    }   
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
