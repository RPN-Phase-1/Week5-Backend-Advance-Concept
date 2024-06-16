const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

/**
 * Create a subtask
 * @param {Object} subTaskBody
 * @returns {Promise<SubTask>}
 */
const createSubTask = async (subTaskBody) => {
  return prisma.subTask.create({
    data: subTaskBody,
  });
};

/**
 * Query for subtasks
 * @returns {Promise<QueryResult>}
 */
const querySubTasks = async () => {
  const subTasks = await prisma.subTask.findMany();
  return subTasks;
};

/**
 * Get subtask by id
 * @param {ObjectId} id
 * @returns {Promise<SubTask>}
 */
const getSubTaskById = async (id) => {
  return prisma.subTask.findFirst({
    where: {
      id,
    },
    include: {
      users: {
        include: {
          User: true,
        },
      },
    },
  });
};

const getSubTaskByTask = async (taskId) => {
  const subTasks = await prisma.subTask.findMany({
    where: {
      taskId,
    },
    include: {
      users: {
        include: {
          User: true,
        },
      },
    },
  });
  return subTasks;
};
const getSubTaskByUser = async (taskId, userId) => {
  const subTasks = await prisma.subTask.findMany({
    where: {
      taskId,
      users: {
        some: {
          userId,
        },
      },
    },
    include: {
      users: {
        include: {
          User: true,
        },
      },
    },
  });
  return subTasks;
};
/**
 * Update subtask by id
 * @param {ObjectId} subTaskId
 * @param {Object} updateBody
 * @returns {Promise<SubTask>}
 */
const updateSubTaskById = async (subTaskId, updateBody) => {
  const subTask = await getSubTaskById(subTaskId);
  if (!subTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubTask not found');
  }

  return prisma.subTask.update({
    where: {
      id: subTaskId,
    },
    data: updateBody,
  });
};

/**
 * Delete subtask by id
 * @param {ObjectId} subTaskId
 * @returns {Promise<SubTask>}
 */
const deleteSubTaskById = async (subTaskId) => {
  const subTask = await getSubTaskById(subTaskId);
  if (!subTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubTask not found');
  }

  return prisma.subTask.delete({
    where: {
      id: subTaskId,
    },
  });
};

module.exports = {
  createSubTask,
  querySubTasks,
  getSubTaskByTask,
  getSubTaskById,
  getSubTaskByUser,
  updateSubTaskById,
  deleteSubTaskById,
};
