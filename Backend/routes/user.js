import express from "express";
import zod from "zod";
import { User } from "../models/UserSchema.js";
import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../Middlewares/authMiddleware.js";
import bcrypt from "bcrypt";
import { Account } from "../models/AccountSchema.js";

const router = express.Router();

const signUpSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const { success } = signUpSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    }

    const { username, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({
      username: username,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    // creating the fresh account for the user

    await Account.create({
      userId: user._id,
      balance: 1 + Math.random() * 10000,
    });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", authMiddleware, async (req, res) => {
  try {
    const { success } = signInSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "Invalid request data",
      });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Generating JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Signed in successfully",
      token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//  Route to update user information
const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
      res.status(411).json({
        message: "Error while updating information",
      });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
// Route to get users from the backend, filterable via firstName/lastName

router.get("/getUser", async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } }, // Case-insensitive regex match
        { lastName: { $regex: filter, $options: "i" } }, // Case-insensitive regex match
      ],
    });

    res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.error("Error during fetching users:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
