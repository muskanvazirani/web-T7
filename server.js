const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://muskan:root@user.ikgzmem.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("Server started on port 3000"));
const User = require("./user");

app.post("/add", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    firstName: req.body.firstName,
  });

  try {
    const savedUser = await newUser.save();
    res.json({ message: "User added", success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      { $set: { email: req.body.email, firstName: req.body.firstName } }
    );
    res.json({ message: "User updated", success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      res.json({ success: true, user: user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.id });
    if (removedUser.deletedCount > 0) {
      res.json({ success: true, message: "User deleted" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
