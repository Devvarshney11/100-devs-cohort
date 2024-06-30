const { Router } = require("express");
const jwt = require("jsonwebtoken");
const {
  userMiddleware,
  userInputValidation,
} = require("../middlewares/user.js");
const { User, Course } = require("../db/index.js");
const router = Router();
const jwtSecret = "secret";
router.post("/signup", userInputValidation, async (req, res) => {
  const { username, password } = req.body;
  const isUserExist = await User.findOne({
    username: username,
  });
  if (isUserExist) {
    return res.status(400).json({
      message: "Username already exists",
    });
  }
  const user = await User.create({
    username: username,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username: username,
        id: user._id,
      },
      jwtSecret
    );
    res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } else {
    res.status(500).json({
      message: "User creation failed",
    });
  }
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find();
  if (courses) {
    res.status(200).json({
      courses: courses,
    });
  } else {
    res.status(500).json({
      message: "Courses not found",
    });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const { courseId } = req.params;
  const { username } = req.body;

  try {
    const response = await User.updateOne(
      { username: username },
      {
        $push: { purchasedCourses: courseId },
      }
    );
    if (response.nModified > 0) {
      res.status(200).json({ message: "Course purchased successfully" });
    } else {
      res.status(500).json({ message: "Course purchase failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.body.username;
  const user = User.findOne({ username: username });
  if (user) {
    res.status(200).json({
      message: "Courses fetched successfully",
      data: user.purchasedCourses,
    });
  } else {
    res.status(500).json({
      message: "Courses fetching failed",
    });
  }
});

module.exports = router;

//Token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRldiIsImlkIjoiNjY4MTY2NTRhYjg5ZDBiODgzYTFkZGVkIiwiaWF0IjoxNzE5NzU2MzcyfQ.scsDU3vBMpVSiPGsC-IOQ5AZvGdmFzd74CPd72JtIRc
