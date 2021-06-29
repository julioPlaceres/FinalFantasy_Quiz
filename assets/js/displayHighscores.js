var highscoreEl = document.querySelector("#highScores");
var highScoreUl = document.querySelector("#highScoreList");
var gobackBtn = document.querySelector("#goBack");

// Initialization function, gets all score, sort them based on scores
// and display the list
function displayScores() {
    var highscores = JSON.parse(window.localStorage.getItem("scores")) || [];
    // sort highscores by score property in descending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });

    highscores.forEach(function(score) {
        var li = document.createElement("li");
        li.textContent = score.initials + ": " + score.score;
        highScoreUl.appendChild(li);
    });
}

function gotoMainPage(){
    window.location.replace("./index.html");
}

gobackBtn.addEventListener("click", gotoMainPage);

displayScores();