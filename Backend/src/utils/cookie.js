const jwt = require("jsonwebtoken");

const generateTokenSetHeader = (res, userId) => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in the .env file");
    return;
  }

  // Generate the JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d",
  });

  // Set the token in the Authorization header with the Bearer scheme
  res.setHeader("Authorization", `Bearer ${token}`);

  return token;
};

module.exports = generateTokenSetHeader;
