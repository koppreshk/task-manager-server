const express = require('express');
const router = express.Router();

const { getAllReadyForReleaseIssues, getReadyForReleaseIssue, updateReadyForReleaseIssue, deleteReadyForReleaseIssue } = require('../controllers/ready-for-release');

router.route('/getAllReadyForReleaseIssues').get(getAllReadyForReleaseIssues)
router.route('/getReadyForReleaseIssue/:id').get(getReadyForReleaseIssue)
router.route('/updateReadyForReleaseIssue/:id').patch(updateReadyForReleaseIssue)
router.route('/deleteReadyForReleaseIssue/:id').delete(deleteReadyForReleaseIssue)

module.exports = router;