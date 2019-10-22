var gamePattern = [];
var userPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(".btn").click(function (event) {
    var userChosenColour = event.target.id;
    userPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userPattern.length - 1);


})

$(document).keypress(function (event) {
    if (started === false) {
        $("h1").html("Level " + level)
        nextSequence();
        started = true;
    }




});

function nextSequence() {
    userPattern = [];
    level++;
    $("h1").html("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4);

    var randomColour = buttonColours[randomNumber];

    gamePattern.push(randomColour);

    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);






}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var btn = $("#" + currentColour);
    btn.addClass("pressed");

    setTimeout(function () {
        btn.removeClass('pressed');
    }, 100);

}

function checkAnswer(currentLevel) {

    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);


        startOver();


    }
}




function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
    console.log("you are here")
}