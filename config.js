"use strict";

const PORT = +process.env.PORT || 5000;
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
const DATABASE_URL = process.env.DATABASE_URL || "natural_disasters";
const SECRET_KEY = process.env.SECRET_KEY || "ABC123";

module.exports = {
    PORT,
    BCRYPT_WORK_FACTOR,
    DATABASE_URL,
    SECRET_KEY
};