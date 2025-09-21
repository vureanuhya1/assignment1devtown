// index.js
const express = require("express");
const authRoutes = require("./auth"); // import authentication routes

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
