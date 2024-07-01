const express = require("express");
const jwt = require("jsonwebtoken");

const { User, Account } = require("../db/index.js");
const {
  signUpInputValidation,
  signInInputValidation,
  updateInputValidation,
  userAuthMiddleware,
} = require("../middlewares/user.js");
const { JWT_SECRET } = require("../config.js");

const userRouter = express.Router();

userRouter.post("/signup", signUpInputValidation, async (req, res) => {
  try {
    const { username, password, firstName, lastName, balance } = req.body;
    const isUserExist = await User.findOne({ username: username });
    if (isUserExist) {
      return res.status(409).json({ msg: "User Already Exists" });
    }
    const response = await User.create({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    if (response) {
      const acc = await Account.create({
        userId: response._id,
        balance: balance,
      });
      const token = jwt.sign({ userId: response._id }, JWT_SECRET);
      return res
        .status(200)
        .json({ msg: "User Created Successfully", token: token });
    } else {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

userRouter.post("/login", signInInputValidation, async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await User.findOne({
      username: username,
      password: password,
    });
    if (response) {
      const token = jwt.sign({ userId: response._id }, JWT_SECRET);
      return res.status(200).json({ msg: "Login Successful", token: token });
    } else {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

userRouter.get("/profile", userAuthMiddleware, async (req, res) => {
  try {
    const response = await User.findOne({
      _id: req.userId,
    });
    if (response) {
      res.status(200).json({
        msg: "Data Fetched Sucessfully",
        firstName: response.firstName,
        lastName: response.lastName,
        username: response.username,
      });
    } else {
      res.status(401).json({
        msg: "Wrong User",
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});
userRouter.put(
  "/update",
  userAuthMiddleware,
  updateInputValidation,
  async (req, res) => {
    try {
      const { username, password, firstName, lastName } = req.body;
      const response = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
        }
      );
      if (response) {
        return res.status(200).json({ msg: "User Updated Successfully" });
      } else {
        return res.status(500).json({ msg: "Internal Server Error" });
      }
    } catch (e) {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

userRouter.get("/bulk", userAuthMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const response = await User.find({
      $or: [
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } },
      ],
    });
    res.status(200).json({
      users: response.map((user) => {
        return {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }),
    });
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = userRouter;

//user1 : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjgyNThiOTk5MWJkNjE2OGI2OTI3ZmQiLCJpYXQiOjE3MTk4MTg0MjV9.m8Af6CAjvI-enty5rJA_p4jRLGS2iIUoRqdAmiJNzKU
//user2 : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjgyNTkwNzU1NWIwYWZkNmY4Njg5MWQiLCJpYXQiOjE3MTk4MTg1MDN9.eYK7ae8i4EreZQmLurB8awzFi9QoietJHycZCj-f_9M
