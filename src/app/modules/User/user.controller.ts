import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userRegister = catchAsync(async (req, res) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});
const addNewFollowUser = catchAsync(async (req, res) => {
  const user = await UserServices.addNewFollowUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Following Successfully',
    data: user,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserRole(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Role Updated successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Deleted successfully',
    data: result,
  });
});

export const UserControllers = {
  addNewFollowUser,
  getSingleUser,
  userRegister,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
