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


describe("GET /posts", function () {
    test("works for posts", async function () {
      const resp = await request(app)
          .get("/posts")
      expect(resp.body).toEqual({
        posts: [
            {
                postId: expect.any(Number),
                eventId: "test_event_1",
                userId: "u3",
                post: "Test post about test_event_1.",
                date: expect.any(String),
            },
            {
                postId: expect.any(Number),
                eventId: "test_event_2",
                userId: "u2",
                post: "Test post about test_event_2.",
                date: expect.any(String),
            },
        ],
      });
    });

});

describe("POST /posts", function () {
    test("works for posts: create new post", async function () {
      const resp = await request(app)
          .post("/posts")
          .send({
            event_id: "event_1",
            user_id: "user_1",
            post: "This is a post about event 1",
          })
      expect(resp.statusCode).toEqual(201);
      expect(resp.body).toEqual({
        post: {
          user_id: "user_1",
          post: "This is a post about event 1"
        }
      });
    });

});