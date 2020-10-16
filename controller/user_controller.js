const Users = require('../models/users');  //import the database file in which we stored our users

module.exports.profile = function(req,res){
    // return res.end('<h1> user profile </h1>');
   // return res.render('users',{    //'users' it is filename in views section to which control go..
   //     title: "users"
  //  });

    //code ..any content is accessible if anf only if user is signed in
    if(req.cookies.user_id){
        Users.findById(req.cookies.user_id,function(err,user){
            if(err){
                console.log('error in access webpage');
                return;
            }
            if(user){
                return res.render('users',{  //users is ejs file in views to which it connect to
                    title: "profile-page",
                    user: user
                })
            }
            else{
                return res.redirect('/users/sign-in');
            }
        })
    }
    else{
        return res.redirect('/users/sign-in');
        
    }
}


//rendering to sogn in page
module.exports.sign_in = function(req,res){
    return res.render('sign_in',{
        title: "sign-in"
    });
}

//rendering to sign up page
module.exports.sign_up = function(req,res){
    return res.render('sign_up',{
        title: "sign-up"
    });
}

//get the sign up data
module.exports.create_id = function(req,res){
    //first check if password and confirm password match or not
    //if(req.body.password != req.body.confirm-password){
    //    return res.redirect('back');
    //}

    //now check if enterd mail id is new or not
    //so for this we have to access database..
    Users.findOne({email: req.body.email},function(err,user){     //database query
        if(err){console.log('error in signing up'); return};

        if(!user){
            Users.create(req.body,function(err,user){  //database query
                if(err){console.log('error in signing up'); return}; 
            })

            return res.redirect('/users/sign-in');
        }
        else{
            return res.redirect('back');
        }

        
    });
}

//get the sign in data
module.exports.createSession = function(req,res){
    console.log(req.body);
    Users.findOne({email: req.body.email},function(err,user){   //call back function which find the user object if match
        if(err){console.log('error in signing in'); return};
        
        if(user){
            if(user.password != req.body.password){
                console.log('user not found');
                return res.redirect('back');   //return to that same page
            }
            else{
                console.log('user found');
                res.cookie('user_id',user.id);     //create a cookie to send to browser for using in further request
                return res.redirect('/users/profile');  //after matching connect to profile page
            }
        }
        else{
            console.log('user  not    found');
            return res.redirect('back');
        }
    });
}

