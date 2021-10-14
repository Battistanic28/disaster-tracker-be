
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
                      post
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
                    timestamp
              FROM posts
              WHERE event_id=$1`,
              [id]
      );
  
      return result.rows;
    }
}

module.exports = Post;