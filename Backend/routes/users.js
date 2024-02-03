const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const user = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/comment");
const verifyToken = require("../verifyToken");

//update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await user.findByIdAndUpdate(
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
    await user.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json({ message: "user has been deleted" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});
//getuser

router.get("/:id", async (req, res) => {
  try {
    const User = await user.findById(req.params.id);
    const { password, ...info } = User._doc;
    if (!User) {
      return res.status(404).json({ User });
    }
    return res.status(200).json({ info });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
