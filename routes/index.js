const passport = require('passport');

const express = require('express');
const router = express.Router();

const controller = require('../controller/home_controller');

//here in this file homepage is mapped directly to controller
router.get('/',passport.checkAuthentication,controller.home);


//for mapping other url we will map in other separate file and then access that file using middleware for corresponding url
// router.get('/users',require('./users'));    //here we are using a middleware function on /users request so dont't write get method
router.use('/users',require('./users'));    //use method since it redirect to another page and it's a middleware function
router.use('/post',require('./posts'));
router.use('/comment',require('./comment'));

console.log('route work successfully');
module.exports = router;