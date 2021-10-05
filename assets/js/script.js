//element selectors
var timerEl = document.getElementById("timer");
var contentDiv = document.getElementById("content");
var startResetBtn = document.getElementById('startResetBtn');

//dom var creation
var h1El = document.createElement("h1");

//var creations
var timeLeft = 0;
var index = 0;

//questions and answers
//multiple arrays
//question arrs are the questions
//answers array are the answers for the questions with the same index 
//correctans array are the correct answers for each question with the same index

var questionsArr = ["Which of the following is an advantage of using JavaScript?",
    "Which built-in method calls a function for each element in the array?",
    "q3"]
var answersArr = [
    ["Less server interaction", " Immediate feedback to the visitors", "Increased interactivity", "All of the above"],
    ["while()", "loop()", "forEach()"],
    ["q3a1", "q3a2", "q3a3", "q3a4"]
];
var correctAnsArr = ["4", "3", "3"];

//fresh state of page
function freshState() {
    index = 0;
    resetTimer();
    startResetBtn.textContent = "Start";
    startResetBtn.setAttribute("data-function", "start");
    contentDiv.appendChild(h1El);
    h1El.textContent = "Welcome to my code quiz. The questions presented here have been taken from a variety of sources. When you are ready to begin, press the start button."
    console.log("fresh state");
}

//start button is clicked, start timer and game, and turn start button into reset button
//when reset button is clicked, reset timer then go back to fresh state
function startResetBtnPress(event) {
    event.stopPropagation();
    var element = event.target;
    if (element.matches("#startResetBtn")) {
        if (startResetBtn.textContent == "Start") {
            startResetBtn.textContent = "Reset";
            startResetBtn.setAttribute("data-function", "reset");
            countdown();
            quizActual();
        } else {
            clearContent();
            freshState();
        }
    }
}

//timer codeblock
function countdown() {
    console.log("countdown");
    timeLeft = 120;
    var timer = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerEl.textContent = "Time: N/A";
            //to do: end game function
        }
        timeLeft--;
    }, 1000);
}

//resets the timer
function resetTimer() {
    console.log("reset timer")
    timeLeft = 0;
}

//clears content div of page
function clearContent() {
    console.log("cleared content")
    while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild)
    }
}

//quiz function to scroll through the questions 
function quizActual() {
    clearContent();
    console.log("quiz actual")
    if (index < questionsArr.length) {
        contentDiv.appendChild(h1El);
        h1El.textContent = questionsArr[index];

        //create buttons with all possible answers in the answer array for the specific question
        for (let i = 0; i < answersArr[index].length; i++) {
            var btnEl = document.createElement("button");
            contentDiv.appendChild(btnEl);
            btnEl.textContent = answersArr[index][i];
            btnEl.setAttribute("data-answer-index", i);
            btnEl.setAttribute("data-function", "answer");
        }
    } else {
        endGame();
    }

    //give all buttons click event listeners
    var buttonAnswers = document.querySelectorAll("button");
    for (let i = 0; i < buttonAnswers.length; i++) {
        buttonAnswers[i].addEventListener("click", chooseAnswer)
    }
}

//chooseanswer function to compare user choice with actual answer
function chooseAnswer(event) {
    console.log("choose answer");
    var element = event.target;
    var answerID = element.getAttribute("data-answer-index");
    var buttonType = element.getAttribute("data-function");
    if (buttonType === "answer") {
        //-1 because of developer choice with how the questions are set up.
        if (answerID == correctAnsArr[index] - 1) {
            console.log("correct answer");
            element.style.backgroundColor = "#8FBC8F";
            waitTime(1);
        }
        else {
            console.log("wrong answer");
            timeLeft -= 10;
            element.style.backgroundColor = "#8B0000";
            waitTime(1);
        }
    }
}

//wait timer 
//waits a second after answering to show result of answer
function waitTime(x) {
    console.log("wait time");
    var waitTime = x;
    var waitTimer = setInterval(function () {

        if (waitTime <= 0) {
            clearInterval(waitTimer);
            console.log("wait time done")
            index++;
            quizActual();
        }
        waitTime--;
    }, 1000);

}

function endGame() {
    console.log("end game")
    contentDiv.appendChild(h1El);
    h1El.textContent = "Game has ended. Please enter your initials below."
    //append input element for initials
    //save as local file array high score
    //save score and initials
    resetTimer();
}

freshState();

startResetBtn.addEventListener("click", startResetBtnPress);

//game start and question with answers appear

//question box module will be made with dom creation tools
//todo: make question box module
//add actual questions to question bank

//optional:
//add countdown before game starts