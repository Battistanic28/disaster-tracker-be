"use-strict";

const express = require('express')

// Require routes
// const routeName = require("./routes/routeName");
// const routeName = require("./routes/routeName");
// const routeName = require("./routes/routeName");


const app = express();



// Generic error handler
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

module.exports = app;