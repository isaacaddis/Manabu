var express = require('express');
var router = express.Router();
var passport = require('passport');
var users = require('./users')
var qs = require('querystring');
var firebase = require('firebase');
var idToken;
var config = {
  apiKey: "AIzaSyBlWu-f-KRzw1Z-wKROqV7aqlzKjhu_lTw",
  authDomain: "manabu-92d3d.firebaseapp.com",
  databaseURL: "https://manabu-92d3d.firebaseio.com"
};
// var app = firebase.initializeApp(config);
// var auth = app.auth();
var signUpButton;
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
function verifyToken(idToken){
    admin.auth().verifyIdToken(idToken)
      .then(function(decodedToken) {
        var uid = decodedToken.uid;
        return uid;
        // ...
      }).catch(function(error) {
        // Handle error
        console.log("Error in verifying token");
        return 0;
      });
}
module.exports = function(router, passport) {

        /* GET home page. */
        router.get('/', function(req, res, next) {
            res.render('index');
        });
        /*
            Login
        */
        router.get('/login', function(req, res, next) {
            res.render('login', {
                // message: req.flash('loginMessage') 
            });
        });
        router.get('/token', function(req, res){

           // input value from search
          idToken = req.query.idToken;
          res.redirect('/profile');
        });
        /*
            Profile
        */
        router.get('/profile', function(req, res) {
            res.render('profile');
        });
        /*
            For login form
        */
        router.post('/login', function(req, res) {


            users.authenticate(req.body.email,req.body.password,

                function(error) {

                    if (error) {
                        return res.status(401).send('Unauthorized');

                    } else {
                        res.redirect("/profile");
                    }

                });
            res.redirect('/profile');
        });
        router.get('/logout', function(req, res){
            var promise = firebase.auth().signOut().catch(function(error){
              var errorCode = error.code;
              console.log(error.Message);
            });
            promise.catch(e=>console.log(e.message));
            console.log("Successfully logged out.");
            res.redirect('/');        
        });
        /*
            Signup
        */
        router.get('/signup', function(req, res) {
            res.render('signup');
        });
        /*
            Logout
        */
        router.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
        router.post('/signup', function(req, res){
              // var email = req.headers['email'];
              // var password = req.headers['password'];
              // var promise = auth.createUserWithEmailAndPassword(email, password);
              // promise.catch(e=>console.log(e.message));
              // console.log("Signed up user with email: "+email);
              users.addUser(req.body.email,req.body.password);
              res.redirect('/');
            });
        /*
            For all the subjects
        */
        router.get('/spanish', function(req, res) {
            res.render('spanish',{
            });
        });
        router.get('/mandarin', function(req, res) {
            res.render('mandarin');
        });
        router.get('/japanese', function(req, res) {
            res.render('japanese');
        });
        router.get('/biology', function(req, res) {
            res.render('biology');
        });
    }
