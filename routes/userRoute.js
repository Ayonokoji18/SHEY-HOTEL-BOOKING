import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    const user = await newUser.save();
    res.send("User Registered Successfully");
  } catch (err) {
    return res.status(400).json({ err });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });

    if (user) {
      res.send(user);
    } else {
      return res.status(400).json({ message: "Login failed" });
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
});

export default router;
