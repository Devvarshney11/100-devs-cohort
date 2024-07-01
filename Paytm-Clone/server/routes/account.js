const express = require("express");
const mongoose = require("mongoose");

const { userAuthMiddleware } = require("../middlewares/user.js");
const { transferInputValidation } = require("../middlewares/account.js");

const { Account } = require("../db/index.js");

const accountRouter = express.Router();

accountRouter.get("/balance", userAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const response = await Account.findOne({
      userId: userId,
    });
    if (response) {
      res.status(200).json({
        msg: "Balance Fetched Sucessfully",
        balance: response.balance,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

accountRouter.post(
  "/transfer",
  userAuthMiddleware,
  transferInputValidation,
  async (req, res) => {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      const { to, balance } = req.body;
      const account = await Account.findOne({
        userId: res.userId,
      }).session(session);
      if (!account || account.balance < balance) {
        await session.abortTransaction();
        return res.status(400).json({
          msg: "Insufficient Balance",
        });
      }
      const toAccount = await Account.findOne({
        userId: to,
      }).session(session);
      if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
          msg: "Invalid Account",
        });
      }
      await Account.updateOne(
        {
          userId: res.userId,
        },
        {
          $inc: {
            balance: -amount,
          },
        }
      ).session(session);
      await Account.updateOne(
        {
          userId: to,
        },
        {
          $inc: {
            balance: amount,
          },
        }
      ).session(session);

      await session.commitTransaction();
      res.status(200).json({
        msg: "Transfer Successful",
      });
    } catch (e) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  }
);
module.exports = accountRouter;
