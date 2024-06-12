const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const subTaskValidation = require('../../validations/subTask.validation');
const subTaskController = require('../../controllers/subTask.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('doTasks'), validate(subTaskValidation.createSubTask), subTaskController.createSubTask)
  .get(auth('doTasks'), validate(subTaskValidation.getSubTasks), subTaskController.getSubTasks);

router
  .route('/:subTaskId')
  .get(auth('doTasks'), validate(subTaskValidation.getSubTask), subTaskController.getSubTask)
  .patch(auth('doTasks'), validate(subTaskValidation.updateSubTask), subTaskController.updateSubTask)
  .delete(auth('manageTasks'), validate(subTaskValidation.deleteSubTask), subTaskController.deleteSubTask);

module.exports = router;
