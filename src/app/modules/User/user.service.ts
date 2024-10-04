import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const updateSingleUser = async (itemId: string, payload: any) => {
  const result = await User.findByIdAndUpdate(itemId, payload, { new: true });
  return result;
};

const addNewFollowUser = async ({
  userId,
  authorId,
}: {
  userId: any;
  authorId: any;
}) => {
  const user = await User.findById(userId);
  const authorUser = await User.findById(authorId);

  if (!user) throw new Error('User not found');
  if (!authorUser) throw new Error('Author user not found');

  const isAuthorFollow = !!user.following?.find((followingId) =>
    followingId.equals(authorId)
  );
  const isUserFollowed = !!authorUser.follower?.find((followerId) =>
    followerId.equals(userId)
  );

  if (isAuthorFollow && isUserFollowed) {
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        following: user.following.filter(
          (followingId) => followingId.toString() !== authorId
        ),
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      { _id: authorId },

      {
        follower: authorUser.follower.filter(
          (followerId) => followerId.toString() !== userId
        ),
      },
      { new: true }
    );
  } else {
    await User.findByIdAndUpdate(
      userId,
      { following: [...user.following, authorId] },
      { new: true }
    );
    await User.findByIdAndUpdate(
      authorId,
      { follower: [...authorUser.follower, userId] },
      { new: true }
    );
  }

  return user;
};

const updateUserRole = async (data: any) => {
  const result = await User.findByIdAndUpdate(
    { _id: data.id },
    { role: data.role },
    { new: true }
  );
  return result;
};
const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );

  return result;
};
export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  addNewFollowUser,
  updateSingleUser,
  updateUserRole,
  deleteUserFromDB,
};
