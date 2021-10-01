var timerEl = document.getElementById('timer');
var startResetBtn = document.getElementById('startResetBtn');
var timeLeft;

//fresh state of page
function freshState() {
    startResetBtn.textContent = "Start";
    startResetBtn.setAttribute("data-function", "start");
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
            resetTimer();
            //to do: end game function
        }
        timeLeft--;
    }, 1000);
}

function resetTimer() {
    timerEl.textContent = "";
    timeLeft = 0;
}

freshState();

startResetBtn.addEventListener("click", startResetBtnPress);

//when button pressed, countdown to game start

//game start and question with answers appear

//todo: make question bank and question box module
//question box module will be using array modularity
//2d array
//question box module will be made with dom creation tools
