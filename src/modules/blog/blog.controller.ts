import { NextFunction, Request, Response } from 'express';
import { BlogServices } from './blog.service';
import sendResponse from '../../libs/responseHandler';
import httpStatus from 'http-status';

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

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Blog created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = req.params.id;
    const blogData = req.body;

    const result = await BlogServices.updateBlogIntoDb(blogData, blogId);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Blog update failed',
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BlogController = {
  createBlog,
  updateBlog,
};
