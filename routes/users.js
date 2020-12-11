const passport = require('passport');


const express = require('express');
//const { route } = require('.');
const router = express.Router();

 const control = require('../controller/user_controller');

router.get('/profile/:id',passport.checkAuthentication,control.profile);  //middleware inserted to check whether user is signed in or not?
router.get('/sign-in',control.sign_in);
router.get('/sign-up',control.sign_up);
router.post('/create_id',control.create_id);
router.post('/update/:id',control.update);

//use middleware for using passport
router.post('/create_session',passport.authenticate(
    'local',   //passport strategy name
    {failureRedirect: '/users/sign-in',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!'}
),control.create_session);

router.get('/sign-out',control.destroy_session);
console.log('route work successfully');
module.exports = router;