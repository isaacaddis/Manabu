// // load the things we need
// var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');
var firebase = require("firebase");
var config = {
  apiKey: "c2f7a262c8e437691037448400f624f2fe65ce2f",
  authDomain: "manabu-92d3d.firebaseapp.com",
  databaseURL: "https://manabu-92d3d.firebaseio.com",
  storageBucket: "manabu-92d3d.appspot.com",
};
firebase.initializeApp(config);
var firebaseRef = firebase.database().ref('node-client');

function addUser(email, password, callback) {

    // firebase.auth().createUserWithEmailAndPassword({

    //     email : email,
    //     password : password
    
    // }, function(error, userData) {
        
    //     callback(error, userData.uid);

    // });
    email = String(email).trim();
    password = String(password).trim();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode+": "+errorMessage);
    });
}


function authenticate(email, password, callback) {

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
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