import express from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";
import { Account } from "../models/AccountSchema.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.log("error is: ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();

    const { amount, to } = req.body;
    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      res.status(403).json({
        message: "Insufficient balance",
      });
    }
    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      res.status(403).json({
        message: "Invalid Account",
      });
    }
    await Account.updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: { balance: -amount },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: { balance: amount },
      }
    ).session(session);

    await session.commitTransaction();

    res.status(201).json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.log("error is: ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
export default router;
