const express = require("express");
const jsonschema = require("jsonschema");
const router = express.Router();
const User = require("../models/user");

// Get all users.
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json({ users });
      } catch (err) {
        return next(err);
      }
}) 

// Get user by username.
router.get('/:username', async (req, res) => {
  try {
      const user = await User.getUser(req.params.username);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
}) 

module.exports = router; 