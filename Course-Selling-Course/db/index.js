const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://dev2125cs1205:27KS7N40JiQVHraZ@cluster0.lskhzhe.mongodb.net/CourseSellingApp?retryWrites=true&w=majority&appName=Cluster0"
);

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = { Admin, User, Course };
