const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, deleteTask, getTask, updateTask } = require('../controllers/tasks');

router.route('/getAllTasks').get(getAllTasks)
router.route('/createTask').post(createTask)
router.route('/getTask/:id').get(getTask)
router.route('/updateTask/:id').patch(updateTask)
router.route('/deleteTask/:id').delete(deleteTask)

module.exports = router;
