var cards = ['1C.png',
    '1D.png',
    '1H.png',
    '1S.png',
    '2C.png',
    '2D.png',
    '2H.png',
    '2S.png',
    '3C.png',
    '3D.png',
    '3H.png',
    '3S.png',
    '4C.png',
    '4D.png',
    '4H.png',
    '4S.png',
    '5C.png',
    '5D.png',
    '5H.png',
    '5S.png',
    '6C.png',
    '6D.png',
    '6H.png',
    '6S.png',
    '7C.png',
    '7D.png',
    '7H.png',
    '7S.png',
    '8C.png',
    '8D.png',
    '8H.png',
    '8S.png',
    '9C.png',
    '9D.png',
    '9H.png',
    '9S.png',
    'AC.png',
    'AD.png',
    'AH.png',
    'AS.png',
    'XR.png',
    'XU.png'];

var faceCards = ['JC.png',
    'JD.png',
    'JH.png',
    'JS.png',
    'KC.png',
    'KD.png',
    'KH.png',
    'KS.png',
    'QC.png',
    'QD.png',
    'QH.png',
    'QS.png'];

var currentIndex = 0;
var currentCard, match, suite, reps, repString, exercise, upper, lower, core, cardio, wild, exString;
var regex = /(\w)(\w).png/;
var finished = false;
var skipFace = false;
var isFace = false;

/* Randomize array in-place using Durstenfeld shuffle algorithm */
var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function startWorkout() {
    var deck = document.getElementById("deck");
    var chooser = document.getElementById("chooser");
    var timerRow = document.getElementById("timer-row");
    
    configureWorkout();
    getCardValue(cards[0]);
    exercise = getExercise(suite);
    exString = getReps(reps) + " " + exercise;
    deck.style.display = "block";
    chooser.style.display = "none";
    timerRow.style.display = "block";
    startTimer();

    document.getElementById("exercise").innerHTML = exString;
    document.getElementById("img").innerHTML = "<img src='./card_images/" + cards[0] + "' height='500' width='350'>";
    // speak(exString);
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        nextImage();
    }
  })

function nextImage() { 
    if (currentIndex < cards.length - 1) {
        getCardValue(cards[currentIndex + 1]);
        exercise = getExercise(suite);
        exString = getReps(reps) + " " + exercise;
        document.getElementById("exercise").innerHTML = exString;
        document.getElementById("img").innerHTML = "<img src='./card_images/" + cards[currentIndex + 1] + "' height='500' width='350'>";
        // speak(exString);
    }
    else {
        if (finished == false) {
            document.getElementById("exercise").innerHTML = "Workout Completed!";
            document.getElementById("img").innerHTML = "<img src='./done.jpg'>";
            pauseTimer();
            finished = true;
        }
        
    }
    currentIndex += 1;
}

function getCardValue(card) {
    match = null;
    match = regex.exec(card);
    if (match != null) {
        suite = match[2];
        reps = match[1];
    }
}

function getExercise(suite) {
    switch (suite) {
        case "H":
            return upper;
            break;
        case "C":
            return lower;
            break;
        case "D":
            return core;
            break;
        case "S":
            return cardio;
            break;
        case "R":
        case "U":
            return wild;
            break;
        default:
            break;
    }
}

function getReps(reps) {
    if (reps == "J" || reps == "Q" || reps == "K" || reps == "A" || reps == "1") {
        return "10";
    } else if(reps == "X") {
        return "5";
    } else {
        return reps;
    }
}

function configureWorkout() {
    var upperDdl = document.getElementById("upper");
    var lowerDdl = document.getElementById("lower");
    var coreDdl = document.getElementById("core");
    var cardioDdl = document.getElementById("cardio");
    var wildDdl = document.getElementById("wild");

    upper = upperDdl.options[upperDdl.selectedIndex].value;
    lower = lowerDdl.options[lowerDdl.selectedIndex].value;
    core = coreDdl.options[coreDdl.selectedIndex].value;
    cardio = cardioDdl.options[cardioDdl.selectedIndex].value;
    wild = wildDdl.options[wildDdl.selectedIndex].value;
    skipFace = document.querySelector('#faceCheckbox').checked;
    if (!skipFace)
        cards = cards.concat(faceCards);
    shuffle(cards); 
}

function speak(ex) {
    var msg = new SpeechSynthesisUtterance(ex);
    window.speechSynthesis.speak(msg);
}

///////////////////////////////
// https://medium.com/@olinations/an-accurate-vanilla-js-stopwatch-script-56ceb5c6f45b
///////////////////////////////
var startTimerButton, pauseTimerButton, timerDisplay;
var domReady = function(callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function() {
  startTimerButton = document.querySelector('.startTimer');
  pauseTimerButton = document.querySelector('.pauseTimer');
  timerDisplay = document.querySelector('.timer');
});


var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;
function startTimer(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
// change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.   
 
    paused = 0;
    running = 1;
timerDisplay.style.background = "#FF0000";
    timerDisplay.style.cursor = "auto";
    timerDisplay.style.color = "yellow";
    startTimerButton.classList.add('lighter');
    pauseTimerButton.classList.remove('lighter');
    startTimerButton.style.cursor = "auto";
    pauseTimerButton.style.cursor = "pointer";
  }
}
function pauseTimer(){
  if (!difference){
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
    timerDisplay.style.background = "#A90000";
    timerDisplay.style.color = "#690000";
    timerDisplay.style.cursor = "pointer";
    startTimerButton.classList.remove('lighter');
    pauseTimerButton.classList.add('lighter');
    startTimerButton.style.cursor = "pointer";
    pauseTimerButton.style.cursor = "auto";
  } else {
// if the timer was already paused, when they click pause again, start the timer again
startTimer();
  }
}
function resetTimer(){
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
  timerDisplay.innerHTML = 'Start Timer!';
  timerDisplay.style.background = "#A90000";
  timerDisplay.style.color = "#fff";
  timerDisplay.style.cursor = "pointer";
  startTimerButton.classList.remove('lighter');
  pauseTimerButton.classList.remove('lighter');
  startTimerButton.style.cursor = "pointer";
  pauseTimerButton.style.cursor = "auto";
}
function getShowTime(){
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference =  updatedTime - startTime;
  }
  // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((difference % (1000 * 60)) / 100);
hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}