// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { taskUserService } = require('../services');

const addUserToTask = catchAsync(async (req, res) => {
  await taskUserService.addUserToTask(req.body);
  res.redirect(`/v1/task/${req.body.taskId}`);
  // res.status(httpStatus.CREATED).send({
  //   status: httpStatus.CREATED,
  //   message: "User added to Task successfully",
  //   data: taskUser
  // });
});

const removeUserFromTask = catchAsync(async (req, res) => {
  await taskUserService.removeUserFromTask(req.body);
  res.redirect(`/v1/task/${req.body.taskId}`);

  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "User removed from Task successfully",
  //   data: null
  // });
});

module.exports = {
  addUserToTask,
  removeUserFromTask,
};
