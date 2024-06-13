const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { taskService, taskUserService, userService, subTaskService } = require('../services');

const getTasks = catchAsync(async (req, res) => {
  let result;
  if (req.user.role === 'admin') {
    result = await taskService.queryTasks(req.query);
  } else {
    result = await taskService.queryTasksByUser(req.user.id);
  }

  const { user } = req;
  const prior = [
    ['High', 'red'],
    ['Middle', 'yellow'],
    ['Low', 'green'],
  ];
  res.render('task/tasks.view.ejs', { user, result, prior });
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Get Tasks Success",
  //   data: result
  // });
});

const getTask = catchAsync(async (req, res) => {
  const userAll = await userService.queryUsers();
  const { taskId } = req.params;

  const task = await taskService.getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  const { users } = task;
  const userReady = userAll.filter((user) => !users.some((u) => u.userId === user.id));
  const { user } = req;
  let subTasks;
  let edit = true;
  if (users.some((item) => item.userId === user.id)) {
    subTasks = await subTaskService.getSubTaskByTask(taskId);
  } else {
    subTasks = await subTaskService.getSubTaskByUser(taskId, user.id);
    edit = false;
  }
  // console.log(users);
  res.render('task/task.view.ejs', { user, task, userReady, subTasks, edit });
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
  await taskService.updateTaskById(req.params.taskId, req.body);
  getTask(req, res);
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: 'Update Task Success',
  //   data: task,
  // });
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
