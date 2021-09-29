var timerEl = document.getElementById('timer');

function countdown() {
    var timeLeft = 120;
    var timer = setInterval(function () {
        timerEl.textContent = timeLeft + " seconds remaining";
        if (timeLeft === 0) {
            clearInterval(timeInterval);
        }
        timeLeft--;
    }, 1000);
}

countdown();