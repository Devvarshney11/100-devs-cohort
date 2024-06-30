const { Router } = require("express");
const jwt = require("jsonwebtoken");
const {
  adminMiddleWare,
  adminInputValidation,
} = require("../middlewares/admin.js");
const { courseInputValidation } = require("../middlewares/course.js");
const { Admin, Course } = require("../db/index.js");
const router = Router();
const jwtSecret = "secret";
router.post("/signup", adminInputValidation, async (req, res) => {
  const { username, password } = req.body;
  const isAlreadyAdmin = await Admin.findOne({
    username: username,
  });
  if (isAlreadyAdmin) {
    return res.status(400).json({
      message: "Username already exists",
    });
  }
  const admin = await Admin.create({
    username: username,
    password: password,
  });
  if (admin) {
    const token = jwt.sign(
      {
        username: admin.username,
        id: admin._id,
      },
      jwtSecret
    );
    res.status(200).json({
      message: "Admin created successfully",
      token: token,
    });
  } else {
    res.status(500).json({
      message: "Admin creation failed",
    });
  }
});

router.post(
  "/courses",
  adminMiddleWare,
  courseInputValidation,
  async (req, res) => {
    const { title, description, imageLink, price } = req.body;
    const response = await Course.create({
      title,
      description,
      imageLink,
      price,
    });
    if (response) {
      res.status(200).json({
        message: "Course created successfully",
      });
    } else {
      res.status(500).json({
        message: "Course creation failed",
      });
    }
  }
);

router.get("/courses", adminMiddleWare, async (req, res) => {
  const courses = await Course.find({});
  if (courses) {
    res.status(200).json({
      message: "Courses fetched successfully",
      data: courses,
    });
  } else {
    res.status(500).json({
      message: "Courses fetching failed",
    });
  }
});

module.exports = router;

//Token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRldnZhciIsImlkIjoiNjY4MTViNjlhYmJmMTVjYTdkOTNlMGEwIiwiaWF0IjoxNzE5NzUzNTc3fQ.TjxnuR5cLOaSBK4h2ec-p9-4DGTgLeeGMfZm3qL_dO8
