const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");

let playerScore = 0;
let computerScore = 0;

const roundsText = document.getElementById("rounds");

let roundsPlayed = 0;
const roundsTotal = 5;

let playerRounds = 0;
let computerRounds = 0;

let roundHistory = "";

const emojiBtn = document.getElementById("emojiBtn");
let emojiVersion = false;

const choicesWords = ["Rock", "Paper", "Scissors"];
const choicesEmojis = ["🪨", "📄", "✂️"];

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const playerChoice = choice.innerText.split(" ")[1]; // Get word after emoji
        const computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);

        showResult(playerChoice, computerChoice, winner);
    });
});

function getComputerChoice() {
    const options = ["Rock", "Paper", "Scissors"];
    const rand = Math.floor(Math.random() * 3);
    return options[rand];
}

function getWinner(player, computer) {
    if (player === computer) return "draw";
    if (
        (player === "Rock" && computer === "Scissors") ||
        (player === "Paper" && computer === "Rock") ||
        (player === "Scissors" && computer === "Paper")
    ) {
        playerScore++;
        return "player";
    }
    else {
        computerScore++;
        return "computer";
    }
}

function showResult(player, computer, winner) {
    if (winner === "draw") {
        resultText.innerText = `🤝 It's a draw! Both chose ${player}.`;
    }
    else if (winner === "player") {
        resultText.innerText = `✅ You win! ${player} beats ${computer}.`;
    }
    else {
        resultText.innerText = `❌ You lose! ${computer} beats ${player}.`;
    }

    scoreText.innerText = `Player: ${playerScore} | Computer: ${computerScore}`;

    if (playerScore === 3 || computerScore === 3) {
        endRound(playerScore > computerScore ? "Player" : "Computer");
    }
}

function endRound(winner) {
    resultText.innerText += playerScore === 3 ? "\n🏆 You reached 3 points! Round won!" : "\n💀 Computer wins round!";
    choices.forEach(btn => btn.disabled = true);
    resetBtn.style.display = "inline-block";
    
    roundsPlayed++;
    if (winner === "Player") {
        playerRounds++;
    }
    else {
        computerRounds++;
    }

    let roundsTextStr = "";
    roundHistory += `\nRound ${roundsPlayed} - ${winner}`
    roundsTextStr += roundHistory;
    roundsTextStr += `\n(${playerRounds}-${computerRounds})`;
    if (playerRounds + computerRounds >= roundsTotal && playerRounds === computerRounds) {
        roundsTextStr += "\n\nIt's a tie match!";
        resetBtn.innerText = "Play Again";
    }
    else if ((playerRounds > computerRounds ? playerRounds : computerRounds) >= Math.floor(roundsTotal / 2) + 1) {
        roundsTextStr += `\n\n${winner} wins`;
        resetBtn.innerText = "Play Again";
    }
    
    roundsText.innerText = roundsText.innerText.split("\n")[0] + roundsTextStr;
}

resetBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    resultText.innerText = "";
    scoreText.innerText = "Player: 0 | Computer: 0";
    choices.forEach(btn => btn.disabled = false);
    resetBtn.style.display = "none";
    
    if (resetBtn.innerText === "Play Again") {
        resetBtn.innerText = "Continue";

        roundsText.innerText = "Best of 5 rounds, to 3 each round";

        roundsPlayed = 0;

        playerRounds = 0;
        computerRounds = 0;

        roundHistory = "";
    }
});

emojiBtn.addEventListener("click", () => {
    emojiVersion = !emojiVersion;
    if (emojiVersion) {
        emojiBtn.innerText = "🔤";
    }
    else {
        emojiBtn.innerText = "😊";
    }

    for (let i = 0; i < choices.length; i++) {
        if (emojiVersion) {
            choices[i].innerText = choicesEmojis[i];
        }
        else {
            choices[i].innerText = choicesEmojis[i] + " " + choicesWords[i];
        }
    }
});