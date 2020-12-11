const passport = require('passport');

const express = require('express');
const router = express.Router();

const post_api = require('../../../controller/api/v1/post_api');

router.get('/',passport.authenticate('jwt', { session: false }),post_api.index);// for autthorization

module.exports = router;