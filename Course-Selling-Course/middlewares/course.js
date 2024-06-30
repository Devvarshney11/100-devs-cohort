const zod = require("zod");
const courseSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  imageLink: zod.string(),
  price: zod.number(),
});

function courseInputValidation(req, res, next) {
  const response = courseSchema.safeParse({
    title: req.body.title,
    description: req.body.description,
    imageLink: req.body.imageLink,
    price: req.body.price,
  });
  if (response.success) {
    next();
  } else {
    res.status(411).json({
      message: "Invalid input",
    });
  }
}

module.exports = {
  courseInputValidation,
};
