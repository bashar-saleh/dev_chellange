import { logger } from "../logger.init";

export default (err, req, res, next) => {
    logger.error(err.message);
    return res.status(500).send({errors:{msg:"Something failed."}})
}