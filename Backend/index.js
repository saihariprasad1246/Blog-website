const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const authrouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");

const app = express();

//middlewares
require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin: "https://5f7cjv-5175.csb.app",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/api/auth", authrouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/images", express.static(path.join(__dirname, "/images")));
//image upload

const storag = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const upload = multer({ storage: storag });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("image has been uploaded succesfully");
  } catch (err) {
    console.log(err.message);
    res.status(404).json(err.message);
  }
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("database is connected");
  } catch (err) {
    console.log(err, "not connected");
  }
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("app is running on port 5000");
});
