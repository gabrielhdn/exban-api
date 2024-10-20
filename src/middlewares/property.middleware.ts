import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces/error.interface';

export const validateAddress = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = {
    status: 400,
    message: '',
  };

  const { address } = req.body;

  if (req.method === 'POST' && !address) {
    error.message = 'Field "address" must be informed.';
    throw error as IError;
  }

  if (!address) {
    return next();
  }

  if (!(address.length >= 10 && address.length <= 255)) {
    error.message =
      'Field "address" must have at least 10 and a maximum of 255 characters.';

    throw error as IError;
  }

  return next();
};

export const validateValue = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { value } = req.body;

  if (req.method === 'PUT' && !value) {
    return next();
  }

  if (value <= 0) {
    const error = {
      status: 400,
      message: 'Field "value" must be greater than zero.',
    };

    throw error as IError;
  }

  return next();
};
