var config = {
  apiKey: "AIzaSyBlWu-f-KRzw1Z-wKROqV7aqlzKjhu_lTw",
  authDomain: "manabu-92d3d.firebaseapp.com",
  databaseURL: "https://manabu-92d3d.firebaseio.com"
};
var app = firebase.initializeApp(config);
var signUpButton = document.getElementById('signUpBtn');
var email = document.getElementById('email');
var password = document.getElementById('password');

signUpButton.addEventListener('click',e=>{
  //Get Email and Passwords
  email = String(email.value).trim();
  password = String(password.value).trim();
  var auth = app.auth();
  var promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(e=>console.log(e.message));
  console.log("Signed up user with email: "+email);
});