import { Router } from 'express';
import authorize from '../../middlewares/authorize';
import { API_ACCESS_CONTROLS } from '../../types';
import { AdminControllers } from './admin.controller';

const router = Router();

router.patch(
  '/users/:userId/block',
  authorize(API_ACCESS_CONTROLS.admin),
  AdminControllers.blockUser,
);

router.delete(
  '/blogs/:id',
  authorize(API_ACCESS_CONTROLS.admin),
  AdminControllers.deleteBlog,
);

export const adminRoutes = router;
