const posts = require('../models/post');

module.exports.home = function(req,res){
    // return res.end('<h1> home page </h1>');
    //redirect to view engine

    // console.log(req.cookies);   //in every request we get some cookies
    // res.cookie('user_id',25);   //changing in cookie in server side
    // res.render('home',{
    //     title: "Home",
        
    // });

   /* posts.find({},function(err,post){
        return res.render('home',{
            title: "home",
            posts: post  //int this post , user field will have only user id
        });
    })*/

    posts.find({}).populate('user').exec(function(err,post){  //after populating now user field of post became user document(in posts that we are sending to views) which have full info about user
        return res.render('home',{
            title: "home",
            posts: post
        });
    })
}
