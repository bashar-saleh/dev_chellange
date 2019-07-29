import express = require("express");
import morgan = require("morgan");
import bodyParser = require("body-parser");
import expressValidator = require("express-validator");
import cors = require("cors");
import { limiter } from "../rrl.init";
import helmet = require("helmet");

export default (app: express.Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(limiter);
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(expressValidator());
};
