import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/connectDB.js";

const app = express();
const PORT = process.env.PORT || 5555;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

import authRouter from "./routes/auth.js";
import regRouter from "./routes/registration.js";
import postRouter from "./routes/post.js";

app.use("/", authRouter);
app.use("/", regRouter);
app.use("/post", postRouter);

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database :", err);
  });
