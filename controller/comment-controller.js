const comment = require('../models/comment');
const post = require('../models/post');

module.exports.add_comment = function(req,res){
    //  first we will check if that post is exist or not in post model

    post.findById(req.body.post_id,function(err,Post){
        if(err){
            console.log('error in finding post in post model');
            return;
        }

        if(Post){
            comment.create({
                content: req.body.content,  //here also one thing we should check if content is blank ..for this we set requires in input of comment
                user: req.user._id,
                post: req.body.post_id   //challenjing and important point..how to get id of post on which user comment
            },function(err,comment){
                if(err){
                    console.log('error in commenting');
                    return;
                }

                //also update post model
                Post.comments.push(comment);  //automatically push comment id in comment array of Post model and this commment is object that we get back after creating 
                Post.save();  //after updating save 
        
                return res.redirect('back');
            })
        }
    })

    // comment.create({
    //     content: req.body.content,  //here also one thing we should check if content is blank then return
    //     user: req.user._id,
    //     post: req.body.post_id   //challenjing ans important point..how to get id of post on which user comment
    // },function(err,comment){
    //     if(err){
    //         console.log('error in commenting');
    //         return;
    //     }

    //     return res.redirect('back');
    // })
}

//also we have to update post model in which in comment field i have to fill comment id 