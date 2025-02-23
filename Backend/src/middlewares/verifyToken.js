const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
  }

  // Extract the token part from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.userId = decoded.userId; // Attach userId to the request object
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Verify Token Function Error: " + error.message);
    return res
      .status(401)
      .json({ message: "Token verification failed: " + error.message });
  }
};

module.exports = { verifyToken };
