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

    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e=>console.log(e.message));
    console.log("Signed in user with email: "+email);
    // .catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
      // ...


}
firebase.auth().onAuthStateChanged(res,req,next,firebaseUser=>{
  if(firebaseUser){
    console.log("Logged in.");
    //TODO: Test if flash works this time
    //req.flash('Success', { msg: 'Success! You are logged in.' });
    return res.session.returnTo || '/';
  }
  else{
    console.log("Not logged in.");
  }
})
module.exports = {

    addUser : addUser,
    authenticate : authenticate

}
