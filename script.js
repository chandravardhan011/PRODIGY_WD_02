let startTime, updatedTime, difference, tInterval, running = false;
let lapCounter = 0;
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function start() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
        lapButton.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00";
    laps.innerHTML = "";
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
    lapCounter = 0;
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.innerText = `Lap ${lapCounter}: ${display.innerHTML}`;
        laps.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    display.innerHTML = hours + ":" + minutes + ":" + seconds;
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
