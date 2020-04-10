var cards = [
    '1C.png',
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
    'XU.png'
];

var faceCards = [
    'JC.png',
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
    'QS.png'
];

var coreArray = [
    "* Custom *",
    "",
    "Back Extensions",
    "Bird Dog + Knee Touchs",
    "Bird Dogs",
    "Cross Body Extensions",
    "Crunches",
    "Four Count Flutter Kicks",
    "Hanging Leg Raises",
    "Heel Touches",
    "Hollow Holds",
    "Lying Knee Tucks",
    "Mountain Climbers",
    "One Leg Glute Bridges",
    "Plank Taps",
    "Plank Tucks",
    "Planks",
    "Russian Twists",
    "Scissor Kicks",
    "Side Plank w/ Rotations",
    "Side Planks",
    "Sit Ups",
    "Walkouts"
]

var upperArray = [
    "* Custom *",
    "",
    "## Pull ##",
    "Australian Pullups",
    "Pullups",
    "Rows",
    "Y Raises",
    "",
    "## Push ##",
    "Diamond Pushups",
    "Dips",
    "Handstand Pushups",
    "Hindu Pushups",
    "Marine Corps Pushups",
    "Mountain Climber Pushups",
    "Pike Pushups",
    "Push Release Pushups",
    "Shoulder Tap Pushups",
    "Spiderman Pushups",
    "Standard Pushups",
    "T Pushups"
]

var lowerArray = [
    "* Custom *",
    "",
    "Air Squats",
    "Bulgarian Split Squats",
    "Cossack Squats",
    "Donkey Kicks",
    "Glute Bridges",
    "Hindu Squats",
    "Lateral Lunges",
    "Lateral Squats",
    "Lunges",
    "One Leg RDLs",
    "Pistol Squats",
    "Quarter Jump Squats",
    "Reverse Lunge and Hops",
    "Reverse Lunges",
    "Side Lunges",
    "Single Leg Bridges",
    "Single Leg Deadlifts",
    "Squat-Lunge Combos",
    "Stair Climbs",
    "Step Ups",
    "Sumo Squats",
    "Wall Sits",
    "Y Squats"
]

var explosiveArray = [
    "* Custom *",
    "",
    "Frog Jumps",
    "Jump Lunges",
    "Jump Squats",
    "Tuck Jumps"
]

var cardioArray = [
    "* Custom *",
    "",
    "Bear Crawls",
    "Burpees",
    "Cross Mountain Climbers",
    "High Knees",
    "Jumping Jacks",
    "Rope Skips",
    "Single Leg Burpee",
    "Squat Thrusts",
    "Stationary Sprints"
]

var startTimerButton, pauseTimerButton, timerDisplay;
var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

var hearts, clubs, spades, diamonds, joker;
domReady(function() {
    timerDisplay = document.querySelector('.timer');
    hearts = document.getElementById("hearts");
    clubs = document.getElementById("clubs");
    spades = document.getElementById("spades");
    diamonds = document.getElementById("diamonds");
    joker = document.getElementById("joker");

    populateExercises(hearts, coreArray);
    populateExercises(clubs, upperArray);
    populateExercises(spades, lowerArray);
    populateExercises(diamonds, cardioArray);
    populateExercises(joker, explosiveArray);
});

var currentIndex = 0;
var currentCard, match, suite, reps, repString, exercise, upper, lower, core, cardio, wild, exString;
var heartEx, clubEx, diamondEx, spadeEx, jokerEx;
var regex = /(\w)(\w).png/;
var finished = false;
var skipFace = false;
var isFace = false;
var speakExercises = false;

/* Randomize array in-place using Durstenfeld shuffle algorithm */
var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function main() {
    getDropdownValues();
    var isValid = validateDropdowns();
    if (isValid) {
        startWorkout();
    } else {
        alert("Please ensure that all exercises are selected...");
    }
}

