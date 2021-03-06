
const db = require("../db");

class Post {

    static async create({event_id, user_id, post}) {
      const result = await db.query(
          `INSERT INTO posts 
          (event_id, user_id, post) 
          VALUES ($1, $2, $3)
          RETURNING user_id, post`,
          [event_id, user_id, post]
      );
      const newPost = result.rows[0];
      return newPost;
    }

    static async findAll() {
        const result = await db.query(
              `SELECT id AS "postId",
                      event_id AS "eventId",
                      user_id AS "userId",
                      post,
                      created_at AS date
               FROM posts`
        );
    
        return result.rows;
      }

    static async get(id) {
      const result = await db.query(
            `SELECT id AS "postId",
                    event_id AS "eventId",
                    user_id AS "userId",
                    post,
                    created_at AS date
                    FROM posts
              WHERE event_id=$1
              ORDER BY created_at DESC`,
              [id]
      );
  
      return result.rows;
    }
}

module.exports = Post;