// Game Variables
let deck, discardPile, players, currentPlayer;

// Generate and shuffle the deck
function generateDeck() {
  const colors = ["red", "yellow", "green", "blue"];
  const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Skip", "Reverse", "+2"];
  const deck = [];

  colors.forEach(color => {
    values.forEach(value => {
      deck.push({ color, value });
      if (value !== "0") deck.push({ color, value });
    });
  });

  for (let i = 0; i < 4; i++) {
    deck.push({ color: "wild", value: "Wild" });
    deck.push({ color: "wild", value: "+4" });
  }

  return deck.sort(() => Math.random() - 0.5);
}

// Initialize the game
function initializeGame() {
  deck = generateDeck();
  players = [[]];
  for (let i = 0; i < 7; i++) {
    players[0].push(deck.pop());
  }
  discardPile = [deck.pop()];
  currentPlayer = 0;

  updateUI();
}

// Update the UI
function updateUI() {
  const playerHandDiv = document.getElementById("player-hand");
  const topCardDiv = document.getElementById("top-card");

  // Display player's hand
  playerHandDiv.innerHTML = "";
  players[currentPlayer].forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = `card ${card.color}`;
    cardDiv.textContent = `${card.value}`;
    cardDiv.onclick = () => playCard(index);
    playerHandDiv.appendChild(cardDiv);
  });

  // Display the top card
  const topCard = discardPile[discardPile.length - 1];
  topCardDiv.className = `card ${topCard.color}`;
  topCardDiv.textContent = `${topCard.value}`;
}

// Play a card
function playCard(cardIndex) {
  const topCard = discardPile[discardPile.length - 1];
  const selectedCard = players[currentPlayer][cardIndex];

  if (
    selectedCard.color === topCard.color ||
    selectedCard.value === topCard.value ||
    selectedCard.color === "wild"
  ) {
    discardPile.push(selectedCard);
    players[currentPlayer].splice(cardIndex, 1);

    if (selectedCard.value === "Wild" || selectedCard.value === "+4") {
      const newColor = prompt("Choose a color (red, yellow, green, blue):");
      selectedCard.color = newColor;
    }

    if (players[currentPlayer].length === 0) {
      document.getElementById("message").textContent = "You Win!";
      return;
    }
  } else {
    document.getElementById("message").textContent = "Invalid card. Try again!";
    return;
  }

  document.getElementById("message").textContent = "";
  updateUI();
}

// Draw a card
document.getElementById("draw-card").onclick = () => {
  players[currentPlayer].push(deck.pop());
  updateUI();
};

// End turn (for single-player simulation)
document.getElementById("end-turn").onclick = () => {
  document.getElementById("message").textContent = "Your turn!";
  updateUI();
};

// Start the game
initializeGame();