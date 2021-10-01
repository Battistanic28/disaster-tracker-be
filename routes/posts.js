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
router.get("/:id", async function (req, res, next) {
  try {
    const posts = await Post.get(req.params.id);
    return res.json({ posts });
  } catch (err) {
    return next(err);
  }
});

// Post new user post.
router.post('/', async function(req, res, next) {
  try {
    const post = await Post.create(req.body)
    return res.status(201).json({ post });
  } catch (err) {
    return next(err);
  }
})

 

module.exports = router; 