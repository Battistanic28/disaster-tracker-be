const User = require("../models/user");
const Post = require("../models/post");
const Reply = require("../models/reply");
const db = require("../db.js");


async function commonBeforeAll() {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM posts");
    await db.query("DELETE FROM replies");

    await User.register({
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        password: "password1",
        isAdmin: true,
      });
    await User.register({
        username: "u2",
        firstName: "U2F",
        lastName: "U2L",
        email: "user2@user.com",
        password: "password2",
        isAdmin: false,
      });
    await User.register({
        username: "u3",
        firstName: "U3F",
        lastName: "U3L",
        email: "user3@user.com",
        password: "password3",
        isAdmin: false,
      });


      await Post.create({
        event_id: "test_event_1",
        user_id: "u3",
        post: "Test post about test_event_1."
      });

      await Post.create({
        event_id: "test_event_2",
        user_id: "u2",
        post: "Test post about test_event_2."
      });


      await Reply.create({
          post_id: "test_post1",
          user_id: "u1",
          comment: "Reply to post 1"
      });

      await Reply.create({
        post_id: "test_post2",
        user_id: "u2",
        comment: "Reply to post 2"
    })
};

    async function commonBeforeEach() {
    await db.query("BEGIN");
    }
    
    async function commonAfterEach() {
    await db.query("ROLLBACK");
    }
    
    async function commonAfterAll() {
    await db.end();
    }   


    module.exports = {
        commonBeforeAll,
        commonBeforeEach,
        commonAfterEach,
        commonAfterAll,
    };