const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSubTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow(null, ''),
    taskId: Joi.string().required().custom(objectId),
    userId: Joi.string().custom(objectId),
  }),
};

const getSubTasks = {
  query: Joi.object().keys({
    title: Joi.string(),
    taskId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSubTask = {
  params: Joi.object().keys({
    subTaskId: Joi.string().custom(objectId),
  }),
};

const updateSubTask = {
  params: Joi.object().keys({
    subTaskId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string().allow(null, ''),
      isDone: Joi.number().integer(),
    })
    .min(1),
};

const deleteSubTask = {
  params: Joi.object().keys({
    subTaskId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      taskId: Joi.string().custom(objectId),
    })
    .min(1),
};

module.exports = {
  createSubTask,
  getSubTasks,
  getSubTask,
  updateSubTask,
  deleteSubTask,
};
