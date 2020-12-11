const passport = require('passport');  //import passport libarary
//const user = require('../models/users');

const jwtStrategy = require('passport-jwt').Strategy;  //import the strategy that we r using ..also LocalStrategy name is suggested by passport 

//module for extracting jwt from header
const extractJwt = require('passport-jwt').ExtractJwt;

//user model for authentication
const User = require('../models/users');

//see documentation for below code

let opts = {
     jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),  //a function for extracting jwt from request parameter
     secretOrKey: 'codial'  // a key for encrypting jwt and decrypting jwt
};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();  //a function for extracting jwt from request parameter
// opts.secretOrKey = 'codial';  // a key for encrypting jwt and decrypting jwt
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new jwtStrategy(opts, function(jwtpayload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            console.log("error in finding the user");
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;