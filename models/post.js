const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,    //contsin id of User 
        ref: 'User'  //User is exported in users.js model                              //referenced to User model
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;