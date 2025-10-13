const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("./middleware/logger");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.send("My Week 2 API!");
});

app.post("/user", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required!" });
  }
  res.json({ message: `Hello, ${name}!` });
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ${userId} profile` });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
