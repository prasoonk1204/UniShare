import { Router } from "express";
const postRouter = Router();

import Post from "../models/post.js";
import multer from "multer";
import imagekit from "../config/imagekit.js";
import userAuth from "../middlewares/auth.js";

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([{ name: "photo", maxCount: 1 }]);

postRouter.post("/new", upload, userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ error: "User not found" });

    const { userId, name } = user;

    const { itemName, tags, createdAt } = req.body;

    if (!itemName || !req.files.photo || !tags) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const photoFile = req.files.photo[0];
    const [photoUpload] = await Promise.all([
      imagekit.upload({
        file: photoFile.buffer.toString("base64"),
        fileName: `${user.userId}-${createdAt}`,
      }),
    ]);
    
    const photoUrl = photoUpload.url;

    const post = new Post({
      userId,
      userName: name,
      itemName,
      photoUrl,
      tags,
      createdAt,
    });

    await post.save();

    res.json({ message: "Post uploaded successfully!", post });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});


postRouter.get("/all", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}); 

export default postRouter;
