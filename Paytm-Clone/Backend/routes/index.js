const express = require("express");
const userRouter = require("./user.js");
const accountRouter = require("./account.js");

const mainRouter = express.Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/accounts", accountRouter);

module.exports = mainRouter;
