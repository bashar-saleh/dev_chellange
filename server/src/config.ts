import { format, transports } from "winston";
import path = require("path");

require("dotenv").config();

const env: any = process.env.NODE_ENV;
const logFilename = path.join(__dirname, '/../logs_dev.log');
const prodLogFilename = path.join(__dirname, '/../logs_prod.log');

const config = {
  dev: {
    PORT: process.env.PORT || 5000,
    db: {
      dialect: "sqlite",
      database: "count_dev",
      storage: "./dev.sqlite",
      modelPaths: [__dirname + "/data/*.model.ts"],
      logging: false
    },
    logger: {
      level: "debug",
      format: format.combine(
        // format.colorize(),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
      transports: [new transports.Console(), new transports.File({filename: logFilename})]
    },
    jwt: {
      SECRET_KEY: "ABCDE" 
    },
    urls:{
      NUMBER_API: "http://numbersapi.com"
    }
  },
  test: {
    PORT: process.env.PORT || 5001,
  },
  prod: {
    PORT: process.env.PORT || 5002,
    db: {
      dialect: "sqlite",
      database: "count_prod",
      storage: "./prod.sqlite",
      modelPaths: [__dirname + "/data/*.model.ts"],
      logging: false
    },
    logger: {
      level: "info",
      format: format.combine(
        // format.colorize(),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
      transports: [new transports.File({filename: prodLogFilename})]
    },
    jwt: {
      SECRET_KEY: process.env.SECRET_JWT_KEY || "AB@#$fdsf1@W$*sdf" 
    },
    urls:{
      NUMBER_API: "http://numbersapi.com"
    }
  }
};



export default config[env];
