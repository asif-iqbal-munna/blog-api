import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { TAccessControl } from '../types';
import { verifyToken } from '../libs/token';
import sendResponse from '../libs/responseHandler';

const authorize = (...requiredAccess: TAccessControl[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (requiredAccess.includes('public')) return next();

    const token = (req.headers.authorization || '').replace(/^Bearer\s/, '');

    if (!token) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You are not authorized!',
      });
    }

    // checking if the given token is valid
    const { decoded, expired, valid } = verifyToken(
      token as string,
      config.jwtSecret as string,
    ) as JwtPayload;

    // if not valid token, expired, return that he is not authorized
    if (!decoded || !valid || expired) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You are not authorized!',
      });
    }

    const { role, userId } = decoded;

    const user = await User.checkUserExistById(userId);

    if (!user) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'This user is not found !',
      });
    }

    const isBlocked = user?.isBlocked;
    // if blocked user, return that he is not authorized
    if (isBlocked) {
      return sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        success: false,
        message: 'This user is blocked!',
      });
    }

    if (requiredAccess && !requiredAccess.includes(role)) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You are not authorized!',
      });
    }

    req.user = decoded as JwtPayload;

    next();
  };
};

export default authorize;
