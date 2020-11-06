const mongoose=require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {   //for storing comment
        type: String,
        required: true
    },
    post: {  //post id on which comment has been done
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {  //user id who has commented on that post id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;