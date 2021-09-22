
const db = require("../db");

class Post {

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

}

module.exports = Post;