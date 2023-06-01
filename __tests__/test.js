const request = require("supertest");
var cheerio = require("cheerio");

const db = require("../models/index");
const app = require("../app");

let server, agent;
function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

const login = async (agent, username, password) => {
  let res = await agent.get("/login");
  let csrfToken = extractCsrfToken(res);
  res = await agent.post("/session").send({
    email: username,
    password: password,
    _csrf: csrfToken,
  });
};

describe("Sports Scheduler", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = request.agent(server);
  });
  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Sign up", async () => {
    let res = await agent.get("/signup");
    const csrfToken = extractCsrfToken(res);
    res = await agent.post("/players").send({
      name: "Pavan",
      email: "test2@gmail.com",
      password: "12345678",
      _csrf: csrfToken,
      submit: "admin",
    });
    expect(res.statusCode).toBe(302);
  });

  test("Sign out", async () => {
    let res = await agent.get("/sports");
    expect(res.statusCode).toBe(200);
    res = await agent.get("/signout");
    expect(res.statusCode).toBe(302);
    res = await agent.get("/sports");
    expect(res.statusCode).toBe(302);
  });

  test("Creating a sport", async () => {
    const agent = request.agent(server);
    await login(agent, "test2@gmail.com", "12345678");
    const res = await agent.get("/createSport");
    const csrfToken = extractCsrfToken(res);
    const response = await agent.post("/creatingSport").send({
      name: "Cricket",
      _csrf: csrfToken,
    });
    expect(response.statusCode).toBe(302);
  });

  //   test("Editing a sportName",async()=>{
  //     const agent = request.agent(server)
  //     await login(agent,"test2@gmail.com","12345678")
  //     const res = await agent.get("/createSport")
  //     const csrfToken = extractCsrfToken(res)
  //     const response = await agent.post("/creatingSport").send({
  //         name:"Cricket",
  //         _csrf:csrfToken
  //     })
  //     const sportId = response.
  //   })
});
