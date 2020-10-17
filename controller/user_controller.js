const Users = require('../models/users');  //import the database file in which we stored our users

module.exports.profile = function(req,res){
    // return res.end('<h1> user profile </h1>');
    return res.render('users',{    //'users' it is filename in views section to which control go..
        title: "users"
    });
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
module.exports.create_session = function(req,res){
    return res.redirect('/');
}

