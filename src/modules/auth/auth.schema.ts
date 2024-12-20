import { z } from 'zod';

const registrationSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  email: z.string({ message: 'Email is required' }),
  password: z.string({ message: 'Password is required' }),
});

const loginSchema = z.object({
  email: z.string({ message: 'Email is required' }),
  password: z.string({ message: 'Password is required' }),
});

export const AuthValidations = {
  registrationSchema,
  loginSchema,
};
