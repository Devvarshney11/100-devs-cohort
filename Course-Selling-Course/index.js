const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRoutes = require("./routes/admin.js");
const userRoutes = require("./routes/user.js");

app.use(bodyParser.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
