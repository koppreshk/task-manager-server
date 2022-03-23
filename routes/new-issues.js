const express = require('express');
const router = express.Router();

const { getAllNewIssues, createNewIssue, deleteNewIssue, getNewIssue, updateNewIssue, moveNewToDev } = require('../controllers/new');

router.route('/getAllNewIssues').get(getAllNewIssues)
router.route('/createNewIssue').post(createNewIssue)
router.route('/moveNewToDev').post(moveNewToDev)
router.route('/getNewIssue/:id').get(getNewIssue)
router.route('/updateNewIssue/:id').patch(updateNewIssue)
router.route('/deleteNewIssue/:id').delete(deleteNewIssue)

module.exports = router;