const express = require("express");
const router = express.Router();
const Reply = require("../models/reply");

// Get all replies.
router.get('/', async (req, res, next) => {
    try {
        const posts = await Reply.findAll();
        return res.json({ posts });
      } catch (err) {
        return next(err);
      }
})

// Get all replies for a specific post
router.get("/:id", async function (req, res, next) {
  try {
    const posts = await Reply.get(req.params.id);
    return res.json({ posts });
  } catch (err) {
    return next(err);
  }
});

// Post new reply
router.post('/', async function(req, res, next) {
  try {
    const post = await Reply.create(req.body)
    return res.status(201).json({ post });
  } catch (err) {
    return next(err);
  }
})

 

module.exports = router; 