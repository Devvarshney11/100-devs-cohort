const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://dev2125cs1205:27KS7N40JiQVHraZ@cluster0.lskhzhe.mongodb.net/Paytm?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
