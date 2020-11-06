const Post = require('../models/post');

module.exports.add = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id //signed in user have user model in req object bcz we have set in passport.setauthenticateduser 
    },function(err,post){
        if(err){
            console.log('error in posting');
            return;
        }
        return res.redirect('back');
    })
}