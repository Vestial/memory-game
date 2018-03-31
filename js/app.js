const gameState = {
  cards: [
    {
      name: "anchor",
      class: "card",
      icon: "fa fa-anchor"
    },
    {
      name: "anchor",
      class: "card",
      icon: "fa fa-anchor"
    },
    {
      name: "bicycle",
      class: "card",
      icon: "fa fa-bicycle"
    },
    {
      name: "bicycle",
      class: "card",
      icon: "fa fa-bicycle"
    },
    {
      name: "bolt",
      class: "card",
      icon: "fa fa-bolt"
    },
    {
      name: "bolt",
      class: "card",
      icon: "fa fa-bolt"
    },
    {
      name: "bomb",
      class: "card",
      icon: "fa fa-bomb"
    },
    {
      name: "bomb",
      class: "card",
      icon: "fa fa-bomb"
    },
    {
      name: "cube",
      class: "card",
      icon: "fa fa-cube"
    },
    {
      name: "cube",
      class: "card",
      icon: "fa fa-cube"
    },
    {
      name: "diamond",
      icon: "fa fa-diamond",
      class: "card"
    },
    {
      name: "diamond",
      class: "card",
      icon: "fa fa-diamond"
    },
    {
      name: "leaf",
      class: "card",
      icon: "fa fa-leaf"
    },
    {
      name: "leaf",
      class: "card",
      icon: "fa fa-leaf"
    },
    {
      name: "plane",
      class: "card",
      icon: "fa fa-paper-plane-o"
    },
    {
      name: "plane",
      class: "card",
      icon: "fa fa-paper-plane-o"
    }
  ],
  state: ["open", "match", "mismatch"],
  stars: 3,
  moves: 0,
  counts: 0,
  openCards: []
};

const gameController = {
  init() {
    gameView.init();
  },

  addCount() {
    return (gameState.counts += 2);
  },

  addMoves() {
    return (gameState.moves += 1);
  },

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

  getStars() {
    return gameState.stars;
  },

  showNumMoves() {
    let moves = gameState.moves;
    moves % 2 === 0 ? (moves /= 2) : null;
    return moves;
  },

  // Shuffle function from http://stackoverflow.com/a/2450976
  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  restart() {
    location.reload();
  },

  clearList(arr) {
    arr.length = 0;
    return arr;
  }
};

const gameView = {
  init() {
    //DOM selectors
    const restartButton = document.getElementsByClassName("restart")[0];
    const scorePanelBtnReload = document.getElementById("reload-button");
    this.deck = document.getElementsByClassName("deck")[0];
    this.scorePanel = document.getElementsByClassName("score-panel")[0];
    this.overlay = document.getElementById("bodyOverlay");
    this.movesCount = document.getElementsByClassName("moves")[0];
    this.movesCountPopup = document.getElementById("congratulationsMoves");
    this.gameTimer = document.getElementById("gameTimer");
    this.congratulationsTimer = document.getElementById("congratulationsTimer");
    this.congratulationsScreen = document.getElementById(
      "congratulations-screen"
    );
    this.star1 = document.getElementById("star1");
    this.star2 = document.getElementById("star2");
    this.star1_congrats = document.getElementById("star1-congrats");
    this.star2_congrats = document.getElementById("star2-congrats");

    // Create a new timer object
    this.watch = new timer(this.congratulationsTimer, this.gameTimer);

    // Event listeners for restarting the game
    scorePanelBtnReload.addEventListener("click", () =>
      gameController.restart()
    );
    restartButton.addEventListener("click", () => gameController.restart());

    this.render();
  },

  render() {
    // Card lists
    const cards = gameController.getCards();
    const openCards = gameController.getOpenCards();

    // Shuffle cards
    gameController.shuffle(cards);

    // Card states
    const open = gameController.cardOpen();
    const match = gameController.cardMatch();
    const mismatch = gameController.cardMismatch();

    for (let card of cards) {
      // Create i and li elements
      let iElem = document.createElement("i");
      let liElem = document.createElement("li");

      // Assign values to the created elements
      iElem.className = card.icon;
      liElem.classList.add(card.class, card.name);

      // Append elements
      liElem.appendChild(iElem);
      this.deck.appendChild(liElem);

      // Sets up the event listener
      liElem.addEventListener("click", function() {
        let stars = gameController.getStars();
        let numMoves = gameController.showNumMoves();

        // Prevent user from pushing an opened card
        if (liElem.classList.contains(open)) {
          return false;
        } else {
          gameController.addMoves();
          gameView.watch.start();

          // Removes stars depending on the number of moves
          if (numMoves > 28 && numMoves < 38) {
            gameView.star2.style.color = "rgba(255, 255, 255, 0.2)";
            gameView.star2_congrats.style.color = "rgba(255, 255, 255, 0.2)";
            stars = 2;
          } else if (numMoves >= 38) {
            gameView.star1.style.color = "rgba(255, 255, 255, 0.2)";
            gameView.star1_congrats.style.color = "rgba(255, 255, 255, 0.2)";
            stars = 1;
          }

          liElem.classList.add(open);
          openCards.push(liElem);

          // If the list already has another card, check to see if the two cards match
          if (openCards.length === 2) {
            let card1 = openCards[0];
            let card2 = openCards[1];

            if (
              card1.classList.contains(card.name) &&
              card2.classList.contains(card.name)
            ) {
              gameController.addCount();
              card1.classList.add(match);
              card2.classList.add(match);
              gameController.clearList(openCards);
              gameView.movesCount.textContent = gameController.showNumMoves();
              gameView.movesCountPopup.textContent = gameController.showNumMoves();
            } else {
              // Adds overlay in case the user tries to click on multiple cards too fast
              gameView.overlay.classList.add("overlay");
              card1.classList.add(mismatch);
              card2.classList.add(mismatch);

              gameView.movesCount.textContent = gameController.showNumMoves();
              gameView.movesCountPopup.textContent = gameController.showNumMoves();

              // Allows user to see the 2nd card before flipping
              setTimeout(function() {
                card1.classList.remove(open, mismatch);
                card2.classList.remove(open, mismatch);
                gameController.clearList(openCards);
                gameView.overlay.classList.remove("overlay");
              }, 800);
            }
          }
          if (gameState.counts === 16) {
            gameView.watch.stop();
            setTimeout(function() {
              gameView.congratulationsScreen.style.display = "block";
            }, 500);
          }
        }
      });
    }
  }
};

gameController.init();
