const express = require("express");
const fs = require("fs");
const port = 5000;

const app = express();
app.use(express.json());

app.get("/files", (req, res) => {
  const directoryPath = "./Files/";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    res.status(200).send(files);
  });
});

app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = `./Files/${filename}`;
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    res.status(200).json(data);
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
