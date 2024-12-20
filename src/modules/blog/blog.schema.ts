import { z } from 'zod';

const createBlogSchema = z.object({
  title: z.string({ message: 'Name is required' }),
  content: z.string({ message: 'Email is required' }),
});

export const BlogValidations = {
  createBlogSchema,
};
