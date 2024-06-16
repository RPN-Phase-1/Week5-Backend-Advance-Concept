const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const subTaskUserValidation = require('../../validations/subTaskUser.validation');
const subTaskUserController = require('../../controllers/subTaskUser.controller');

const router = express.Router();

router
  .route('/:taskId')
  .post(auth('manageTasks'), validate(subTaskUserValidation.addUserToSubTask), subTaskUserController.addUserToSubTask)
  .delete(
    auth('manageTasks'),
    validate(subTaskUserValidation.removeUserFromSubTask),
    subTaskUserController.removeUserFromSubTask
  );

module.exports = router;
