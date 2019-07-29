import express = require("express");
import { validationHandler } from "../utils/tools";

export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const validationResult = await req.getValidationResult();
  const errorMsgs = validationHandler(validationResult);

  if (errorMsgs) {
    return res.status(400).json({
      errors: errorMsgs
    });
  }

  next();
};
