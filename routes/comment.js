const express = require('express');
const router = express.Router();
const passport = require('passport'); //for checking authentication

const controller = require('../controller/comment-controller');

router.post('/add',passport.checkAuthentication,controller.add_comment);
router.get('/delete/:id',passport.checkAuthentication,controller.delete); //for deleting we use get request now but in ajax we will use delete request
module.exports = router;