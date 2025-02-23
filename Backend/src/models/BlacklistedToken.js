const mongoose = require("mongoose");

// Define the Blacklist schema
const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 * 24 * 7, // TTL: Expire after 1 hour (3600 seconds)
  },
});

// Create a model from the schema
const BlacklistedToken = mongoose.model(
  "BlacklistedToken",
  blacklistedTokenSchema
);

module.exports = BlacklistedToken;
