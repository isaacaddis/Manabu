var express = require('express');
var router = express.Router();
var passport = require('passport');

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Manabu' });
});
/*
	Login
*/
router.get('/login', function(req, res, next) {
  res.render('login', { 
    // message: req.flash('loginMessage') 
    });
});
/*
	Signup
*/
router.get('/signup', function(req, res) {
	res.render('signup', { message: req.flash('signupMessage') });
});
/*
	Profile
*/
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
        user : req.user 
    });
});
/*
	Logout
*/
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
/*
    Signup Form
*/
// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;
