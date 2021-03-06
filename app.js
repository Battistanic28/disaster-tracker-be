"use-strict";

const express = require('express')
const cors = require("cors");
const { ExpressError } = require("./expressError");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const repliesRoutes = require("./routes/replies");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/replies", repliesRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new ExpressError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});


module.exports = app;