const express = require('express');
const { route } = require('.');
const router = express.Router();

 const control = require('../controller/user_controller');

router.get('/profile',control.profile);
router.get('/sign-in',control.sign_in);
router.get('/sign-up',control.sign_up);
router.post('/create_id',control.create_id);
router.post('/create-session',control.createSession);

console.log('route work successfully');
module.exports = router;