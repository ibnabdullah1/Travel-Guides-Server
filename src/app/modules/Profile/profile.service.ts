import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { USER_STATUS } from '../User/user.constant';
import { User } from '../User/user.model';

const getMyProfile = async (user: JwtPayload) => {
  const profile = await User.findOne({
    email: user.email,
    status: USER_STATUS.ACTIVE,
  });

  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists!');
  }

  return profile;
};

const updateMyProfile = async ({ user, image }: any) => {
  const filter = {
    email: user.email,
    status: USER_STATUS.ACTIVE,
  };

  const profile = await User.findOne(filter);
  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, 'User profile does not exists!');
  }

  const result = await User.findOneAndUpdate(
    filter,
    { profilePhoto: image },
    { new: true }
  );

  return result;
};

export const ProfileServices = {
  getMyProfile,
  updateMyProfile,
};
