import express from "express";
const authRouter = express.Router();
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import userAuth from "../middlewares/auth.js";

const JWT_SECRET = process.env.JWT_SECRET;

function jwtTokenCreate(user) {
  const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
}

// handles signin

authRouter.post("/signin", async (req, res) => {
  try {
    const { userId, name, email, image } = req.body;

    const existingUser = await User.findOne({ userId });

    if (!existingUser) {
      const user = new User({
        userId,
        name,
        email,
        image,
      });

      await user.save();

      const token = jwtTokenCreate(user);

      res.json({
        message: "User created successfully",
        user: user,
        token: token,
      });
    } else {
      const token = jwtTokenCreate(existingUser);

      res.json({
        message: "User exists!!",
        user: existingUser,
        token: token,
      });
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


authRouter.post("/verifytoken", userAuth, async (req, res) => {
  try {
    const user = req.user;

    console.log(user);
    res.status(200).send(user);

  } catch (err) {
    res.status(400).send("Error while fetching user : " + err.message);
  }
});

export default authRouter;
