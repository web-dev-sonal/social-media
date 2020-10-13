const express = require('express');
const app = express();
const port = 1000;

app.use(express.static('./assets'));   //middleware function for using statis files

const db = require('./config/mongoose');

//before routing add template library
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts); 

//extract styles and scripts from subpages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

const routes = require('./routes');   //import routes 
app.use('/',routes);             //middleware function

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`error in running server : ${port}`);
    }

    console.log(`server is running on port : ${port}`);
});