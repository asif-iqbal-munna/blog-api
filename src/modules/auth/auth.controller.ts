import { RequestHandler } from 'express';
import { User } from '../user/user.model';
import sendResponse from '../../libs/responseHandler';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import { signToken } from '../../libs/token';
import config from '../../config';

const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.checkUserExistByEmail(req.body.email);

    if (user) {
      return sendResponse(res, {
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: 'User already exist',
      });
    }

    const result = await AuthServices.registerUserIntoDb(req.body);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'User registration failed',
      });
    }

    const newUser = await User.checkUserExistById(result._id);

    sendResponse(res, {
      success: true,
      message: 'User registered successfully',
      statusCode: httpStatus.CREATED,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const handleLogin: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.checkUserExistByEmail(req.body.email);

    if (!user) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'User does not exist',
      });
    }

    if (user.isBlocked) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'User is blocked',
      });
    }

    const isPasswordValid = await User.isPasswordMatched(
      req.body.password,
      user.password,
    );

    if (!isPasswordValid) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'Invalid credentials',
      });
    }

    const jwtPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const token = signToken(jwtPayload, config.jwtSecret as string, '7d');

    sendResponse(res, {
      success: true,
      message: 'Login successfully',
      statusCode: httpStatus.OK,
      data: {
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const AuthControllers = {
  registerUser,
  handleLogin,
};
