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
      validate: {
        validator: function (value) {
          const currentYear = new Date().getFullYear();
          const allowedYears = Array.from({ length: 5 }, (_, i) =>
            (currentYear + i).toString()
          );
          return allowedYears.includes(value);
        },
        message: (props) => `${props.value} is not a valid graduation year`,
      },
    },
    photoUrl: {
      type: String,
    },
    idDocUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
