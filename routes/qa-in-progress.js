const express = require('express');
const router = express.Router();

const { getAllQAInProgressIssues, getQAInProgressIssue, updateQAInProgressIssue, deleteQAInProgressIssue, moveQAInProgressToReadyForRelease } = require('../controllers/qa-in-progress');

router.route('/getAllQAInProgressIssues').get(getAllQAInProgressIssues)
router.route('/getQAInProgressIssue/:id').get(getQAInProgressIssue)
router.route('/moveQAInProgressToReadyForRelease').post(moveQAInProgressToReadyForRelease)
router.route('/updateQAInProgressIssue/:id').patch(updateQAInProgressIssue)
router.route('/deleteQAInProgressIssue/:id').delete(deleteQAInProgressIssue)

module.exports = router;