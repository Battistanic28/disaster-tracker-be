const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json({ users });
      } catch (err) {
        return next(err);
      }
})
 

module.exports = router; 