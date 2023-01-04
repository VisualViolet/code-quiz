var questionPosition = 0;
var wrongAnswers = 0;
var highScores = [];
var score = 0;
var message = document.querySelector("#message");
var initialInput = document.querySelector("initials");
var submitBtn = document.querySelector("#submit");
var scoreMessage = document.querySelector("score-message");


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
document.getElementById("high-scores").style.visibility = "hidden";

document.getElementById("start-btn").addEventListener("click", startQuiz);
function startQuiz(){
    document.getElementById("intro").style.display = "none";
    document.getElementById("quiz-box").style.visibility = "visible";
    displayQuestion();
    btnListener();
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
        score = score -20;
        message.textContent = "Wrong!";
    }
    else{
        score = score +20;
        message.textContent = "Correct!";
    }
}


function nextQuestion(){
    questionPosition++;
    if (questionPosition  == 5 )
    {
        displayScore();
    }
    else
    {
        displayQuestion();
    }
}

