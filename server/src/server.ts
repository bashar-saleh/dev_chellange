import express = require("express");
import preMiddlewares from "./middlewares/pre.middleware";
import postMiddlewares from "./middlewares/post.middlewares";
import initRoutes from "./routes";
import config from "./config";
import initDB from "./data/db.init";

const app = express();

initDB();
preMiddlewares(app);
initRoutes(app);
postMiddlewares(app);

app.listen(config.PORT, () => {
  console.log(`[SERVER] is up and running on PORT: ${config.PORT}`);
});
