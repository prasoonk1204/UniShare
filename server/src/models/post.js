import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  tags: [String],
  createdAt: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
