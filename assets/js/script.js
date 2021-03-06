//element selectors
var timerEl = document.getElementById("timer");
var contentDiv = document.getElementById("content");
var startResetBtn = document.getElementById('startResetBtn');
var highScoreBtn = document.getElementById('highScoreBtn');

//dom var creation
var h1El = document.createElement("h1");
var h2El = document.createElement("h2");
var input = document.createElement("input");

//var creations
var timeLeft = 0;
var index = 0;
var gameScore = 0;
var highScores = [];
var storedHighScores;

//questions and answers
//multiple arrays
//question arrs are the questions
//answers array are the answers for the questions with the same index 
//correctans array are the correct answers for each question with the same index

var questionsArr = ["Which of the following is an advantage of using JavaScript?",
    "Which built-in method calls a function for each element in the array?",
    "Is 'Boolean' a javascript primitive data type?"]
var answersArr = [
    ["Less server interaction", " Immediate feedback to the visitors", "Increased interactivity", "All of the above"],
    ["while()", "loop()", "forEach()"],
    ["Yes", "No"]
];
var correctAnsArr = ["4", "3", "1"];

//fresh state of page
function freshState() {
    //questionnaire index
    index = 0;
    //ensure timer is reset
    resetTimer();
    clearContent();

    //load local highscores into data    
    highScores = [];
    storedHighScores = JSON.parse(localStorage.getItem("scoreInfo"));
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }

    startResetBtn.textContent = "Start";
    startResetBtn.setAttribute("data-function", "start");
    contentDiv.appendChild(h1El);
    h1El.textContent = "Welcome to my code quiz. The questions presented here have been taken from a variety of sources. When you are ready to begin, press the start button."

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
    timeLeft = 120;
    var timer = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerEl.textContent = "Time: N/A";
        }
        timeLeft--;
    }, 1000);
}

//resets the timer
function resetTimer() {
    gameScore = timeLeft;
    timeLeft = 0;
}

//clears content div of page
function clearContent() {
    while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild)
    }
}

//quiz function to scroll through the questions 
function quizActual() {
    clearContent();
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

            //give all buttons click event listeners
            var buttonAnswers = document.querySelectorAll("[data-function='answer']");
            for (let i = 0; i < buttonAnswers.length; i++) {
                buttonAnswers[i].addEventListener("click", chooseAnswer);
            }
        }
    } else {
        endGame();
    }
}

//chooseanswer function to compare user choice with actual answer
function chooseAnswer(event) {
    var element = event.target;
    var answerID = element.getAttribute("data-answer-index");
    var buttonType = element.getAttribute("data-function");
    var answerButtons = document.querySelectorAll("[data-function='answer']");
    if (buttonType === "answer") {
        //-1 because of developer choice with how the questions are set up.
        if (answerID == correctAnsArr[index] - 1) {
            element.style.backgroundColor = "#8FBC8F";
            disableButtons(answerButtons);

        }
        else {
            timeLeft -= 10;
            element.style.backgroundColor = "#8B0000";
            disableButtons(answerButtons);
        }
        waitTime(1);
    }
}

function disableButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute("disabled", true);
    }
}

//wait timer 
//waits x * 500ms after answering to show result of answer
function waitTime(x) {
    var waitTime = x;
    var waitTimer = setInterval(function () {

        if (waitTime <= 0) {
            clearInterval(waitTimer);
            index++;
            quizActual();
        }
        waitTime--;
    }, 500);

}

//saves score to local json
function saveScore() {
    var scoreInfo = {
        initials: input.value,
        score: gameScore
    };
    highScores.push(scoreInfo)

    //ascending sort function 
    highScores.sort(
        function (a, b) {
            return b.score - a.score
        });

    while (highScores.length > 8) {
        highScores.pop();
    }

    localStorage.setItem("scoreInfo", JSON.stringify(highScores));
    input.value = "";
    showHighScore();
}

//ends game and prompts to save highscore
function endGame() {
    gameScore = timeLeft;
    resetTimer();
    var btnEl = document.createElement("button");

    btnEl.textContent = "Save"
    h1El.textContent = "Game has ended. Please enter your initials below."
    input.type = "text";
    input.maxLength = "4";

    contentDiv.appendChild(h1El);
    contentDiv.appendChild(input);
    contentDiv.appendChild(btnEl);

    btnEl.addEventListener("click", saveScore)
}


//shows highscores on screen
function showHighScore() {
    clearContent();
    resetTimer();
    h2El.textContent = "Top 8 High Scores";
    var ulEl = document.createElement("ul");
    contentDiv.appendChild(h2El);
    contentDiv.appendChild(ulEl);
    for (let i = 0; i < highScores.length; i++) {
        var liEl = document.createElement("li");
        liEl.innerHTML = "<p>" + highScores[i].initials + "</p>" + "<p>" + highScores[i].score + "</p>"
        ulEl.appendChild(liEl);
    }
}

//initialize
freshState();
startResetBtn.addEventListener("click", startResetBtnPress);
highScoreBtn.addEventListener("click", showHighScore);
