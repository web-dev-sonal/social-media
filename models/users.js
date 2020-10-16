const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true   //for email to be unique so that no two user have same email id
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true  ///for capturing date and time when account created
});

const user = mongoose.model('user',userSchema);
module.exports = user;