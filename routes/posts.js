const express = require('express');
const router = express.Router();
const passport = require('passport'); //for checking authentication

const postController = require('../controller/post_controller');
router.post('/add',passport.checkAuthentication,postController.add);

router.get('/delete/:id',passport.checkAuthentication,postController.delete);//necesaary to write /:id otherwise error comes
module.exports = router;