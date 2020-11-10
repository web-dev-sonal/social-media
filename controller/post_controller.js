const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.add = function(req,res){

    //in this we will not use astnc and await bcz single query
    Post.create({
        content: req.body.content,
        user: req.user._id //signed in user have user model in req object bcz we have set in passport.setauthenticateduser 
    },function(err,post){
        if(err){
            console.log('error in posting');
            return;
        }
        req.flash('success','new post added!');
        return res.redirect('back');
    })
}

module.exports.delete = async function(req,res){
    /*
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
    });*/

    // using async and await
    try{
        let post = await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove(); //deleting a post
            Comment.deleteMany({post: req.params.id},function(err){ //deleting the comments which belong to that post
                if(err){
                    console.log('error in deleting comment');
                }
                //return res.redirect('back');
                req.flash('error','post deleted!');
                return res.redirect('/');
            });
        }
        else{
            console.log('error in deleting post');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('error',err);
        return ;
    }
    

}