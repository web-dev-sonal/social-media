const passport = require('passport');  //import passport libarary
const user = require('../models/users');

const LocalStrategy = require('passport-local').strategy;  //import the strategy that we r using ..also LocalStrategy name is suggested by passport 

const User = require('../models/users');

//authentication 

passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email,password,done){     //email and password that we filled in form and done is a inbuilt function
        //find user and establish identity
        User.findOne({email : email},function(err,user){   //here first email is from scema and second is thst we entered or passed in function above
            if(err){
                console.log('error in authentication');
                return done(err);   //since error so pass err as arguement
            }

            if(!user || user.password != password){
                return console.log('invalid password or username');
                return done(null,false);   //null represent no error and false represent user not found
            }

            return done(null,user);   //null represent no error and user represent user found
        });
    }
));


//serializing the user , in this any key is kept in cookies for whole session
passport.serializeUser(function(user,done){
    done(null,user.id);  //null represent no error and user.id represent user id i set to cookies
});


//deserializing the user from the key in cookies
passport.deserializeUser(function(id,done){   //id from cookies
    User.findById(id,function(err,user){
        if(err){
            console.log('user cannot access the webpage');
        }

        return done(null,user);  //user represent user is allowed to acces the web page
    });
});


//export the passport
module.exports = passport;