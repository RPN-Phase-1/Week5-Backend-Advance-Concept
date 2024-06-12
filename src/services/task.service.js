const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

/**
 * Create a task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const createTask = async (taskBody) => {
  return prisma.task.create({
    data: taskBody,
  });
};

/**
 * Query for tasks
 * @returns {Promise<QueryResult>}
 */
const queryTasks = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      priority: 'asc',
    },
  });
  return tasks;
};

/**
 * Get task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const getTaskById = async (id) => {
  return prisma.task.findFirst({
    where: {
      id,
    },
    include: {
      subTasks: true,
      users: {
        include: {
          User: true,
        },
      },
    },
  });
};

/**
 * Update task by id
 * @param {ObjectId} taskId
 * @param {Object} updateBody
 * @returns {Promise<Task>}
 */
const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: updateBody,
    include: {
      subTasks: true,
      users: {
        include: {
          User: true,
        },
      },
    },
  });
};

/**
 * Delete task by id
 * @param {ObjectId} taskId
 * @returns {Promise<Task>}
 */
const deleteTaskById = async (taskId) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }

  return prisma.task.delete({
    where: {
      id: taskId,
    },
  });
};

module.exports = {
  createTask,
  queryTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
