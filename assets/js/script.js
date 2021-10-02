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

var questionsArr = ["q1", "q2", "q3"]
var answersArr = [
    ["answer1", "answer2", "answer3"],
    ["answer1", "answer2"],
    ["answer1", "answer2", "answer3", "answer4"]
];
var correctAnsArr = ["1", "2", "3"];

//fresh state of page
function freshState() {
    index = 0;
    startResetBtn.textContent = "Start";
    startResetBtn.setAttribute("data-function", "start");
    contentDiv.appendChild(h1El);
    h1El.textContent = "Welcome to my code quiz, press the start button to start."
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
            quizActual();

        } else {
            clearContent();
            freshState();
            resetTimer();
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
            //to do: end game function
        }
        timeLeft--;
    }, 1000);
}

function resetTimer() {
    timeLeft = 0;
    console.log("reset timer")
}

function clearContent() {
    while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild)
        h1El.textContent = "";
    }
    console.log("cleared content")
}

function quizActual() {

    //index value everytime it is called
    //refer to gallery in previous exercise
    clearContent();
    countdown();
    console.log("quiz actual")
    if (index !== null) {
        contentDiv.appendChild(h1El);
        h1El.textContent = questionsArr[index];

        for (let i = 0; i < answersArr[index].length; i++) {
            var btnEl = document.createElement("button");
            contentDiv.appendChild(btnEl);
            btnEl.textContent = answersArr[index][i];
        }
    }


    //create button and populate with answers 1 by 1
    //after buttons are created add on click listener on the div and if target is button, choose answer function with 1 input

}



function chooseAnswer(chosenAnswer) {
    //compares button click with correct answer array, 
    //button click grab value, compare with correct answer
    //if correct, do nothing to timer
    //if wrong subtract time from timer

    //if not possible to pass answer through function, intergrate into onclick listener
    index++;
    quizActual();
}


freshState();

startResetBtn.addEventListener("click", startResetBtnPress);

//game start and question with answers appear

//question box module will be made with dom creation tools
//todo: make question box module
//add actual questions to question bank
// make on click listeners to answers
//give answers data answer attribute
//can also give answers data attribute to say if answer is correct

//question box module will be using array modularity
//2d array

//optional:
//add countdown before game starts