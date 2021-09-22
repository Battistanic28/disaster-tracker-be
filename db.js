"use strict";

const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///natural_disasters_test";
} else {
  DB_URI = "postgresql:///natural_disasters";
}


let db = new Client({
  connectionString: DB_URI
})

db.connect();

module.exports = db;