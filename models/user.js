
const db = require("../db");
const bcrypt = require("bcrypt");
const {BCRYPT_WORK_FACTOR} = require("../config.js")

class User {


    static async findAll() {
        const result = await db.query(
              `SELECT username,
                      first_name AS "firstName",
                      last_name AS "lastName",
                      email,
                      is_admin AS "isAdmin"
               FROM users
               ORDER BY username`,
        );
    
        return result.rows;
      };

      static async getUser(username) {
        const result = await db.query(
              `SELECT username,
                      first_name AS "firstName",
                      last_name AS "lastName",
                      email,
                      is_admin AS "isAdmin"
               FROM users
               WHERE username = $1`,
               [username],
        );
    
      const user = result.rows[0];
      if (user) {
        return user;
      }
      console.log("User not found");
    }

/** Authenticate existing user with username, password
 * 
 * !Needs error handling!
 */
    static async authenticate(username, password) {
      const result = await db.query(
        `SELECT username,
                password,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                is_admin AS "isAdmin"
        FROM users
        WHERE username = $1`,
        [username],
      );

      const user = result.rows[0];
      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          return user;
        }
      }
      console.log("Invalid username/password");
    }

/** Register new user with data
 * 
 * !Need to add error handling!
 */
    static async register({ username, password, firstName, lastName, email, isAdmin }) {
      const duplicateCheck = await db.query(
        `SELECT username
        FROM users
        WHERE username = $1`,
        [username],
      );

      if (duplicateCheck.rows[0]) {
        console.log(`Username '${username}' is already taken.`)
      }
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

      const result = await db.query(
        `INSERT INTO users
        (username,
          password,
          first_name,
          last_name,
          email,
          is_admin)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        isAdmin,
      ],
    );

      const user = result.rows[0];
      return user;
    }

}

module.exports = User;