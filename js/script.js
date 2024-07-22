function computerMove() {
  const move = Math.floor(Math.random() * 3);
  const options = ["rock", "paper", "scissors"];
  return options[move];
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      playGame(computerMove());
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
function playGame(player_move) {
  player_data.push(player_move);
  player_move_data[player_move]++;
  const computer_move = computerMove();
  let result = "";
  if (computer_move === player_move) {
    score.tie++;
    result = "It's a tie!";
  } else if (
    (computer_move === "rock" && player_move === "scissor") ||
    (computer_move === "paper" && player_move === "rock") ||
    (computer_move === "scissor" && player_move === "paper")
  ) {
    score.lose++;
    result = "Computer wins!";
  } else {
    score.win++;
    result = "You win!";
  }
  localStorage.setItem("score", JSON.stringify(score));
  localStorage.setItem("player_data", JSON.stringify(player_data));
  localStorage.setItem("player_move_data", JSON.stringify(player_move_data));

  document.getElementById("result").innerHTML = `
    <p>Computer chose: <img src="images/${computer_move}-emoji.png" alt=""></p>
    <p>You chose: <img src="images/${player_move}-emoji.png" alt=""></p>
    </br>
    <p><strong>${result}</strong></p>
  `;

  document.getElementById("wins").textContent = score.win;
  document.getElementById("losses").textContent = score.lose;
  document.getElementById("ties").textContent = score.tie;
  console.log(player_data);
  console.log(player_move_data);
}
let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  lose: 0,
  tie: 0,
};
let player_data = JSON.parse(localStorage.getItem("player_data")) || [];
let player_move_data = JSON.parse(localStorage.getItem("player_move_data")) || {
  rock: 0,
  paper: 0,
  scissor: 0,
};

function reset() {
  localStorage.removeItem("score");
  score.win = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem("player_move_data");
  player_move_data.rock = 0;
  player_move_data.paper = 0;
  player_move_data.scissor = 0;
  localStorage.removeItem("player_data");
  player_move = [];
}
