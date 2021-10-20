const express = require("express");
const jsonschema = require("jsonschema");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");
const router = express.Router();
const User = require("../models/user");
const userRegistrationSchema = require("../schemas/userRegistrationSchema.json");
const userAuthSchema = require("../schemas/userAuthSchema.json");
const { BadRequestError } = require("../expressError");

// Register new user.
router.post('/register', async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userRegistrationSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs);
        }
        const newUser = await User.register({ ...req.body, isAdmin: false});
        return res.status(201).json({newUser});
      } catch (err) {
        return next(err);
      }
  });

router.post('/token', async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs);
        }
            const {username, password} = req.body;
            const user = await User.authenticate(username, password);
            const payload = {username: user.username, isAdmin: user.isAdmin}
            const token = jwt.sign(payload, SECRET_KEY);
            return res.json({token});
      } catch (err) {
        return next(err);
    }
  });


module.exports = router;