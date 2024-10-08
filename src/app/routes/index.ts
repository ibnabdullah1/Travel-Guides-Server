import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { PostRoutes } from '../modules/Post/post.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { UserRoutes } from '../modules/User/user.route';
import { PaymentRoutes } from '../modules/payment/payment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
