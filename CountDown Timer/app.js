document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-countdown");
    const targetDateInput = document.getElementById("target-date");
    const daysDisplay = document.getElementById("days");
    const hoursDisplay = document.getElementById("hours");
    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const message = document.getElementById("message");
  
    let countdownInterval;
    let targetDate = localStorage.getItem("targetDate");
  
    // Check if there's a stored target date in localStorage
    if (targetDate) {
      startCountdown(new Date(targetDate));
    }
  
    function calculateRemainingTime(target) {
      const now = new Date().getTime();
      const remainingTime = target - now;
  
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        localStorage.removeItem("targetDate");
        message.innerText = "Countdown Complete!";
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
  
      const seconds = Math.floor((remainingTime / 1000) % 60);
      const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);
      const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
  
      return { days, hours, minutes, seconds };
    }
  
    function updateDisplay({ days, hours, minutes, seconds }) {
      daysDisplay.innerText = String(days).padStart(2, "0");
      hoursDisplay.innerText = String(hours).padStart(2, "0");
      minutesDisplay.innerText = String(minutes).padStart(2, "0");
      secondsDisplay.innerText = String(seconds).padStart(2, "0");
    }
  
    function startCountdown(targetDate) {
      // Store target date in localStorage so it persists after page refresh
      localStorage.setItem("targetDate", targetDate);
  
      // Clear any previous intervals to prevent multiple timers
      clearInterval(countdownInterval);
  
      countdownInterval = setInterval(() => {
        const remainingTime = calculateRemainingTime(new Date(targetDate));
        updateDisplay(remainingTime);
      }, 1000);
    }
  
    startButton.addEventListener("click", () => {
      const selectedDate = new Date(targetDateInput.value);
      const now = new Date();
  
      // Check if the selected date is in the past
      if (selectedDate <= now) {
        message.innerText = "Please select a future date and time!";
        return;
      }
  
      message.innerText = "";
      startCountdown(selectedDate);
    });
  });
  