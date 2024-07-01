const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://dev2125cs1205:27KS7N40JiQVHraZ@cluster0.lskhzhe.mongodb.net/Paytm?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    mingLength: 3,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    mingLength: 3,
    maxLength: 30,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    mingLength: 3,
    maxLength: 30,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    mingLength: 8,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
