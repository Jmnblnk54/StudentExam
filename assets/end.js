const username = document.getElementById("el");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const newScore = localStorage.getItem("newScore");
const finalScore = document.getElementById("finalScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const maxHighScores = 5;

finalScore.innerText = newScore;
username.addEventListener("keyup", () => {
saveScoreBtn.disabled = !username.Value;
});

saveHighScore = e => {
    e.preventDefault();
    const score = {
        score: newScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort( (a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
};