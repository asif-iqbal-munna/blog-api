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

const getBlogByIdFromDb = async (blogId: string) => {
  return Blog.findById(blogId).populate('author').lean();
};

const deleteBlogFromDb = async (blogId: string) => {
  return Blog.findByIdAndDelete(blogId);
};

export const BlogServices = {
  createBlogIntoDb,
  updateBlogIntoDb,
  deleteBlogFromDb,
  getBlogByIdFromDb,
};
