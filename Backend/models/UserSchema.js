import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      minLength: 3,
      maxLength:30,
    },
    firstName: {
      type: String,
      required: true,
      trim:true,
    },
    lastName: {
      type: String,
      required: true,
      trim:true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength:6
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);