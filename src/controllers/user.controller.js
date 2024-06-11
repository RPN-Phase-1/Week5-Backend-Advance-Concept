const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const users = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create User Success',
    data: users,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.queryUsers();
  const { user } = req;
  res.render('user', { user, users });
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: 'Get Users Success',
  //   data: result,
  // });
});

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUserById(req.params.userId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const { user } = req;
  res.render('user/edit.view.ejs', { user, result });
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: 'Get User Success',
  //   data: user,
  // });
});

const updateUser = catchAsync(async (req, res) => {
  await userService.updateUserById(req.params.userId, req.body);
  res.redirect('/v1/users');
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: 'Update User Success',
  //   data: user,
  // });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.redirect('/v1/users');
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: 'Delete User Success',
  //   data: null,
  // });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
