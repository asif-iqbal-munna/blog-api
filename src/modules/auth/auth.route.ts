import { Router } from 'express';

import { AuthControllers } from './auth.controller';
import { validateResource } from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.schema';

const router = Router();

router.post(
  '/register',
  validateResource(AuthValidations.registrationSchema),
  AuthControllers.registerUser,
);
router.post(
  '/login',
  validateResource(AuthValidations.loginSchema),
  AuthControllers.handleLogin,
);

export const authRoutes = router;
