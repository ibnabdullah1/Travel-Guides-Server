import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

export const UserRoutes = router;

router.post(
  '/create-user',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.userRegister
);
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.getAllUsers
);
router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.getSingleUser
);
router.put(
  '/add-follow',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.addNewFollowUser
);

router.put('', auth(USER_ROLE.ADMIN), UserControllers.updateUserRole);
router.delete('/:id', auth(USER_ROLE.ADMIN), UserControllers.deleteUser);
