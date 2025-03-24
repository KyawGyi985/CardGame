const choices = ["လက်သီး", "လက်ဝါး", "ကတ်ကြေး"];
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let player1Choice = null;
let player2Choice = null;

const player1ScoreDisplay = document.getElementById("player1-score");
const player2ScoreDisplay = document.getElementById("player2-score");
const currentPlayerDisplay = document.getElementById("current-player");
const player1ChoiceDisplay = document.getElementById("player1-choice");
const player2ChoiceDisplay = document.getElementById("player2-choice");
const resultText = document.getElementById("result-text");
const resetGameButton = document.getElementById("reset-game");
const choiceCards = document.querySelectorAll(".card");

choiceCards.forEach(card => {
    card.addEventListener("click", () => {
        const choice = card.id === "rock" ? "လက်သီး" : card.id === "paper" ? "လက်ဝါး" : "ကတ်ကြေး";
        handlePlayerChoice(choice);
    });
});

resetGameButton.addEventListener("click", resetGame);

function handlePlayerChoice(choice) {
    if (currentPlayer === 1) {
        player1Choice = choice;
        player1ChoiceDisplay.textContent = player1Choice;
        currentPlayer = 2;
        currentPlayerDisplay.textContent = "ကစားသမား ၂";
        resultText.textContent = "ရလဒ်: ကစားသမား ၂ ရွေးချယ်ပါ";
    } else {
        player2Choice = choice;
        player2ChoiceDisplay.textContent = player2Choice;
        determineWinner();
        currentPlayer = 1;
        currentPlayerDisplay.textContent = "ကစားသမား ၁";
        choiceCards.forEach(card => card.style.pointerEvents = "none"); // ရွေးပြီးရင် ကဒ်တွေကို ပိတ်ထားမယ်
        resetGameButton.style.display = "block"; // Reset ခလုတ်ပြမယ်
    }
}

function determineWinner() {
    let result = "";
    if (player1Choice === player2Choice) {
        result = "သရေ!";
    } else if (
        (player1Choice === "လက်သီး" && player2Choice === "ကတ်ကြေး") ||
        (player1Choice === "လက်ဝါး" && player2Choice === "လက်သီး") ||
        (player1Choice === "ကတ်ကြေး" && player2Choice === "လက်ဝါး")
    ) {
        result = "ကစားသမား ၁ အနိုင်ရတယ်!";
        player1Score++;
    } else {
        result = "ကစားသမား ၂ အနိုင်ရတယ်!";
        player2Score++;
    }

    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;
    resultText.textContent = `ရလဒ်: ${result}`;
}

function resetGame() {
    player1Choice = null;
    player2Choice = null;
    player1ChoiceDisplay.textContent = "-";
    player2ChoiceDisplay.textContent = "-";
    resultText.textContent = "ရလဒ်: ဂိမ်းစလိုက်!";
    currentPlayer = 1;
    currentPlayerDisplay.textContent = "ကစားသမား ၁";
    choiceCards.forEach(card => card.style.pointerEvents = "auto"); // ကဒ်တွေကို ပြန်ဖွင့်မယ်
    resetGameButton.style.display = "none"; // Reset ခလုတ်ဖျောက်မယ်
}