const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Get all event posts.
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        return res.json({ posts });
      } catch (err) {
        return next(err);
      }
})

// Get all event posts for specific event_id
 

module.exports = router; 