const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/employees", require("./routes/employee"));
app.use("/api/departments", require("./routes/department"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use((req, res) => {
  res.status(404).json({
    status: 0,
    msg: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(" Server Error:", err.stack);

  res.status(500).json({
    status: 0,
    msg: "Internal Server Error",
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
