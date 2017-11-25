// // load the things we need
// var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');
var firebase = require("firebase");
var cookies = require("cookies");
var config = {
  apiKey: "AIzaSyBlWu-f-KRzw1Z-wKROqV7aqlzKjhu_lTw",
  authDomain: "manabu-92d3d.firebaseapp.com",
  databaseURL: "https://manabu-92d3d.firebaseio.com",
  storageBucket: "manabu-92d3d.appspot.com",
};
var app = firebase.initializeApp(config);
var db = app.database();
var auth = app.auth();
// var firebaseRef = firebase.database().ref('node-client');

const setAppCookie = () => firebase.auth().currentUser &&
    firebase.auth().currentUser.getIdToken().then(token => {
        cookies.set('token', token, {
            domain: window.location.hostname,
            expire: 1 / 24, // One hour
            path: '/',
            secure: true // If served over HTTPS
        });
    });
const unsetAppCookie = () => 
    cookies.remove('token', {
        domain: window.location.hostname,
        path: '/',
    });

function addUser(email, password) {
    // });
  var email = email;
  var password = password;
  var promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(e=>console.log(e.message));
  console.log("Signed up user with email: "+email);
}


function authenticate(email, password,callback) {
    console.log("Attempting to sign in user with email: "+email);
    var promise = auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(error.Message);
    });;
    console.log("Signed in user with email: "+email);


}
function logOut(){
  var promise = firebase.auth().signOut().catch(function(error){
    var errorCode = error.code;
    console.log(error.Message);
  });
  promise.catch(e=>console.log(e.message));
  console.log("Successfully logged out.");
}
module.exports = {

    addUser : addUser,
    authenticate : authenticate

}
