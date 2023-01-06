var questionPosition = 0;
var wrongAnswers = 0;
var highScores = [];
var score = 0;
var secondsRemaining = 75;
var answerFeedback = document.querySelector("#answer-feedback");
var initialInput = document.querySelector("#initials");
var timerInterval;
var scoreMessage = document.querySelector("#score-message");
var scoreBoard = document.getElementById("score-board");
var clearScoresBtn = document.getElementById("clear-scores-btn");
var scoreBoardList = document.getElementById("score-board-list");
var timeEl = document.getElementById("time");
var secondsEl = document.getElementById("seconds");


var quizQuestions = [{
    "question": "Commonly used data types DO NOT include:",
    "options": ["strings", "booleans", "alerts", "numbers"],
    "answer": "alerts"
},
{
    "question": "The condition in an if-else statement is enclosed with:",
    "options": ["quotes", "curly brackets", "parenthesis", "square brackets"],
    "answer": "parenthesis"
},
{
    "question": "Arrays in JavaScript can be used to store:",
    "options": ["numbers and strings", "other arrays", "booleans", "all of the above"],
    "answer": "all of the above"
},
{
    "question": "String values must be enclosed within ___ when being assigned to variables:",
    "options": ["commas", "curly brackets", "quotes", "parenthesis"],
    "answer": "quotes"
},
{
    "question": "A very useful tool used during development and debugging for printing content to the debugger is:",
    "options": ["JavaScript", "terminal/bash", "alerts", "console.log"],
    "answer": "console.log"
}
]

document.getElementById("quiz-box").style.visibility = "hidden";
document.getElementById("highscores").style.visibility = "hidden";

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("submit").addEventListener("click", saveUserInfo);

function startQuiz(){
    document.getElementById("intro").style.display = "none";
    document.getElementById("quiz-box").style.visibility = "visible";
    displayQuestion();
    btnListener();
    setTime();
}

function displayQuestion(){
    document.getElementById("question-container").textContent = quizQuestions[questionPosition].question;
    document.getElementById("option-1").textContent = quizQuestions[questionPosition].options[0]
    document.getElementById("option-2").textContent = quizQuestions[questionPosition].options[1]
    document.getElementById("option-3").textContent = quizQuestions[questionPosition].options[2]
    document.getElementById("option-4").textContent = quizQuestions[questionPosition].options[3]
}

function btnListener(){
    var btns = document.querySelectorAll(".option-btn");
    for (i of btns){
        i.addEventListener("click", answerSelect)
    }
}

function answerSelect(event){
    const buttonClicked = event.target;
    checkAnswer(buttonClicked.textContent, quizQuestions[questionPosition].answer);
    nextQuestion();
}

function checkAnswer(selectedAnswer, expectedAnswer){
    if (selectedAnswer != expectedAnswer)
    {
        wrongAnswers++
        if (score != 0)
        {
            score = score -20;
        }
        else
        {
            score = score;
        }
        secondsRemaining = secondsRemaining - 15;
        answerFeedback.textContent = "Wrong!";
    }
    else{
        score = score +20;
        answerFeedback.textContent = "Correct!";
    }
}


function nextQuestion(){
    questionPosition++;
    if (questionPosition  == 5 )
    {
        displayScore();
        clearInterval(timerInterval);
    }
    else
    {
        displayQuestion();
    }
}

function displayScore(){
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("highscores").style.visibility = "visible";
    scoreMessage.textContent = "You scored " + score + " points!";
}

function saveUserInfo() {
    retrievePreviousScores();
    var userScore = {
        initials : initialInput.value,
        score : score
    }
    highScores.push(userScore);
    localStorage.setItem("userScore", JSON.stringify(highScores));
    displayScores()
}

function retrievePreviousScores(){
    var userScores = JSON.parse(localStorage.getItem("userScore"));
    if (userScores != null && userScores.length > 0) {
        highScores = userScores;
    }
}

function displayScores(){
    hideElements();
    scoreBoard.style.display = "block";
    document.getElementById("score-board-btns").style.display = "block";
    addToScoreBoard();
}

function addToScoreBoard(){
    retrievePreviousScores();
    highScores.forEach((item)=>{
        var scoreItem = document.createElement("li");
        scoreItem.innerText = item.initials + " - " + item.score;
        scoreBoardList.appendChild(scoreItem);
    })
}

function clearScoreBoard(){
    localStorage.clear();
    var scoreList = document.querySelectorAll('#score-board-list');
    for(var i=0; li=scoreList[i]; i++) {
    li.parentNode.removeChild(li);
}
}

function hideElements(){
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("highscores").style.display = "none";
}

function setTime() {
      timerInterval = setInterval(function() {
      secondsRemaining--;
      secondsEl.textContent = secondsRemaining;
  
      if(secondsRemaining <= 0) {
        clearInterval(timerInterval);
        displayScore();
      }
  
    }, 1000);
  }

clearScoresBtn.addEventListener("click", clearScoreBoard);


