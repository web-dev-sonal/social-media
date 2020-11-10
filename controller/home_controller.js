const posts = require('../models/post');
const User = require('../models/users');

module.exports.home = async function(req,res){
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

 /*   posts.find({}).populate('user').exec(function(err,post){  //after populating now user field of post became user object(in posts that we are sending to views) which have full info about user
        return res.render('home',{
            title: "home",
            posts: post
        });
    })*/

    //now we have to populate comment also and populate user who commented on any post so comment above code
    // without using async ans await
    /*
    posts.find({}).
    populate('user'). //here user is who belong to this post
    populate(
        {
            path: 'comments',
            populate: {
                path: 'user' //here user are those who have commented on any post
            }
        }
    ).exec(function(err,post){
        User.find({},function(err,users){
            return res.render('home',{
                title: "home",
                posts: post,
                all_user: users
            });
        });
    });
*/
    // using asyncand await
    try{
        let post = await posts.find({}).
        populate('user'). //here user is who belong to this post
        populate(
            {
                path: 'comments',
                populate: {
                    path: 'user' //here user are those who have commented on any post
                }
            }
        );
        let users = await User.find({});
        
        return res.render('home',{
            title: "home",
            posts: post,
            all_user: users
        });
    }
    catch(err){
        console.log('error',err);
        return;
    }
}
