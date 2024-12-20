import { Router } from 'express';
import { validateResource } from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.schema';
import authorize from '../../middlewares/authorize';
import { API_ACCESS_CONTROLS } from '../../types';
import { BlogControllers } from './blog.controller';

const router = Router();

router.post(
  '/',
  authorize(API_ACCESS_CONTROLS.user),
  validateResource(BlogValidations.createBlogSchema),
  BlogControllers.createBlog,
);

router.patch(
  '/:id',
  authorize(API_ACCESS_CONTROLS.user),
  validateResource(BlogValidations.updateBlogSchema),
  BlogControllers.updateBlog,
);

router.delete(
  '/:id',
  authorize(API_ACCESS_CONTROLS.user),
  BlogControllers.deleteBlog,
);

router.get(
  '/',
  authorize(API_ACCESS_CONTROLS.public),
  BlogControllers.getAllBlogs,
);

export const blogRoutes = router;
