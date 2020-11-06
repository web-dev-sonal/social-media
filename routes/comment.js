const express = require('express');
const router = express.Router();
const passport = require('passport'); //for checking authentication

const controller = require('../controller/comment-controller');

router.post('/add',passport.checkAuthentication,controller.add_comment);
module.exports = router;