const express = require('express');
const router = express.Router();

const { getAllPackagingIssues, getPackagingIssue, updatePackagingIssue, deletePackagingIssue, movePackagingToQAInProgress } = require('../controllers/packaging');

router.route('/getAllPackagingIssues').get(getAllPackagingIssues)
router.route('/getPackagingIssue/:id').get(getPackagingIssue)
router.route('/movePackagingToQAInProgress').post(movePackagingToQAInProgress)
router.route('/updatePackagingIssue/:id').patch(updatePackagingIssue)
router.route('/deletePackagingIssue/:id').delete(deletePackagingIssue)

module.exports = router;