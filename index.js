const express = require('express');   //import express module after installation
const cookieParser = require('cookie-parser');  //import module for cookies after installation
const app = express();
const port = 9000;

app.use(express.static('./assets'));   //middleware function for using statis files

 app.use(express.urlencoded());   //for parsing data .. a middleware function
app.use(cookieParser());   //middleware for every request to access cookies

const db = require('./config/mongoose');

//import express-session 
const session = require('express-session');

//import passport
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');

//before routing add template library
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);          

//extract styles and scripts from subpages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

const routes = require('./routes/index');   //import routes 


//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

//middlware for session
app.use(session({
    name: "codial",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',routes);             //middleware function  ..it should come after passport ,...at last

app.listen(port,function(err){
    if(err){
        console.log(`error in running server : ${port}`);
    }

    console.log(`server is running on port : ${port}`);
});