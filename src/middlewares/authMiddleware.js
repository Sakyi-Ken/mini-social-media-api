const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided. Access denied." });
    }

    const token = authHeader.split(" ")[1];
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request
    req.user = await User.findById(decoded.id).select('-password');
    // req.user = {id: decoded.id, username: decoded.username}; // if you want to use the decoded token directly

    next(); // move to next middleware or roue handler
  } catch (err) {
    console.error("Invalid or expired token", err.message);
    res.status(500).json({ message: "Internal Server Error", success: false});
  }
};

module.exports = auth;