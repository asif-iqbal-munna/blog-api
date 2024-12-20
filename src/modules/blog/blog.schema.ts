import { z } from 'zod';

const createBlogSchema = z.object({
  title: z.string({ message: 'Name is required' }),
  content: z.string({ message: 'Email is required' }),
});

const updateBlogSchema = z.object({
  title: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  isPublished: z.boolean().optional().nullable(),
});

export const BlogValidations = {
  createBlogSchema,
  updateBlogSchema,
};
