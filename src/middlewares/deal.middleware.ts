import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces/error.interface';

export const validateIssueDate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = {
    status: 400,
    message: '',
  };

  const { issueDate } = req.body;

  if (req.method === 'POST' && !issueDate) {
    error.message = 'Field "issueDate" must be informed.';
    throw error as IError;
  }

  if (!issueDate) {
    return next();
  }

  const parsedIssueDate = new Date(issueDate);
  const now = new Date();

  if (isNaN(parsedIssueDate.getTime())) {
    error.message = 'Invalid date.';
    throw error as IError;
  }

  const minDate = new Date(now);
  const maxDate = new Date(now);

  minDate.setHours(0, 0, 0, 0);
  minDate.setDate(now.getDate() + 1);
  maxDate.setHours(23, 59, 59, 999);
  maxDate.setDate(now.getDate() + 5);

  if (parsedIssueDate < minDate || parsedIssueDate > maxDate) {
    error.message =
      'Field "issueDate" must be a valid date within the next 1 to 5 days.';

    throw error as IError;
  }

  return next();
};
