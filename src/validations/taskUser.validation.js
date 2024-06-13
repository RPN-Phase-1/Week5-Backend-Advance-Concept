const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addUserToTask = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    taskId: Joi.string().required().custom(objectId),
  }),
};

const removeUserFromTask = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    taskId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  addUserToTask,
  removeUserFromTask,
};
