// Strike Audio - http://bit.ly/so-ball-hit
// GameOver Audio - http://bit.ly/so-crowd-cheer
const strike = document.getElementById("strike");
const reset = document.getElementById("reset");

const IndiaScores = document.getElementById("score-team1");
const IndiaWickets = document.getElementById("wickets-team1");

const PakScores = document.getElementById("score-team2");
const PakWickets = document.getElementById("wickets-team2");

var Team1Scores = 0;
var Team2Scores = 0;
var Team1Wickets = 0;
var Team2Wickets = 0;
var Turn = 1;
var Team1BallsFaced = 0;
var Team2BallsFaced = 0;

const PossibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];

const gameOverAudio = new Audio("http://bit.ly/so-ball-hit");
const StrikeAudio = new Audio("http://bit.ly/so-crowd-cheer");

function GameOver() {
  gameOverAudio.play();
  if (Team1Scores > Team2Scores) {
    alert("Team India Wins");
  } else if (Team1Scores < Team2Scores) {
    alert("Team Pak Wins");
  } else if (Team1Scores === Team2Scores) {
    alert("It is another SuperOver");
  }
}

function UpdateScores() {
  IndiaScores.textContent = Team1Scores;
  PakScores.textContent = Team2Scores;
  IndiaWickets.textContent = Team1Wickets;
  PakWickets.textContent = Team2Wickets;
}

reset.onclick = () => {
  window.location.reload();
};

strike.addEventListener("click", () => {
  StrikeAudio.pause();
  StrikeAudio.currentTime = 0;
  StrikeAudio.play();

  const randomNumbers = PossibleOutcomes[Math.floor(Math.random() * PossibleOutcomes.length)];

  if (Turn === 2) {
    Team2BallsFaced++;
    document.querySelector(`#team2-superover div:nth-child(${Team2BallsFaced})`).textContent = randomNumbers;

    if (randomNumbers === "W" || Team2BallsFaced === 6 || Team2Wickets === 2 || Team2Scores > Team1Scores) {
      Turn = 3;
      GameOver();
    }
    else {
      if (randomNumbers === "W") {
        Team2Wickets++;
      }
      else {
        Team2Scores += randomNumbers;
      }
    }
  }

  if (Turn === 1) {
    Team1BallsFaced++;
    document.querySelector(`#team1-superover div:nth-child(${Team1BallsFaced})`).textContent = randomNumbers;
    
    if (randomNumbers === "W" || Team1BallsFaced === 6 || Team1Wickets === 2) {
      Turn = 2;
    }
    else {
      if (randomNumbers === "W") {
        Team1Wickets++;
      }
      else {
        Team1Scores += randomNumbers;
      }
    }
  }

  UpdateScores();
});