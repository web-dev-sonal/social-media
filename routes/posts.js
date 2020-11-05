const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controller/post_controller');
router.post('/add',passport.checkAuthentication,postController.add);
module.exports = router;