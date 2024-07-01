const express = require("express");
const userRouter = require("./user.js");
const mainRouter = express.Router();

mainRouter.use("/users", userRouter);

module.exports = mainRouter;
