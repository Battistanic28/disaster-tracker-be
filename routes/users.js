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

router.post('/register', async (req, res, next) => {
  try {
      const newUser = await User.register({ ...req.body, isAdmin: false});
      return res.status(201).json({newUser});
    } catch (err) {
      return next(err);
    }
})
 

module.exports = router; 