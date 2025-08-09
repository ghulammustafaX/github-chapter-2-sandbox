// This file contains the JavaScript code for the web application.
// It handles interactivity, DOM manipulation, and any other client-side logic required.

document.addEventListener('DOMContentLoaded', () => {
    // Pomodoro settings
    let sessionLength = 25 * 60; // seconds
    let breakLength = 5 * 60;    // seconds
    let time = sessionLength;
    let timer = null;
    let isSession = true;
    let isRunning = false;
    let sessionCount = 0;
    let breakCount = 0;

    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const sessionInfo = document.getElementById('session-info');
    const sessionCountEl = document.getElementById('session-count');
    const breakCountEl = document.getElementById('break-count');
    const sessionInput = document.getElementById('session-length');
    const breakInput = document.getElementById('break-length');
    const applyBtn = document.getElementById('apply-times');
    const motivationEl = document.getElementById('motivation');

    // Progress ring setup
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const messages = [
        "Stay focused!",
        "You got this!",
        "Keep going!",
        "Take a deep breath.",
        "Almost there!",
        "Great job!"
    ];

    function showMotivation() {
        motivationEl.textContent = messages[Math.floor(Math.random() * messages.length)];
    }

    function setProgress() {
        let total = isSession ? sessionLength : breakLength;
        let percent = (total - time) / total;
        const offset = circumference - percent * circumference;
        circle.style.strokeDashoffset = offset;
    }

    function updateDisplay() {
        const min = String(Math.floor(time / 60)).padStart(2, '0');
        const sec = String(time % 60).padStart(2, '0');
        timerDisplay.textContent = `${min}:${sec}`;
        sessionInfo.textContent = isSession ? 'Session' : 'Break';
        timerDisplay.style.color = isSession ? '#007bff' : '#28a745';
        sessionCountEl.textContent = sessionCount;
        breakCountEl.textContent = breakCount;
        setProgress();
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        showMotivation();
        timer = setInterval(() => {
            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                if (isSession) {
                    sessionCount++;
                } else {
                    breakCount++;
                }
                isSession = !isSession;
                time = isSession ? sessionLength : breakLength;
                updateDisplay();
                showMotivation();
            }
        }, 1000);
    }

    function pauseTimer() {
        if (!isRunning) return;
        clearInterval(timer);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        time = isSession ? sessionLength : breakLength;
        updateDisplay();
        showMotivation();
    }

    function applyTimes() {
        let s = parseInt(sessionInput.value, 10);
        let b = parseInt(breakInput.value, 10);
        if (isNaN(s) || s < 1 || s > 60) s = 25;
        if (isNaN(b) || b < 1 || b > 30) b = 5;
        sessionLength = s * 60;
        breakLength = b * 60;
        time = isSession ? sessionLength : breakLength;
        resetTimer();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    applyBtn.addEventListener('click', applyTimes);

    updateDisplay();
    showMotivation();
});