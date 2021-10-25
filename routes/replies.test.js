const request = require("supertest");
const app = require("../app.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("GET /replies", function () {
    test("works for replies", async function () {
      const resp = await request(app)
          .get("/replies")
      expect(resp.body).toEqual({
        posts: [
            {
                id: expect.any(Number),
                postId: "test_post1",
                userId: "u1",
                comment: "Reply to post 1",
                date: expect.any(String)
              },
              {
                id: expect.any(Number),
                postId: "test_post2",
                userId: "u2",
                comment: "Reply to post 2",
                date: expect.any(String)
              },
        ],
      });
    });

});

describe("POST /replies", function () {
    test("works for replies: create new reply", async function () {
      const resp = await request(app)
          .post("/replies")
          .send({
            post_id: "new_post",
            user_id: "u1",
            comment: "This is a new post"
        })
      expect(resp.statusCode).toEqual(201);
      expect(resp.body).toEqual({
        post: {
          user_id: "u1",
          comment: "This is a new post"
        }
      });
    });

});