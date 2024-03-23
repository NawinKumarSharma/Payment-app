import mongoose, { Schema } from "mongoose";

export const accountSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Account = mongoose.model("Account", accountSchema);
