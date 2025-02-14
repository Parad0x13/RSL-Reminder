const timeSlider = document.getElementById('timeSlider');
const sliderValue = document.getElementById('sliderValue');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const set15MinutesButton = document.getElementById('set15MinutesButton');

// Initialize timer variables
let countdown;
let isTimerRunning = false;
let timeRemaining; // Store the remaining time for Arena Timer

const marketTimeSlider = document.getElementById('marketTimeSlider');
const marketSliderValue = document.getElementById('marketSliderValue');
const startMarketButton = document.getElementById('startMarketButton');
const stopMarketButton = document.getElementById('stopMarketButton');
const set1HourButton = document.getElementById('set1HourButton');

// Initialize Market timer variables
let marketCountdown;
let isMarketTimerRunning = false;
let marketTimeRemaining; // Store the remaining time for Market Timer

const alarmSound = document.getElementById('alarmSound'); // Reference to the audio element

// Log section
const logList = document.getElementById('logList');
const clearLogButton = document.getElementById('clearLogButton');

// Function to add a log entry
function addLogEntry(message) {
    const logEntry = document.createElement('li'); // Create a new list item
    const currentTime = new Date().toLocaleTimeString(); // Get the current time in HH:MM:SS format
    logEntry.textContent = `[${currentTime}] ${message}`; // Set the log message with timestamp
    logList.appendChild(logEntry); // Add the log entry to the list
}

// Function to clear the log
clearLogButton.addEventListener('click', function() {
    logList.innerHTML = ''; // Clear all list items in the log
});

// Function to update the slider value display in minutes:seconds format
function updateSliderValue(slider, valueDisplay) {
    valueDisplay.textContent = formatTime(slider.value); // Update the text to show formatted time
    updateSliderGradient(slider); // Update gradient color based on slider value
}

// Listen to input events for both Arena timer
timeSlider.addEventListener('input', function() {
    updateSliderValue(timeSlider, sliderValue); // Update the Arena timer
    if (isTimerRunning) {
        timeRemaining = timeSlider.value; // Update timeRemaining based on slider adjustment
    }
});

// Listen to input events for Market timer
marketTimeSlider.addEventListener('input', function() {
    updateSliderValue(marketTimeSlider, marketSliderValue); // Update the Market timer
    if (isMarketTimerRunning) {
      marketTimeRemaining = marketTimeSlider.value; // Update marketTimeRemaining based on slider adjustment
    }
});

// Function to update the gradient color of the slider based on its value
function updateSliderGradient(slider) {
    const value = slider.value;
    const min = slider.min;
    const max = slider.max;
    const percentage = (value - min) / (max - min) * 100; // Calculate slider progress percentage
    slider.style.background = `linear-gradient(to right, #007bff ${percentage}%, #ddd ${percentage}%)`; // Apply gradient
}

// Function to format seconds into minutes:seconds format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}

// Function to start the Arena timer
function startTimer() {
    if (isTimerRunning) return; // Prevent starting multiple timers

    timeRemaining = timeSlider.value; // Time in seconds
    isTimerRunning = true;

    countdown = setInterval(function() {
        timeSlider.value = timeRemaining; // Update the slider to match the countdown
        sliderValue.textContent = formatTime(timeRemaining); // Update display value
        updateSliderGradient(timeSlider);

        if (timeRemaining <= 0) {
            clearInterval(countdown); // Stop the timer when it reaches 0
            isTimerRunning = false;
            alarmSound.play(); // Play sound when timer hits zero
            addLogEntry("Arena Reminder");
        } else {
            timeRemaining--; // Decrement time by 1 second
        }
    }, 1000); // Update every second
}

// Function to start the Market timer
function startMarketTimer() {
    if (isMarketTimerRunning) return; // Prevent starting multiple timers

    marketTimeRemaining = marketTimeSlider.value; // Time in seconds
    isMarketTimerRunning = true;

    marketCountdown = setInterval(function() {
        marketTimeSlider.value = marketTimeRemaining; // Update the slider to match the countdown
        marketSliderValue.textContent = formatTime(marketTimeRemaining); // Update display value
        updateSliderGradient(marketTimeSlider);

        if (marketTimeRemaining <= 0) {
            clearInterval(marketCountdown); // Stop the timer when it reaches 0
            isMarketTimerRunning = false;
            alarmSound.play(); // Play sound when timer hits zero
            addLogEntry("Market Reminder");
        } else {
            marketTimeRemaining--; // Decrement time by 1 second
        }
    }, 1000); // Update every second
}

// Function to stop the Arena timer
function stopTimer() {
    clearInterval(countdown);
    isTimerRunning = false;
    timeSlider.value = timeRemaining; // Keep the slider where it was
    sliderValue.textContent = formatTime(timeRemaining); // Keep the time displayed
    updateSliderGradient(timeSlider); // Reset gradient
}

// Function to stop the Market timer
function stopMarketTimer() {
    clearInterval(marketCountdown);
    isMarketTimerRunning = false;
    marketTimeSlider.value = marketTimeRemaining; // Keep the slider where it was
    marketSliderValue.textContent = formatTime(marketTimeRemaining); // Keep the time displayed
    updateSliderGradient(marketTimeSlider); // Reset gradient for Market timer
}

// Set the slider to 15 minutes when the "15 Minutes" button is pressed and start the Arena timer
set15MinutesButton.addEventListener('click', function() {
    timeSlider.value = 900; // Set slider to 15 minutes (900 seconds)
    sliderValue.textContent = formatTime(900); // Update displayed value to 15:00
    updateSliderGradient(timeSlider); // Update gradient to match 15 minutes
    startTimer(); // Start the timer immediately
});

// Set the timer to 1 hour (3600 seconds) when the "1 Hour" button is pressed
set1HourButton.addEventListener('click', function() {
    marketTimeSlider.value = 3600; // Set slider to 1 hour (3600 seconds)
    marketSliderValue.textContent = formatTime(3600); // Update displayed value to 1:00:00
    updateSliderGradient(marketTimeSlider); // Update gradient to match 1 hour
    startMarketTimer();
});

// Add event listeners for Start and Stop buttons for Arena
startButton.addEventListener('click', function() {
    startTimer();
});
stopButton.addEventListener('click', function() {
    stopTimer();
});

// Add event listeners for Start and Stop buttons for Market
startMarketButton.addEventListener('click', function() {
    startMarketTimer();
});
stopMarketButton.addEventListener('click', function() {
    stopMarketTimer();
});

// Initialize the slider gradients when the page loads
window.onload = function() {
    addLogEntry('RAID Shadow Legends Management started');
    updateSliderGradient(timeSlider); // Initialize Arena slider gradient on page load
    updateSliderGradient(marketTimeSlider); // Initialize Market slider gradient on page load
    sliderValue.textContent = formatTime(timeSlider.value); // Set initial Arena time display
    marketSliderValue.textContent = formatTime(marketTimeSlider.value); // Set initial Market time display
};
