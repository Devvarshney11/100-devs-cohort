const jwt = require("jsonwebtoken");
const zod = require("zod");
const jwtSecret = "secret";
const userSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});
function userMiddleware(req, res, next) {
  try {
    const token = req.headers.auth;
    const decoded = jwt.verify(token, jwtSecret);
    next();
  } catch (e) {
    res.status(403).send("Unauthorized");
  }
}

function userInputValidation(req, res, next) {
  const response = userSchema.safeParse({
    username: req.body.username,
    password: req.body.password,
  });
  if (response.success) {
    next();
  } else {
    res.status(411).send("Invalid input");
    return;
  }
}
module.exports = {
  userMiddleware,
  userInputValidation,
};
