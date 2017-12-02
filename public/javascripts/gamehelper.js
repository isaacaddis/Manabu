/*
	Author: Isaac Addis
	
*/

/*
	Variables
*/
var socket = io();
var questions = [["りんご","Apple","Orange","Sun","Food"], ["結婚式はいつだっけ？＿＿＿です。","来週"、"いつ"、"何"、"昨日"]];
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
// socket.on('player scored', function(amount) {
//     passToast("Player scored: " + amount);
// });
socket.on('counter', function(amount){
    $('#timer').html(amount);
});
socket.on('timer over'){
    $('#mainGame').html('<h2 class = "light center-align">Game over!</h2><p class = "center-align> Go back to <a href = "/profile"> your profile </a></p>');
}
socket
/*
	Game logic
*/
startTimer(180,$("#timer"));
var i =0;
while(i<questions.length){
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
    } else if(this.id != testCorrectAnswer) {
        passToast("Incorrect.");
    }
    i = i+1;
});
}