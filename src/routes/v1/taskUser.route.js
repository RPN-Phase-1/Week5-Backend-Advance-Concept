const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskUserValidation = require('../../validations/taskUser.validation');
const taskUserController = require('../../controllers/taskUser.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTasks'), validate(taskUserValidation.addUserToTask), taskUserController.addUserToTask)
  .delete(auth('manageTasks'), validate(taskUserValidation.removeUserFromTask), taskUserController.removeUserFromTask);

module.exports = router;
