const express = require('express');
const router = express.Router();

const { getAllCodeReviewIssues, getCodeReviewIssue, updateCodeReviewIssue, deleteCodeReviewIssue, moveCodeReviewToPackaging } = require('../controllers/code-review');

router.route('/getAllCodeReviewIssues').get(getAllCodeReviewIssues)
router.route('/getCodeReviewIssue/:id').get(getCodeReviewIssue)
router.route('/moveCodeReviewToPackaging').post(moveCodeReviewToPackaging)
router.route('/updateCodeReviewIssue/:id').patch(updateCodeReviewIssue)
router.route('/deleteCodeReviewIssue/:id').delete(deleteCodeReviewIssue)

module.exports = router;