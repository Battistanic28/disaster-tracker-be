
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

}

module.exports = User;