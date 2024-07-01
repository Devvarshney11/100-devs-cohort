const express = require("express");
const cors = require("cors");

const mainRouter = require("./routes/index.js");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
