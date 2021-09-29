var timerEl = document.getElementById('timer');


//timer codeblock
function countdown() {
    var timeLeft = 120;
    var timer = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
        }
        timeLeft--;
    }, 1000);
}

countdown();