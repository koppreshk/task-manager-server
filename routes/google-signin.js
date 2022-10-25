const express = require('express');
const router = express.Router();
const { manageGoogleSignIn } = require('../controllers/google-signin');

router.route('/google-signin').post(manageGoogleSignIn);

module.exports = router;