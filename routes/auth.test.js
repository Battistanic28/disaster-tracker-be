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


describe("POST /auth/register", function () {
    test("works for users: create non-admin", async function () {
      const resp = await request(app)
          .post("/auth/register")
          .send({
            username: "u-new",
            firstName: "First-new",
            lastName: "Last-newL",
            password: "password-new",
            email: "new@email.com"
          })
      expect(resp.statusCode).toEqual(201);
    });

    test("bad request with invalid data", async function () {
        const resp = await request(app)
            .post("/auth/register")
            .send({
              username: "u-new",
              firstName: "First-new",
              lastName: "Last-newL",
              password: "password-new",
              email: "newemail.com"
            })
        expect(resp.statusCode).toEqual(400);
      });
});


describe("POST /auth/token", function () {
    test("works", async function () {
      const resp = await request(app)
          .post("/auth/token")
          .send({
            username: "u1",
            password: "password1",
          });
      expect(resp.body).toEqual({
        "token": expect.any(String),
      });
    });

    test("unauth with non-existent user", async function () {
        const resp = await request(app)
            .post("/auth/token")
            .send({
              username: "no-such-user",
              password: "password1",
            });
        expect(resp.statusCode).toEqual(500);
      });


});