function validateDropdowns() {
    if (heartEx == "null" || clubEx == "null" || spadeEx == "null" || diamondEx == "null" || jokerEx == "null") {
        return false;
    } else {
        return true;
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
    speak(exString);
    deck.style.display = "block";
    chooser.style.display = "none";
    timerRow.style.display = "block";
    startTimer();

    document.getElementById("exercise").innerHTML = exString;
    document.getElementById("img").innerHTML = "<img src='./card_images/" + cards[0] + "' class='card-img'>";
    setProgressBar();
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
        speak(exString);
        document.getElementById("exercise").innerHTML = exString;
        document.getElementById("img").innerHTML = "<img src='./card_images/" + cards[currentIndex + 1] + "' class='card-img'>";   
        setProgressBar();
        currentIndex += 1;
    }
    else {
        if (!finished) {
            speak("Workout Finished!");
            document.getElementById("exercise").innerHTML = "Workout Completed!";
            document.getElementById("img").innerHTML = "<img src='./done.jpg'>";
            pauseTimer();
            finished = true;
            setProgressBar();
        }
    }
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
            return heartEx;
            break;
        case "C":
            return clubEx;
            break;
        case "D":
            return diamondEx;
            break;
        case "S":
            return spadeEx;
            break;
        case "R":
        case "U":
            return jokerEx;
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
    skipFace = document.querySelector('#faceCheckbox').checked;
    speakExercises = document.querySelector('#speechCheckbox').checked;
    
    if (!skipFace)
        cards = cards.concat(faceCards);
    shuffle(cards); 
}

function getDropdownValues() {
    var heartsDdl = hearts.options[hearts.selectedIndex].value;
    var clubsDdl = clubs.options[clubs.selectedIndex].value;
    var spadesDdl = spades.options[spades.selectedIndex].value;
    var diamondsDdl = diamonds.options[diamonds.selectedIndex].value;
    var JokerDdl = joker.options[joker.selectedIndex].value;

    var heartTxt = document.getElementById("heartTxt").value;
    var clubTxt = document.getElementById("clubTxt").value;
    var spadeTxt = document.getElementById("spadeTxt").value;
    var diamondTxt = document.getElementById("diamondTxt").value;
    var jokerTxt = document.getElementById("jokerTxt").value;

    heartEx = heartsDdl == "* Custom *" ? heartTxt : heartsDdl;
    clubEx = clubsDdl == "* Custom *" ? clubTxt : clubsDdl;
    spadeEx = spadesDdl == "* Custom *" ? spadeTxt : spadesDdl;
    diamondEx = diamondsDdl == "* Custom *" ? diamondTxt : diamondsDdl;
    jokerEx = JokerDdl == "* Custom *" ? jokerTxt : JokerDdl;
}

function populateExercises(ddl, arr) {
    for(var i = 0; i < arr.length; i++) {
        var opt = arr[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        
        ddl.appendChild(el);
    }
}

function speak(ex) {
    if (speakExercises) {
        var msg = new SpeechSynthesisUtterance(ex);
        window.speechSynthesis.speak(msg);
    }
}

function helpAlert() {
    var helpText = "<p><h5>Getting Started:</h5>Select an exercise for each suit, then press <strong>Start Workout</strong> to begin.<br></span></p>";
    helpText += "<p><h5>Options:</h5>"
    helpText += "<strong>Skip Face Cards:</strong> Show all cards except Jacks, Queens, and Kings<br/>"
    helpText += "<strong>Speak Exercises:</strong> Have exercises spoken by computer.</p>"
    helpText += "<p><h5>During Workout:</h5>"
    helpText += "Press SPACE or click on card to go to next exercise.</p>"
    swal({
        title: 'Help',
        content: {
            element: "div",
            attributes: {
                innerHTML: helpText
            }
        }
    })
}

function onSelectChange(id, txtId) {
    var sel = document.getElementById(id);
    var option = sel.options[sel.selectedIndex].text;
    var txtBox = document.getElementById(txtId);
    if(option == '* Custom *'){ 
        txtBox.style.display = "block";
    } else {
        txtBox.style.display = "none";
    }
}

function resetWorkout() {
    currentIndex = 0;
    resetTimer();
    shuffle(cards);
    startWorkout();
}

function setProgressBar()
{
    var percentage = Math.floor(((currentIndex + 1) / cards.length) * 100);
    var bar = document.getElementById('progress');
    bar.style = "width: " + percentage + "%;";
    bar.setAttribute('aria-valuenow', percentage);
    bar.innerHTML = (currentIndex + 1) + " / " + cards.length;
}

///////////////////////////////
// https://medium.com/@olinations/an-accurate-vanilla-js-stopwatch-script-56ceb5c6f45b
///////////////////////////////
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
}

function getShowTime(){
    updatedTime = new Date().getTime();
    if (savedTime){
    difference = (updatedTime - startTime) + savedTime;
    } else {
    difference =  updatedTime - startTime;
    }
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