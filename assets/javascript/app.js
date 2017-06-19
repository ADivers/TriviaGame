$(document).ready(function() {


//**********************VARIABLES*****************************
var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Which star is at the center of our Solar System?", 
"What percent of the solar systems mass does the Sun hold?", 
"How much time does sun rays take to reach earth?", 
"Which planet is nearest to the earth?", 
"A person who weighs 200 pounds on earth, what would he weigh on the surface of Mars?", 
"The Moon orbits the Earth every –", 
"What percent of the universe is dark matter?", 
"What has a gravitational pull so strong that even light cannot escape it?"];
var answerArray = [["Sun", "Moon", "Core", "Deathstar"], 
["74.2%","33.3%","99.8%","56.4%"], 
["24 Minutes", "56 Minutes", "8 Minutes", "1 Minute"], 
["Mercury","Mars","Venus","Saturn"], 
["106 pounds", "56 pounds", "26 pounds", "76 pounds"], 
["26.3 days","27.3 days","29.3 days","22.3 days"], 
["97%", "77%", "17%", "27%"], 
["Dark Matter","Sun","Saturn","Black Hole"]];
var correctAnswers = ["Sun", "99.8%", "8 Minutes", "Mercury", "76 pounds", "27.3 days", "27%", "Black Hole"];
var questionCounter = 1;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var successimage = '<iframe src="https://giphy.com/embed/nXxOjZrbnbRxS" width="356" height="480" align="middle" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/win-nXxOjZrbnbRxS">via GIPHY</a></p>';
var failimage = '<iframe src="https://giphy.com/embed/3o6Zt1TrXW8uW2lE2I" width="480" height="476" align="middle" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/3o6Zt1TrXW8uW2lE2I">via GIPHY</a></p>';
var doneimage = '<iframe src="https://giphy.com/embed/lD76yTC5zxZPG" width="480" height="352" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/the-end-thats-all-folks-lD76yTC5zxZPG">via GIPHY</a></p>'
////////******FUNCTIONS********/////////////

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + successimage;
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + failimage;
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>" + answerArray[questionCounter][0] + "</p><p class='answer'>"+answerArray[questionCounter][1]+"</p><p class='answer'>"+answerArray[questionCounter][2]+"</p><p class='answer'>"+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>" + doneimage;
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

// **************
function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//////*******JQueris**********************************************************

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	generateHTML();
	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
	selectedAnswer = $(this).text();
	if(selectedAnswer == correctAnswers[questionCounter]) {
		clearInterval(theClock);
		generateWin();
		// console.log("correct");
	}
	else {
		clearInterval(theClock);
		generateLoss();
		// console.log("not right");
	}
}); 

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); 

});  


