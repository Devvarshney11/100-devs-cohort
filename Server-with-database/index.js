const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 5000;
const jwtSecret = "123456";
const url =
  "mongodb+srv://dev2125cs1205:27KS7N40JiQVHraZ@cluster0.lskhzhe.mongodb.net/Authentication?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url);
const User = mongoose.model("User", {
  username: String,
  password: String,
  name: String,
});
function inputValidation(req, res, next) {
  const schema = zod.object({
    username: zod.string(),
    password: zod.string(),
    name: zod.string(),
  });
  const result = schema.safeParse({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
  });
  if (!result.success) {
    res.status(400).send("Invalid input");
    return;
  }
  next();
}
async function isExist(username) {
  const response = await User.findOne({ username: username });
  if (response) {
    return true;
  }
  return false;
}
async function isUserValid(username, password) {
  const response = await User.findOne({
    username: username,
    password: password,
  });
  if (response) {
    return true;
  }
  return false;
}
app.post("/signup", inputValidation, (req, res) => {
  try {
    if (isExist(username)) {
      res.status(400).send("User already exist");
      return;
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
      });
      newUser.save().then(() => {
        console.log("User saved");
      });
      res.send("User Saved");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
app.post("/login", (req, res) => {
  if (isUserValid(req.body.username, req.body.password)) {
    const response = jwt.sign({ username: req.body.username }, jwtSecret);
    res.json({ token: response });
  } else {
    res.status(401).send("Invalid username or password");
  }
});

app.get("/users", (req, res) => {
  try {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, jwtSecret);
    const username = decode.username;
    User.find().then((users) => {
      res.send(users);
    });
  } catch (e) {
    res.status(403).send("Invalid token");
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
