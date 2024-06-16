const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addUserToSubTask = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    subTaskId: Joi.string().required().custom(objectId),
  }),
};

const removeUserFromSubTask = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    subTaskId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  addUserToSubTask,
  removeUserFromSubTask,
};
