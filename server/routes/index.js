const { errHandler, notFound } = require("../middlewares/errHandler");
const auth = require("./auth");
const user = require("./user");
const insert = require("./insert");
const post = require("./post");
const category = require("./category");
const province = require("./province");

const initRoutes = (app) => {
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/user", user);
  app.use("/api/v1/insert", insert);
  app.use("/api/v1/post", post);
  app.use("/api/v1/category", category);
  app.use("/api/v1/province", province);

  app.use(errHandler);
  app.use(notFound);
};

module.exports = initRoutes;
