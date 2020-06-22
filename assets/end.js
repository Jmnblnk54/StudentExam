const username = document.getElementById("el");
const saveScoreBtn = document.getElementById("saveScoreBtn");
username.addEventListener("keyup", () => {
saveScoreBtn.disabled = !username.Value;
});

saveHighScore = e => {
    e.preventDefault();
}