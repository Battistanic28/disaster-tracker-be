const express = require("express");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");
const router = express.Router();
const User = require("../models/user");


// Register new user.
router.post('/register', async (req, res, next) => {
    try {
        const newUser = await User.register({ ...req.body, isAdmin: false});
        return res.status(201).json({newUser});
      } catch (err) {
        return next(err);
      }
  });

router.post('/token', async (req, res, next) => {
    const {username, password} = req.body;
    const user = await User.authenticate(username, password);
    const payload = {username: user.username, isAdmin: user.isAdmin}
    const token = jwt.sign(payload, SECRET_KEY);

    return res.json({token});
})


module.exports = router;