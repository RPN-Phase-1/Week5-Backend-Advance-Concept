// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { subTaskUserService } = require('../services');

const addUserToSubTask = catchAsync(async (req, res) => {
  await subTaskUserService.addUserToSubTask(req.body);
  res.redirect(`/v1/task/${req.params.taskId}`);
  // res.status(httpStatus.CREATED).send({
  //   status: httpStatus.CREATED,
  //   message: "User added to SubTask successfully",
  //   data: subTaskUser
  // });
});

const removeUserFromSubTask = catchAsync(async (req, res) => {
  await subTaskUserService.removeUserFromSubTask(req.body);
  res.redirect(`/v1/task/${req.params.taskId}`);
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "User removed from SubTask successfully",
  //   data: null
  // });
});

module.exports = {
  addUserToSubTask,
  removeUserFromSubTask,
};
