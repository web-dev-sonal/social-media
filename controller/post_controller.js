const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.delete = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(post.user==req.user.id){
            post.remove(); //deleting a post
            Comment.deleteMany({post: req.params.id},function(err){ //deleting the comments which belong to that post
                if(err){
                    console.log('error in deleting comment');
                }
                //return res.redirect('back');
                return res.redirect('/');
            });
        }
        else{
            console.log('error in deleting post');
            return res.redirect('back');
        }
    });
}