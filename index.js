const express = require('express');
const app = express();
const port = 1000;




app.listen(port,function(err){
    if(err){
        console.log(`error in running server : ${port}`);
    }

    console.log(`server is running on port : ${port}`);
});