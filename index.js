const express = require('express');   //import express module after installation
const cookieParser = require('cookie-parser');  //import module for cookies after installation
const app = express();
const port = 9000;
const sassMiddleware = require('node-sass-middleware');


app.use(express.static('./assets'));   //middleware function for using statis files

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

 app.use(express.urlencoded());   //for parsing data .. a middleware function
app.use(cookieParser());   //middleware for every request to access cookies

const db = require('./config/mongoose');

//import express-session 
const session = require('express-session');

//import passport
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');

const MongoStore = require('connect-mongo')(session);  //for storing session cookies

//before routing add template library
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);          

//extract styles and scripts from subpages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

const routes = require('./routes/index');   //import routes 
// const { MongoStore } = require('connect-mongo');


//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

//middlware for session
//mongostore is used to store the session cookie
app.use(session({
    name: "codial",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    //for storing session cookie in mongoDB
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err|| 'connect mongo db set up ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

//middleware for setting user information to res.locals.user
app.use(passport.setAuthenticatedUser);

app.use('/',routes);             //middleware function  ..it should come after passport ,...at last

app.listen(port,function(err){
    if(err){
        console.log(`error in running server : ${port}`);
    }

    console.log(`server is running on port : ${port}`);
});