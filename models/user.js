
const db = require("../db");

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
      }


    static async register({ username, password, firstName, lastName, email, isAdmin }) {
        console.log(username)
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
          password,
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