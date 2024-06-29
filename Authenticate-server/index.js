const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const app = express();
app.use(express.json());
const jwtSecret = "123456";
const port = 5000;
const schema = zod.object({
  username: zod.string(),
  password: zod.string(),
});
const users = [
  { username: "user1", password: "password1", name: "John Doe" },
  { username: "user2", password: "password2", name: "Jane Smith" },
  { username: "user3", password: "password3", name: "Michael Johnson" },
  { username: "user4", password: "password4", name: "Emily Davis" },
  { username: "user5", password: "password5", name: "David Wilson" },
  { username: "user6", password: "password6", name: "Sarah Anderson" },
  { username: "user7", password: "password7", name: "Daniel Martinez" },
  { username: "user8", password: "password8", name: "Olivia Taylor" },
  { username: "user9", password: "password9", name: "James Brown" },
  { username: "user10", password: "password10", name: "Sophia Thomas" },
  { username: "Dev", password: "123456", name: "Dev Varshney" },
];

function isUserValid(username, password) {
  const result = schema.safeParse({
    username: username,
    password: password,
  });
  if (!result.success) {
    return false;
  }
  return users.some(
    (user) => user.username === username && user.password === password
  );
}
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!isUserValid(username, password)) {
    res.status(401).send("Invalid username or password");
    return;
  }
  const response = jwt.sign({ username }, jwtSecret);
  res.json({ token: response });
});

app.get("/users", (req, res) => {
  try {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, jwtSecret);
    const username = decode.username;
    res.send(users);
  } catch (e) {
    res.status(403).send("Invalid token");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 27KS7N40JiQVHraZ
// mongodb+srv://dev2125cs1205:27KS7N40JiQVHraZ@cluster0.lskhzhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
