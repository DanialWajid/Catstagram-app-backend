const express = require("express");
const {
  savePost,
  unsavePost,
  getSavedPosts,
} = require("../db/savedPosts.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/save", savePost);
router.post("/unsave", unsavePost);
router.get("/:userId", verifyToken, getSavedPosts);

module.exports = router;
