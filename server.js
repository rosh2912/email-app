const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://mongo:27017/emailsdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Email Schema
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true },
});

const Email = mongoose.model("Email", emailSchema);

// API Endpoints
app.get("/api/emails", async (req, res) => {
  const emails = await Email.find();
  res.json(emails);
});

app.post("/api/emails", async (req, res) => {
  const email = new Email(req.body);
  await email.save();
  res.status(201).json(email);
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
