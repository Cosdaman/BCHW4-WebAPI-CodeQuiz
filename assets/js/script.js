//element selectors
var timerEl = document.getElementById("timer");
var contentDiv = document.getElementById("content");
var startResetBtn = document.getElementById('startResetBtn');

//variable creation
var divEl = document.createElement("div");
var h1El = document.createElement("h1");
var timeLeft;

//fresh state of page
function freshState() {
    startResetBtn.textContent = "Start";
    startResetBtn.setAttribute("data-function", "start");
    contentDiv.appendChild(divEl);
    divEl.appendChild(h1El);
    h1El.textContent = "Welcome to my code quiz, press the start button to start."
    console.log("fresh state");
}

//start button is clicked, turn into reset button
//when reset button is clicked, reset timer then go back to fresh state
function startResetBtnPress(event) {
    event.stopPropagation();
    var element = event.target;
    if (element.matches("#startResetBtn")) {
        if (startResetBtn.textContent == "Start") {
            startResetBtn.textContent = "Reset";
            startResetBtn.setAttribute("data-function", "reset");
            countdown();
            clearContent();
            
        } else {
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
            //to do: end game function
        }
        timeLeft--;
    }, 1000);
}

function resetTimer() {
    timerEl.textContent = "";
    timeLeft = 0;
    console.log("reset timer")
}

function clearContent(){
    while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild)
    }
    console.log("cleared content")
}

function quizActual(){

}


freshState();

startResetBtn.addEventListener("click", startResetBtnPress);

//when button pressed, countdown to game start

//game start and question with answers appear

//question box module will be made with dom creation tools
//todo: make question box module
//todo: make question bank
// make on click listeners to answers
//give answers data answer attribute
//can also give answers data attribute to say if answer is correct

//question box module will be using array modularity
//2d array
