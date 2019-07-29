import { createLogger, Logger } from "winston";
import config from "./config";


export const logger: Logger = createLogger(config.logger);
