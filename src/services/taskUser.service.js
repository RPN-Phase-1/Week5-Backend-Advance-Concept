// const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
// const ApiError = require('../utils/ApiError');

/**
 * Add user to task
 * @param {Object} taskUserBody
 * @returns {Promise<TaskUser>}
 */
const addUserToTask = async (taskUserBody) => {
  // console.log(taskUserBody);
  return prisma.taskUser.create({
    data: taskUserBody,
  });
};

/**
 * Remove user from task
 * @param {Object} taskUserBody
 * @returns {Promise<void>}
 */
const removeUserFromTask = async (taskUserBody) => {
  const { taskId, userId } = taskUserBody;
  return prisma.taskUser.deleteMany({
    where: {
      taskId,
      userId,
    },
  });
};

module.exports = {
  addUserToTask,
  removeUserFromTask,
};
