const zod = requrie("zod");

const transferSchema = zod.object({
  to: zod.string(),
  balance: zod.number(),
});

function transferInputValidation(req, res, next) {
  const response = transferSchema.safeParse({
    to: req.body.to,
    balance: req.body.balance,
  });
  if (response.success) {
    next();
  } else {
    return res.status(411).json({
      msg: "Invalid Input",
    });
  }
}

module.exports = {
  transferInputValidation,
};
