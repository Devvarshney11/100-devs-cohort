const zod = require("zod");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config.js");

const signUpSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  balance: zod.number(),
});

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateSchema = zod.object({
  username: zod.string().optional(),
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

function signUpInputValidation(req, res, next) {
  const response = signUpSchema.safeParse({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    balance: req.body.balance,
  });
  if (response.success) {
    next();
  } else {
    res.status(411).json({ msg: "Invalid Input" });
  }
}

function signInInputValidation(req, res, next) {
  const response = signInSchema.safeParse({
    username: req.body.username,
    password: req.body.password,
  });
  if (response.success) {
    next();
  } else {
    res.status(411).json({ msg: "Invalid Input" });
  }
}

function updateInputValidation(req, res, next) {
  const response = updateSchema.safeParse({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  if (response.success) {
    next();
  } else {
    res.status(411).json({ msg: "Invalid Input" });
  }
}

function userAuthMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ msg: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(403).json({ msg: "Unauthorized" });
  }
}

module.exports = {
  signUpInputValidation,
  signInInputValidation,
  updateInputValidation,
  userAuthMiddleware,
};
