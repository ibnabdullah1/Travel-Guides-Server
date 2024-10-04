import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { parseBody } from '../../middlewares/bodyParser';
import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { ImageFilesArrayZodSchema } from '../../zod/image.validation';
import { USER_ROLE } from '../User/user.constant';
import { PostControllers } from './post.controller';
import {
  PostValidationSchema,
  UpdatePostValidationSchema,
} from './post.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  upload.fields([{ name: 'postImage' }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(PostValidationSchema),
  PostControllers.createPost
);
router.get('/', PostControllers.getAllPost);
router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  PostControllers.getSinglePost
);
router.put(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(UpdatePostValidationSchema),
  PostControllers.updateSinglePost
);
router.put(
  '/post-comment/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  PostControllers.addCommentInPost
);
router.put(
  '/delete-comment/:postId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  PostControllers.deleteCommentInPost
);
router.put(
  '/update-comment/:postId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  PostControllers.updateCommentInPost
);
router.put(
  '/post-reaction/:postId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  PostControllers.addReactionInPost
);
export const PostRoutes = router;
