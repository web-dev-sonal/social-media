// const posts = require('../../../models/post');
const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message: 'invalid username or password'
            });
        }

        //user found
        return res.json(200,{
            message: "sign in success! and keep token safe",
            data: {
                token: jwt.sign(user.toJSON(),'codial',{expiresIn: '100000'})
            }
        });
    }
    catch(err){
        console.log('error',err);
        return res.json(500,{
            message: "internal server error!"
        });
    }
}


