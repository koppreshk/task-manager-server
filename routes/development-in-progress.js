const express = require('express');
const router = express.Router();

const { getAllDevIssues, getDevIssue, updateDevIssue, deleteDevIssue } = require('../controllers/development-in-progress');

router.route('/getAllDevIssues').get(getAllDevIssues)
router.route('/getDevIssue/:id').get(getDevIssue)
router.route('/updateDevIssue/:id').patch(updateDevIssue)
router.route('/deleteDevIssue/:id').delete(deleteDevIssue)

module.exports = router;