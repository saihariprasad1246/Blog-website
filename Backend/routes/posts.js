const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const user = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/comment");
const verifyToken = require("../verifyToken");
//create

router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    console.log(savedPost);
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

//update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

//delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });

    res.status(200).json({ message: "POst has been deleted" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});
//get post details
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    return res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
});
router.get("/", async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const sF = {
      title: {
        $regex: query.search,
        $options: "i",
      },
    };
    const posts = await Post.find(query.search ? sF : null);
    console.log(posts);
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
});

//get use posts
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    console.log(posts);
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
