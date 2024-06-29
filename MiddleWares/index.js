const express = require("express");
const zod = require("zod");
const app = express();
const port = 5000;

app.use(express.json());
const schema = zod.array(zod.number());
// const users = [
//   {
//     name: "John",
//     kidneys: [
//       { id: 1, isHealthy: true },
//       { id: 2, isHealthy: false },
//       { id: 3, isHealthy: true },
//     ],
//   },
// ];

// function authenticate(req, res, next) {
//   const username = req.headers.username;
//   const password = req.headers.password;

//   if (username !== "Devvarshney" || password !== "123456") {
//     res.status(403).json({ msg: "Unauthorized" });
//     return;
//   }
//   next();
// }
// function kidneyCheck(req, res, next) {
//   const kidneyId = parseInt(req.query.kidneyId);
//   const kidney = users[0].kidneys.find((kidney) => kidney.id === kidneyId);
//   if (!kidney) {
//     res.status(411).json({ msg: "Invalid kidneyId" });
//     return;
//   }
//   next();
// }
// app.get("/healthCheckup", authenticate, kidneyCheck, (req, res) => {
//   const kidneyId = parseInt(req.query.kidneyId);
//   const kidney = users[0].kidneys.find((kidney) => kidney.id === kidneyId);
//   if (kidney.isHealthy) {
//     res.status(200).json({ msg: "Kidney is healthy" });
//   } else {
//     res.status(200).json({ msg: "Kidney is not healthy" });
//   }
// });

app.post("/healthCheckup", (req, res) => {
  const Kidneys = req.body.Kidneys;
  const response = schema.safeParse(Kidneys);
  res.send({ response });
  return;
});
//Exception handler
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).json({ msg: err.message });
//   next();
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
