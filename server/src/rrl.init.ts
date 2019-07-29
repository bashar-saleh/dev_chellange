import rateLimit = require("express-rate-limit");
import { logger } from "./logger.init";

export const limiter = new rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 25,

    message: "Too many requests created from this IP, please try again after an 5 mins"
    ,onLimitReached: (req, res, opts) =>{
        logger.info(`${req.ip} has exceeded the allowed number of requests on [URL]: ${req.url}.`);
    }
});


