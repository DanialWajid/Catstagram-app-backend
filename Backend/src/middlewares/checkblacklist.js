const BlacklistedToken = require("../models/blacklistedtoken"); // Import the model
const jwt = require("jsonwebtoken");

const checkBlacklist = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the Authorization header

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Check if the token is in the blacklist
    const isBlacklisted = await BlacklistedToken.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    // Proceed to verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.userId = decoded.userId; // Store userId for use in the next middleware
      next(); // Continue to the next middleware
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking token", error: error.message });
  }
};

module.exports = checkBlacklist;
