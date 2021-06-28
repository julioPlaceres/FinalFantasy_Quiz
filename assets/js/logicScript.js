// Global variables
var welcomeTitle = document.querySelector("#headerTitle");
var startBtn = document.querySelector("#startBtn");
var timerElement = document.querySelector("#questionTimer");
var timerCounter = document.querySelector(".timer-counter");
var questionsElement = document.querySelector("#questions");
var titleElement = document.querySelector("#questionTitle");
var questionChoices = document.querySelector("#choices");
var currentQuestionIndex = 0;
var timer;
var counter;
var isWin = false;

// Event Listeners
startBtn.addEventListener("click", startGame);
questionChoices.addEventListener("click", checkAnswer);

// Hide Welcome message, Display 1st question and start Timer
function startGame(event){

    welcomeTitle.hidden = true;
    timerElement.setAttribute("class", "visible");
    titleElement.setAttribute("class", "visible");
    questionsElement.setAttribute("class", "visible");
    startTimer();
    GetQuestion();
}


function startTimer() {
    counter = 100;
    timer = setInterval(function() {
      counter--;
      timerCounter.textContent = counter;
      if (counter >= 0) {
        // Tests if win condition is met
        if (isWin && counter > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
        //   winGame();
        }
      }
      // Tests if time has run out
      if (counter === 0) {
        // Clears interval
        clearInterval(timer);
        // loseGame();
      }

      if(counter <= 0){
        counter = 0;
        timerCounter.textContent = counter;
        clearInterval(timer);
        //Lose Game
      }
    }, 1000);
  }

  function GetQuestion(){
      var currentQuestion = Questions[currentQuestionIndex];
      console.log(currentQuestion);

      titleElement.textContent = currentQuestion.title;
      questionChoices.textContent = "";

      for (var i = 0; i < currentQuestion.choices.length; i++){
            var choiceNode = document.createElement("button");
            choiceNode.setAttribute("class", "choices");
            choiceNode.style.display = "flex";
            choiceNode.style.justifyContent = "center";
            choiceNode.setAttribute("value", currentQuestion.choices[i]);

            choiceNode.textContent = i + 1 + ". " + currentQuestion.choices[i];

          questionChoices.appendChild(choiceNode);
      }
  }

  function checkAnswer(event){
      var element = event.target;
      console.log(element);
      
      if(element.matches("button")){
          var value = element.getAttribute("value");
          var answer = Questions[currentQuestionIndex].answer;
         if(value === answer){
           console.log("Good Job");
         }
         else{
           counter = counter - 50;
         }
         currentQuestionIndex++;
         GetQuestion();
      }
  }


