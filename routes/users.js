const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/users');

router.route('/getAllUsers').get(getAllUsers);

module.exports = router;