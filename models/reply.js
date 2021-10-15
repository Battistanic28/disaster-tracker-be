
const db = require("../db");

class Reply {

    static async create({post_id, user_id, comment}) {
      const result = await db.query(
          `INSERT INTO replies 
          (post_id, user_id, comment) 
          VALUES ($1, $2, $3)
          RETURNING user_id, comment`,
          [post_id, user_id, comment]
      );
      const newPost = result.rows[0];
      return newPost;
    }

    static async findAll() {
        const result = await db.query(
              `SELECT id,
                      post_id AS "postId",
                      user_id AS "userId",
                      comment,
                      created_at AS date
               FROM replies`
        );
    
        return result.rows;
      }

    static async get(id) {
      const result = await db.query(
            `SELECT id,
                    post_id AS "postId",
                    user_id AS "userId",
                    comment,
                    created_at AS date
              FROM replies
              WHERE post_id=$1`,
              [id]
      );
  
      return result.rows;
    }
}

module.exports = Reply;