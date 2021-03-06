
  const db = require("../db.js");
  const User = require("./user.js");
  const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
  } = require("./_testCommon");
  
  beforeAll(commonBeforeAll);
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);
  afterAll(commonAfterAll);


// ******** AUTHENTICATE *********
  describe("authenticate", function () {

    test("works", async function () {
      const user = await User.authenticate("u1", "password1");
      expect(user.username).toEqual("u1");
    });

    test("unauth if no such user", async function () {
        try {
            await User.authenticate("badUser", "password");
          } catch (err) {
            expect(err.status).toBe(500)
          }
        });

// ******** REGISTER *********
    describe("register", function () {
        const newUser = {
            username: "new",
            firstName: "Test",
            lastName: "Tester",
            email: "test@test.com",
            isAdmin: false,
        };
        
        test("works", async function () {
            let user = await User.register({
            ...newUser,
            password: "password",
            });
            expect(user).toEqual(newUser);
            const found = await db.query("SELECT * FROM users WHERE username = 'new'");
            expect(found.rows.length).toEqual(1);
            expect(found.rows[0].is_admin).toEqual(false);
            expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
        });
    });


});