import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [60, "Name cannot exceed 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      // not required — OAuth users won't have a password
      default: null,
    },
  },
  { timestamps: true }
);

// Prevent model re-compilation in dev hot-reload
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
