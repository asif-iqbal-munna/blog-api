import { NextFunction, Request, Response } from 'express';
import { AdminServices } from './admin.service';
import sendResponse from '../../libs/responseHandler';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { BlogServices } from '../blog/blog.service';
import { Blog } from '../blog/blog.model';

const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;

    const userExist = await User.checkUserExistById(userId);

    if (!userExist) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'User does not exist',
      });
    }

    const result = await AdminServices.blockUserFromDb(userId);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'User blocking failed',
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User blocked successfully',
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = req.params.id;

    const blogExist = await Blog.getBlogById(blogId);

    if (!blogExist) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Blog does not exist',
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

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
