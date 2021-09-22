"use strict";

const PORT = +process.env.PORT || 5000;
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
const DATABASE_URL = "natural_disasters";

module.exports = {
    PORT,
    DATABASE_URL
};