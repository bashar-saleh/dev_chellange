import { Result } from "express-validator/check";

export const prepareErrorMessages = error => {
  return error.details.reduce((acc, { message }) => {
    acc.push(message);
    return acc;
  }, []);
};

export const validationHandler = (validationResult: Result<any>) => {
  if (validationResult.isEmpty()) return false;
  console.log(validationResult.array());
  validationResult.array().map(item => {});
  return validationResult.array().reduce((acc, { msg, param }) => {
    const singleErr = {};
    singleErr[param] = msg;
    acc.push(singleErr);
    return acc;
  }, []);
};
