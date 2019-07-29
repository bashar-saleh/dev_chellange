import express = require("express");
import errorMiddleware from "./error.middleware";

export default (app: express.Application) => {
  app.use(errorMiddleware);
};
