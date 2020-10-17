const passport = require('passport');


const express = require('express');
const { route } = require('.');
const router = express.Router();

 const control = require('../controller/user_controller');

router.get('/profile',control.profile);
router.get('/sign-in',control.sign_in);
router.get('/sign-up',control.sign_up);
router.post('/create_id',control.create_id);

//use middleware for using passport
router.post('/create_session',passport.authenticate(
    'local',   //passport strategy name
    {failureRedirect: '/users/sign-in'}
),control.create_session);

console.log('route work successfully');
module.exports = router;