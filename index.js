function computerMove() {
  const move = Math.floor(Math.random() * 3);
  const options = ["rock", "paper", "scissor"];
  return options[move];
}
player_data = [];
function playerMove(player_move) {
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

  document.getElementById("result").innerHTML = `
    <p>Computer chose: <strong>${computer_move}</strong></p>
    <p>You chose: <strong>${player_move}</strong></p>
    <p><strong>${result}</strong></p>
  `;

  document.getElementById("wins").textContent = score.win;
  document.getElementById("losses").textContent = score.lose;
  document.getElementById("ties").textContent = score.tie;
  console.log(player_data);
  console.log(player_move_data);
}
let score = JSON.parse(localStorage.getItem("score"));
if (!score) {
  score = {
    win: 0,
    lose: 0,
    tie: 0,
  };
}
const player_move_data = {
  rock: 0,
  paper: 0,
  scissor: 0,
};
