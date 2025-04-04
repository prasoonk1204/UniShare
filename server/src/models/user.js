import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    collegeName: {
      type: String,
    },
    branch: {
      type: String,
    },
    graduationYear: {
      type: String,
      enum: {
        values: [
          "2025",
          "2026",
          "2027",
          "2028",
          "2029",
          "2030",
          "2031",
          "2032",
        ],
        message: `{VALUE} is not valid`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
