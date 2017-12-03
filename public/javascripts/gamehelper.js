/*
    Author: Isaac Addis
    
*/
/*
    Variables
*/
var socket = io();
var questions = [
    ["りんご", "Apple", "Orange", "Sun", "Food"],
    ["結婚式はいつだっけ？＿＿＿です。", "来週", "いつ", "何", '昨日']
];
var answersOptions = ["option1", "option2", "option3", "option4"];
var rand = Math.floor(Math.random() * 4) + 1;
var testCorrectAnswer = answersOptions[1];
var correct;
var start = performance.now();
var player1Points = 0;
var player2Points = 0;

/*
    Helper functions
*/

function passToast(content) {
    Materialize.toast(content.toString(), 1500);
}

function endGame(winner) {
    passToast("Game ended. " + winner)
    window.location = "/profile"
}

function addPoints1(amount) {
    player1Points += amount;
    socket.emit('player scored', amount);
}

function addPoints2(amount) {
    player1Points += amount;
}
/*
    Socket.io Things
*/
var ready = confirm("Ready to play?");

if (ready) {
    // random 5 digit number
    socket.emit('add user', Math.floor(Math.random() * 90000) + 10000);
    passToast('Successfully added to game. Waiting for player');
} else {
    passToast("Not ready. Redirecting to profile.");
    window.location = "/profile";
}

socket.on('counter', function(amount) {
    $('#timer').html(amount);
});
socket.on('timer over', function(winner) {
    $('#mainGame').html('<h2 class = "light center-align">' + winner + '</h2><p class = "center-align> Go back to <a href = "/profile"> your profile </a></p>');
});
socket.on('player scored', function(amount) {
    passToast('Your opponent scored ' + amount + ' points!')
});
/*
    Game logic
*/
var i = 0;
while (i < questions.length) {
    $('#question').text(questions[i][0]);
    correct = questions[i][1];


    $('#option1').text(answersOptions[rand]);
    $('#option2').text(answersOptions[rand]);
    $('#option3').text(answersOptions[rand]);
    $('#option4').text(answersOptions[rand]);

    /*
        Main game code
    */
    $(".btn").click(function() {
        if (this.text() == correct) {
            socket.emit('add points', 200);
        } else if (this.id != testCorrectAnswer) {
            passToast("Incorrect.");
        }
        i = i + 1;
    });
}