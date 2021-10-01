
const db = require("../db");

class Post {

    // static async create(post_id, event_id, user_id, post) {
    //   const result = await db.query(
    //       `INSERT INTO posts 
    //       (post_id, event_id, user_id, post) 
    //       VALUES ($1, $2, $3, $4)
    //       RETURNING user_id, post`,
    //       [post_id, event_id, user_id, post]
    //   );
    //   const post = result.rows[0];
    //   return post;
    // }

    static async findAll() {
        const result = await db.query(
              `SELECT post_id AS "postId",
                      event_id AS "eventId",
                      user_id AS "userId",
                      post
               FROM posts`
        );
    
        return result.rows;
      }

    static async get(id) {
      const result = await db.query(
            `SELECT post_id AS "postId",
                    event_id AS "eventId",
                    user_id AS "userId",
                    post
              FROM posts
              WHERE event_id=$1`,
              [id]
      );
  
      return result.rows;
    }
}

module.exports = Post;