import * as express from "express";
import AuthController from "./controllers/auth.controller";
import CountController from "./controllers/count.controller";
import AdminController from "./controllers/admin.controller";
import signupValidator from "./validators/signup.validator";
import loginValidator from "./validators/login.validator";
import validationHandlerMiddleware from "./middlewares/validation_handler.middlewares";
import authoriztionMiddleware from "./middlewares/authoriztion.middleware";
import adminMiddleware from "./middlewares/admin.middleware";


export default (app: express.Application) => {

    app.post("/sign-up", signupValidator(), validationHandlerMiddleware ,AuthController.signup);
    app.post("/login", loginValidator(),validationHandlerMiddleware, AuthController.login);
    app.post("/ban", authoriztionMiddleware, adminMiddleware, AdminController.ban);
    app.delete("/ban",authoriztionMiddleware, adminMiddleware, AdminController.removeBan);
    app.get("/", authoriztionMiddleware, CountController.index);

}