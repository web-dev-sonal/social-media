const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    },
    avatar: {   //field for storing the path
        type: String
    }
},{
    timestamps: true  ///for capturing date and time when account created
});

//defining storage where our file will be saved
let storage = multer.diskStorage({
    destination: function (req, file, cb) {//request , file of req and cb is a calllback function
      cb(null, path.join(__dirname,'..',AVATAR_PATH)); //join src path to destination
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

  //static function
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar'); //attach diskstorage property to multer

userSchema.statics.avatarPath = AVATAR_PATH; //defined publically for user model so that we can know where to save in controller file

const User = mongoose.model('User',userSchema);
module.exports = User;