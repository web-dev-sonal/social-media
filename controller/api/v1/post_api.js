const posts = require('../../../models/post');
const User = require('../../../models/users');



module.exports.index = async function(req,res){
    try {
        let post = await posts.find({}).
        sort('-createdAt').  //so data is sorted according to time...first post will be of last added post
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
        
        return res.json(200,{
            message: "all posts",
            posts: post,
            all_user: users
        });
    } catch (err) {
        console.log('error',err);
        return res.json(500,{
            message: "internal server error!"
        });
    }


    // return res.json(200,{
    //     message: "hi",
    //     posts: []
    // });
}