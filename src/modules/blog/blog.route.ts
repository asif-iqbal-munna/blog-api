import { Router } from 'express';
import { validateResource } from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.schema';
import authorize from '../../middlewares/authorize';
import { API_ACCESS_CONTROLS } from '../../types';
import { BlogController } from './blog.controller';

const router = Router();

router.post(
  '/',
  authorize(API_ACCESS_CONTROLS.admin, API_ACCESS_CONTROLS.user),
  validateResource(BlogValidations.createBlogSchema),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  authorize(API_ACCESS_CONTROLS.admin, API_ACCESS_CONTROLS.user),
  validateResource(BlogValidations.updateBlogSchema),
  BlogController.updateBlog,
);

export const blogRoutes = router;
