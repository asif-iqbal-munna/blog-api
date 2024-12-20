import { QueryOptions } from 'mongoose';
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

const getAllBlogsFromDb = async (query: {
  search?: string;
  sort?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: string;
}) => {
  const {
    search = '',
    sort = 'createdAt',
    sortOrder = 'desc',
    filter = '',
  } = query;

  const queries: QueryOptions = {};
  if (search) {
    queries['$or'] = [
      { title: new RegExp(search, 'i') },
      { content: new RegExp(search, 'i') },
    ];
  }

  if (filter) {
    queries['author'] = filter;
  }

  return Blog.find(queries)
    .populate('author')
    .sort({ [sort]: sortOrder });
};

export const BlogServices = {
  createBlogIntoDb,
  updateBlogIntoDb,
  deleteBlogFromDb,
  getBlogByIdFromDb,
  getAllBlogsFromDb,
};
