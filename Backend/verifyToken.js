const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(402).json("not token available");
  }
  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      return res.status(401).json("not authorised token");
    }
    req.userId = data._id;
    console.log("passed");
    next();
  });
};

module.exports = verifyToken;
