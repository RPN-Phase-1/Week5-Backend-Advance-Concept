const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { taskService, taskUserService } = require('../services');

const getTasks = catchAsync(async (req, res) => {
  const result = await taskService.queryTasks(req.query);
  const { user } = req;

  res.render('task/tasks.view.ejs', { user, result });
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Get Tasks Success",
  //   data: result
  // });
});

const getTask = catchAsync(async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  const { user } = req;
  // console.log(task)
  res.render('task', { user, task });
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Get Task Success",
  //   data: task
  // });
});
const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req.body);

  const taskUser = {};
  taskUser.userId = req.user.id;
  taskUser.taskId = task.id;

  await taskUserService.addUserToTask(taskUser);
  getTasks(req, res);
  // res.status(httpStatus.CREATED).send({
  //   status: httpStatus.CREATED,
  //   message: "Create Task Success",
  //   data: task
  // });
});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTaskById(req.params.taskId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update Task Success',
    data: task,
  });
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTaskById(req.params.taskId);
  getTasks(req, res);
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Delete Task Success",
  //   data: null
  // });
});

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
