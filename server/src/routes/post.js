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

    if (!itemName || !req.files?.photo?.length || !tags || !createdAt) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    let parsedTags;
    try {
      parsedTags = JSON.parse(tags);
      if (!Array.isArray(parsedTags)) {
        throw new Error("Invalid tags format");
      }
    } catch (err) {
      return res.status(400).json({ error: "Invalid tags format" });
    }

    const photoFile = req.files.photo[0];
    const photoUpload = await imagekit.upload({
      file: photoFile.buffer.toString("base64"),
      fileName: `${userId}-${Date.now()}`,
    });

    const photoUrl = photoUpload.url;

    const post = new Post({
      userId,
      userName: name,
      itemName,
      photoUrl,
      tags: parsedTags,
      createdAt,
    });

    await post.save();

    res.json({ message: "Post uploaded successfully!", post });
  } catch (error) {
    console.error("Upload error:", error);
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


postRouter.delete("/:id", userAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});


export default postRouter;
