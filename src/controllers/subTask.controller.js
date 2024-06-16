const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { subTaskService, subTaskUserService } = require('../services');

const createSubTask = catchAsync(async (req, res) => {
  // console.log("subtask")
  const subTask = await subTaskService.createSubTask(req.body);
  const subTaskUser = {};
  subTaskUser.userId = req.user.id;
  subTaskUser.subTaskId = subTask.id;

  await subTaskUserService.addUserToSubTask(subTaskUser);
  res.redirect(`/v1/task/${subTask.taskId}`);
  // res.status(httpStatus.CREATED).send({
  //   status: httpStatus.CREATED,
  //   message: "Create SubTask Success",
  //   data: subTaskUser
  // });
});

const getSubTasks = catchAsync(async (req, res) => {
  const result = await subTaskService.querySubTasks(req.query);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get SubTasks Success',
    data: result,
  });
});

const getSubTask = catchAsync(async (req, res) => {
  const subTask = await subTaskService.getSubTaskById(req.params.subTaskId);
  if (!subTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubTask not found');
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get SubTask Success',
    data: subTask,
  });
});

const updateSubTask = catchAsync(async (req, res) => {
  const subTask = await subTaskService.updateSubTaskById(req.params.subTaskId, req.body);
  res.redirect(`/v1/task/${subTask.taskId}`);
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Update SubTask Success",
  //   data: subTask
  // });
});

const deleteSubTask = catchAsync(async (req, res) => {
  await subTaskService.deleteSubTaskById(req.params.subTaskId);
  res.redirect(`/v1/task/${req.body.taskId}`);
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Delete SubTask Success",
  //   data: null
  // });
});

module.exports = {
  createSubTask,
  getSubTasks,
  getSubTask,
  updateSubTask,
  deleteSubTask,
};
