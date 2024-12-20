import { Router } from 'express';
import { validateResource } from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.schema';

const router = Router();

router.post('/', validateResource(BlogValidations.createBlogSchema));

export const blogRoutes = router;
