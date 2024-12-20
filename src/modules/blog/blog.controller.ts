import { NextFunction, Request, Response } from 'express';
import { BlogServices } from './blog.service';
import sendResponse from '../../libs/responseHandler';
import httpStatus from 'http-status';
import { Blog } from './blog.model';

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const blogData = req.body;

    blogData.author = user.userId;

    const result = await BlogServices.createBlogIntoDb(blogData);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Blog creation failed',
      });
    }

    const newBlog = await BlogServices.getBlogByIdFromDb(result._id.toString());

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Blog created successfully',
      data: newBlog,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const userId = user.userId;
    const blogId = req.params.id;
    const blogData = req.body;

    const blogExist = await Blog.getBlogById(blogId);

    if (!blogExist) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Blog does not exist',
      });
    }

    const approacher = await Blog.getBlogByAuthor(userId, blogId);

    if (!approacher) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You are not authorized to update this blog',
      });
    }

    const result = await BlogServices.updateBlogIntoDb(blogData, blogId);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Blog update failed',
      });
    }

    const updatedBlog = await BlogServices.getBlogByIdFromDb(
      result._id.toString(),
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const userId = user.userId;
    const blogId = req.params.id;

    const blogExist = await Blog.getBlogById(blogId);

    if (!blogExist) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Blog does not exist',
      });
    }

    const approacher = await Blog.getBlogByAuthor(userId, blogId);

    if (!approacher) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You are not authorized to delete this blog',
      });
    }

    const result = await BlogServices.deleteBlogFromDb(blogId);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Blog deletion failed',
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogServices.getAllBlogsFromDb(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blogs fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
