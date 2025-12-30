const slides = [
    { content: "Welcome to the presentation" },
    { content: "This is slide two" },
    { content: "Accessibility matters" },
    { content: "Everyone deserves equal access" },
    { content: "Thank you for watching" }
];

let currentSlideIndex = 0;
let isPlaying = false;
let timerDuration = 5;
let isLooping = true;
let timerId = null;

const startScreen = document.getElementById('start-screen');
const slideshowContainer = document.getElementById('slideshow-container');
const slideNumber = document.getElementById('slide-number');
const slideContent = document.getElementById('slide-content');
const startButton = document.getElementById('start-button');
const timerSlider = document.getElementById('timer-slider');
const timerDisplay = document.getElementById('timer-display');
const decreaseTimerButton = document.getElementById('decrease-timer');
const increaseTimerButton = document.getElementById('increase-timer');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const loopToggleButton = document.getElementById('loop-toggle');
const announcer = document.getElementById('announcer');

function announceToScreenReader(message) {
    announcer.textContent = message;
}

function showSlide(index) {
    if (index < 0) {
        index = isLooping ? slides.length - 1 : 0;
    } else if (index >= slides.length) {
        index = isLooping ? 0 : slides.length - 1;
    }
    
    currentSlideIndex = index;
    slideContent.textContent = slides[index].content;
    updateSlideNumber();
    announceToScreenReader(`Slide ${index + 1} of ${slides.length}: ${slides[index].content}`);
}

function startTimer() {
    stopTimer();
    timerId = setInterval(() => {
        nextSlide();
    }, timerDuration * 1000);
}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function startSlideshow() {
    startScreen.classList.add('hidden');
    slideshowContainer.classList.remove('hidden');
    showSlide(0);
    isPlaying = true;
    updatePlayPauseButton();
    startTimer();
    announceToScreenReader("Slideshow started");
}

function nextSlide() {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= slides.length) {
        if (isLooping) {
            nextIndex = 0;
        } else {
            stopTimer();
            isPlaying = false;
            updatePlayPauseButton();
            announceToScreenReader("End of slideshow");
            return;
        }
    }
    showSlide(nextIndex);
    if (isPlaying) {
        startTimer();
    }
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
    if (isPlaying) {
        startTimer();
    }
}

function togglePlayPause() {
    isPlaying = !isPlaying;
    updatePlayPauseButton();
    
    if (isPlaying) {
        startTimer();
        announceToScreenReader("Slideshow resumed");
    } else {
        stopTimer();
        announceToScreenReader("Slideshow paused");
    }
}

function updatePlayPauseButton() {
    if (isPlaying) {
        playPauseButton.setAttribute('aria-label', 'Pause slideshow');
        playPauseButton.setAttribute('aria-pressed', 'false');
        playPauseButton.innerHTML = '<span aria-hidden="true">⏸</span> Pause';
    } else {
        playPauseButton.setAttribute('aria-label', 'Play slideshow');
        playPauseButton.setAttribute('aria-pressed', 'true');
        playPauseButton.innerHTML = '<span aria-hidden="true">▶</span> Play';
    }
}

function updateTimerDisplay() {
    timerSlider.value = timerDuration;
    timerDisplay.textContent = `${timerDuration} second${timerDuration !== 1 ? 's' : ''}`;
}

function updateSlideNumber() {
    slideNumber.textContent = `Slide ${currentSlideIndex + 1} of ${slides.length}`;
}

function decreaseTimer() {
    if (timerDuration > 1) {
        timerDuration = Math.max(1, timerDuration - 0.5);
        updateTimerDisplay();
        announceToScreenReader(`Slide duration set to ${timerDuration} seconds`);
    }
}

function increaseTimer() {
    if (timerDuration < 15) {
        timerDuration = Math.min(15, timerDuration + 0.5);
        updateTimerDisplay();
        announceToScreenReader(`Slide duration set to ${timerDuration} seconds`);
    }
}

function toggleLoop() {
    isLooping = !isLooping;
    loopToggleButton.setAttribute('aria-pressed', isLooping);
    announceToScreenReader(isLooping ? "Looping enabled" : "Looping disabled");
}

startButton.addEventListener('click', startSlideshow);
playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);
decreaseTimerButton.addEventListener('click', decreaseTimer);
increaseTimerButton.addEventListener('click', increaseTimer);
loopToggleButton.addEventListener('click', toggleLoop);

timerSlider.addEventListener('input', (e) => {
    timerDuration = parseFloat(e.target.value);
    updateTimerDisplay();
});

timerSlider.addEventListener('change', () => {
    announceToScreenReader(`Slide duration set to ${timerDuration} seconds`);
});

document.addEventListener('keydown', (e) => {
    if (slideshowContainer.classList.contains('hidden')) {
        return;
    }
    
    switch(e.key) {
        case ' ':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowLeft':
            decreaseTimer();
            break;
        case 'ArrowRight':
            increaseTimer();
            break;
        case 'ArrowUp':
            e.preventDefault();
            prevSlide();
            break;
        case 'ArrowDown':
            e.preventDefault();
            nextSlide();
            break;
    }
});

updateTimerDisplay();