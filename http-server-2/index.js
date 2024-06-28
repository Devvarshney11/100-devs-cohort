const express = require("express");
const users = require("./constants");
const port = 5000;
const app = express();
app.use(express.json());
// function findSum(n) {
//   let sum = 0;
//   for (let i = 0; i < n; i++) {
//     sum += i;
//   }
//   return sum;
// }

// app.get("/", (req, res) => {
//   const n = req.query.n;
//   const sum = findSum(n);
//   console.log(sum);
//   res.send("Sum is: " + sum);
// });

app.get("/", (req, res) => {
  const JohnsKidneys = users[0].kidneys;
  const JohnsKidneysLength = JohnsKidneys.length;
  let JohnsHealthyKidneys = 0;
  let JohnsUnhealthyKidneys = 0;
  for (let i = 0; i < JohnsKidneysLength; i++) {
    if (JohnsKidneys[i].healthy === true) {
      JohnsHealthyKidneys++;
    } else {
      JohnsUnhealthyKidneys++;
    }
  }
  res.json({
    JohnsHealthyKidneys,
    JohnsUnhealthyKidneys,
    JohnsTotalKidneys: JohnsKidneysLength,
  });
});
app.post("/", (req, res) => {
  const newKidneyStatus = req.body.status;
  users[0].kidneys.push({ healthy: newKidneyStatus });
  res.json({
    message: "Kidney status updated",
  });
});
app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({
    message: "All kidneys are healthy now",
  });
});
app.delete("/", (req, res) => {
  users[0].kidneys = users[0].kidneys.filter(
    (kidney) => kidney.healthy === true
  );
  res.json({
    message: "All unhealthy kidneys are removed",
    users,
  });
});
app.listen(5000, () => {
  console.log("Server is running on port" + port);
});
