const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');

const router = express.Router();
router
  .route('/')
  .post(auth('manageTasks'), validate(taskValidation.createTask), taskController.createTask)
  .get(auth('doTasks'), validate(taskValidation.getTasks), taskController.getTasks);
router
  .route('/:taskId')
  .get(auth('doTasks'), validate(taskValidation.getTask), taskController.getTask)
  .patch(auth('doTasks'), validate(taskValidation.updateTask), taskController.updateTask)
  .delete(auth('manageTasks'), validate(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;
