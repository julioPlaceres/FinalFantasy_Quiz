// Global variables
// Welcome Message at screen load
var welcomeTitle = document.querySelector("#headerTitle");
// Start button that begins the game
var startBtn = document.querySelector("#startBtn");
// Timer div & Timer counter
var timerElement = document.querySelector("#questionTimer");
var timerCounter = document.querySelector(".timer-counter");
// Elemnts inside the div that loads questions
var titleElement = document.querySelector("#questionTitle");
var questionsElement = document.querySelector("#questions");
// Div where buttons with choices will be loaded
var questionChoices = document.querySelector("#choices");
// End screen elements
var endScreen = document.querySelector("#endScreen");
var scoreResult = document.querySelector("#scoreResult")
var currentQuestionIndex = 0;
var timer;
var counter;
var isWin = false;
const secondsPerQuestion = 5;

// Event Listeners
startBtn.addEventListener("click", startGame);
questionChoices.addEventListener("click", checkAnswer);

// Hide Welcome message, Display 1st question and start Timer
function startGame(event) {
  welcomeTitle.removeAttribute("class", "visible");
  welcomeTitle.textContent = "";

  timerElement.setAttribute("class", "visible");
  titleElement.setAttribute("class", "visible");
  questionsElement.setAttribute("class", "visible");
  startTimer();
  GetQuestion();
}

function startTimer() {
  counter = Questions.length * secondsPerQuestion;

  timer = setInterval(function () {
    counter--; 

    // Checks if timer has run out
    if (counter <= 0) {
      counter = 0;
      clearInterval(timer);
      displayEndScreen();
    }

    // Sets the timer text to display either minutes or seconds
    var minutes = Math.floor(counter / 60);
    if (minutes < 10) { minutes = "0" + minutes; }
    var seconds = counter % 60;
    if (seconds < 10) { seconds = "0" + seconds; }

    // Display counter on the screen
    timerCounter.textContent = minutes + ":" + seconds;

    // Checks if timer hasnt run out and user reach end of questions
    if (counter >= 0) {
      if (isWin && counter > 0) {
        clearInterval(timer);
        displayEndScreen();
      }
    }
  }, 1000);
}

function GetQuestion() {
  // Check if user has reach last question
  if (currentQuestionIndex == Questions.length) {
    isWin = true;
    return;
  }

  // Get current Questions and assign Title to display on screen
  var currentQuestion = Questions[currentQuestionIndex];
  titleElement.textContent = currentQuestion.title;

  // Clear last set of questions
  questionChoices.textContent = "";

  // Loop through Array and create buttons for each question option
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceNode = document.createElement("button");

    // These Attributes are used to set the buttons on the 
    // center of the screen
    choiceNode.setAttribute("class", "choices");
    choiceNode.style.display = "flex";              // Possible move these to CSS
    choiceNode.style.justifyContent = "center";

    // Set current question set to the current index
    choiceNode.setAttribute("value", currentQuestion.choices[i]);

    // Set the content of the buttons
    choiceNode.textContent = i + 1 + ". " + currentQuestion.choices[i];

    // Appends button to the screen
    questionChoices.appendChild(choiceNode);
  }
}

function checkAnswer(event) {
  // Gets the target the user clicked on
  var element = event.target;

  //Checks the target is a button and gets the value of it
  if (element.matches("button")) {                                                              
    var value = element.getAttribute("value");
    var answer = Questions[currentQuestionIndex].answer;

    // Checks the target element matches the correct answer
    if (value === answer) {
      // Display message on the screen for correct answer
    }
    else {
      // Penalize user for incorrect answer
      counter = counter - secondsPerQuestion;
    }

    //Increment current index and retrieve next set of questions
    currentQuestionIndex++;
    GetQuestion();
  }
}

function displayEndScreen() {
  // Hides Question elements
  questionsElement.removeAttribute("class", "hidden");
  questionsElement.textContent = "";

  titleElement.removeAttribute("class", "hidden");
  titleElement.textContent = "";

  questionsElement.removeAttribute("class", "hidden");
  questionsElement.textContent = "";

  // Displays initials for user to save score
  endScreen.removeAttribute("class", "hidden");

  scoreResult.textContent = "Your score is: " + counter; 
}


