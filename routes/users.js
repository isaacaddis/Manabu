// // load the things we need
// var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');
var firebase = require("firebase");
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

function addUser(email, password) {
    // });
  var email = email;
  var password = password;
  var promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(e=>console.log(e.message));
  console.log("Signed up user with email: "+email);
}


function authenticate(email, password, callback) {

    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

}

module.exports = {

    addUser : addUser,
    authenticate : authenticate

}