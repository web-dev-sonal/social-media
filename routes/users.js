const express = require('express');
const router = express.Router();

 const control = require('../controller/user_controller');

router.get('/profile',control.profile);

console.log('route work successfully');
module.exports = router;