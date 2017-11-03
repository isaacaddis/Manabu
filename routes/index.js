var express = require('express');
var router = express.Router();
var passport = require('passport');
var users = require('./users')
var qs = require('querystring');
var firebase = require('firebase');
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
module.exports = function(router, passport) {

        /* GET home page. */
        router.get('/', function(req, res, next) {
            res.render('index', {
                title: 'Manabu'
            });
        });
        /*
            Login
        */
        router.get('/login', function(req, res, next) {
            res.render('login', {
                // message: req.flash('loginMessage') 
            });
        });

        router.post('/login', function(req, res) {


            users.authenticate(req.body.email,req.body.password,

                function(error, authData) {

                    if (error) {
                        return res.status(401).send('Unauthorized');

                    } else {
                        return res.status(200).send(authData);
                    }

                });
        });

        /*
            Signup
        */
        router.get('/signup', function(req, res) {
            res.render('signup');
        });
        /*
            Profile
        */
        router.get('/profile', isLoggedIn, function(req, res) {
            res.render('profile', {
                user: req.user
            });
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
        
    }