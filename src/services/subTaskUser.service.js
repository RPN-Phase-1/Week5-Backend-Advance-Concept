// const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
// const ApiError = require('../utils/ApiError');

/**
 * Add user to subtask
 * @param {Object} subTaskUserBody
 * @returns {Promise<SubTaskUser>}
 */
const addUserToSubTask = async (subTaskUserBody) => {
  return prisma.subTaskUser.create({
    data: subTaskUserBody,
  });
};

/**
 * Remove user from subtask
 * @param {Object} subTaskUserBody
 * @returns {Promise<void>}
 */
const removeUserFromSubTask = async (subTaskUserBody) => {
  const { subTaskId, userId } = subTaskUserBody;
  return prisma.subTaskUser.deleteMany({
    where: {
      subTaskId,
      userId,
    },
  });
};

module.exports = {
  addUserToSubTask,
  removeUserFromSubTask,
};
