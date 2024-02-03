const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const user = require("../models/User");
const Post = require("../models/Post");
const comment = require("../models/comment");
const verifyToken = require("../verifyToken");
//create

router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new comment(req.body);
    const savedComment = await newComment.save();
    console.log(savedComment);
    return res.status(200).json(savedComment);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ err: err.message });
  }
});

//update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    return res.status(200).json(updatedComment);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

//delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await comment.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Comment has been deleted" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});
//get post comments
router.get("/post/:postId", async (req, res) => {
  try {
    const Comments = await comment.find({ postId: req.params.postId });
    console.log(Comments);
    return res.status(200).json(Comments);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
