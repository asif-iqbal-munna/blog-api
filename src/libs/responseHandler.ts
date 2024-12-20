/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { ApiResponse } from '../types';

const sendResponse = <T>(res: Response, response: ApiResponse<T>): any => {
  const responseObj: ApiResponse<T> = {
    success: response.success,
    message: response.message,
    statusCode: response.statusCode || 500,
  };

  if (response.data) {
    responseObj['data'] = response.data;
  }

  if (response.error) {
    responseObj['error'] = response.error;
    responseObj['stack'] = response.stack;
  }

  return res.status(response.statusCode || 500).json(responseObj);
};

export default sendResponse;
