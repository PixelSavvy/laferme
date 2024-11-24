import { Response } from 'express';

export const sendResponse = (res: Response, status: number, message: string, data?: any) => {
  if (data !== undefined) {
    return res.status(status).json({ message, data });
  }
  return res.status(status).json({ message });
};
