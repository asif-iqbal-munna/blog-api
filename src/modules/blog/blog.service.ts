import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDb = async (blog: IBlog) => {
  return Blog.create(blog);
};

const updateBlogIntoDb = async (blog: IBlog, blogId: string) => {
  return Blog.findByIdAndUpdate(blogId, blog, {
    new: true,
    runValidators: true,
  });
};

export const BlogServices = {
  createBlogIntoDb,
  updateBlogIntoDb,
};
