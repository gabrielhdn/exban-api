import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces/error.interface';

const calculateDigit = (baseCPF: string, initialDigit: number) => {
  let sum = 0;

  for (let i = 0; i < baseCPF.length; i++) {
    sum += parseInt(baseCPF.charAt(i)) * initialDigit--;
  }

  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
};

export const validateCPF = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = {
    status: 400,
    message: '',
  };

  const { fiscalIdentifier: cpf } = req.body;

  if (req.method === 'POST' && !cpf) {
    error.message = 'Field "fiscalIdentifier" must be informed.';
    throw error as IError;
  }

  if (!cpf) {
    return next();
  }

  if (!/^\d{11}$/.test(cpf)) {
    error.message = 'CPF must be a string with 11 numeric digits only.';
    throw error as IError;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    error.message = 'CPF must have different numbers.';
    throw error as IError;
  }

  const digit1 = calculateDigit(cpf.substring(0, 9), 10);
  const digit2 = calculateDigit(cpf.substring(0, 10), 11);

  const isCPFValid =
    digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10));

  if (!isCPFValid) {
    error.message = 'Invalid CPF.';
    throw error as IError;
  }

  return next();
};

export const validateEmail = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = {
    status: 400,
    message: '',
  };

  const { email } = req.body;

  if (req.method === 'POST' && !email) {
    error.message = 'Field "email" must be informed.';
    throw error as IError;
  }

  if (!email) {
    return next();
  }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regex.test(email)) {
    error.message = 'Invalid e-mail format.';
    throw error as IError;
  }

  return next();
};
