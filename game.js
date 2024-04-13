var buttonColours = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var currentSequence = 0;

$(document).on('keypress' , function(A){
    var myCharacter = "a";
    if(A.key === myCharacter){
        (gamePattern.length === 0) ? gameStart() : null;
    }})

$(".btn").click(function(buttonClicked){
    if(isSequenceCorrect(this.id)) {
        buttonAnimation(this.id);
        makeSound(this.id);
        (currentSequence === gamePattern.length - 1) ? nextLevel() : currentSequence++;
    } else {
        gameOver();
    }
});

function nextSequence () {
    var randomNumber = Math.random();
    randomNumber = (randomNumber * 4);
    var flooredNumber = Math.floor(randomNumber);
    return flooredNumber;
}

function displayNextButton(){
    gamePattern.push(buttonColours[nextSequence()]);
    buttonAnimation(gamePattern[gamePattern.length - 1]);
    makeSound(gamePattern[gamePattern.length - 1]);
}

function buttonAnimation(buttonClicked){
    var currentButton = $("#" + buttonClicked);
    currentButton.addClass("pressed");
    setTimeout(function(){currentButton.removeClass("pressed");} , 100);
}

function makeSound(buttonClicked){
    var sound = new Audio('sounds./' + buttonClicked + '.mp3');
    sound.play();
}

function makeIncorrectSound (){
    var sound = new Audio('sounds./wrong.mp3');
    sound.play();
}

function isSequenceCorrect(buttonClicked){
    return  (buttonClicked === gamePattern[currentSequence])
}

function nextLevel() {
    buttonNonClickable(1500);
    setTimeout(() => {
        $("#level-title").text("Level " + (gamePattern.length + 1) );
    } , 500);
    
    setTimeout(displayNextButton , 1500);

    currentSequence = 0;
}

function gameStart() {
    $("#level-title").text("Level 1");
    displayNextButton();
}

function gameOver() {
    //game over and reset all
    $("#level-title").html("GAME OVER.<br>Press A Key to Start Over.");
    makeIncorrectSound();
    gameOverbackground();
    currentSequence = 0;
    gamePattern = [];
}

function gameOverbackground() {
    $("body").addClass("red-background");
    setTimeout(()=> {
        $("body").removeClass("red-background");
    }, 200)
}

function buttonNonClickable(time) {
    $(".btn").addClass("non-clickable");
    setTimeout(()=> {
        $(".btn").removeClass("non-clickable");
    } , time);
}



