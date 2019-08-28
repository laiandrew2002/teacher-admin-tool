

const express = require("express");
const request = require("supertest");
const app = express();
const server = require("../api");

server(app)

describe("Common Student Routing Test", () => {
  beforeAll(() => {
    /* Runs before all tests */
  })
  afterAll(() => {
    /* Runs after all tests */
  })
  beforeEach(() => {
    /* Runs before each test */
  })
  afterEach(() => {
    /* Runs after each test */
  })

  test("common students test", async () => {
    const res = await request(app)
      .get("/api/commonstudents?teacher=teachermel%40gmail.com");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('students', [
      "studentalek@example.com",
      "studentpam@example.com",
      "studenthaha@gmail.com",
      "studenteshan@example.com"
  ])
   
  });

  test("error", async () => {
    expect.assertions(3);
    const res = await request(app).get("/api/commonstudents")
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('success', false)
    expect(res.body).toHaveProperty('message', "Teacher Email Not Found")
    
  })

  test("error", async () => {
    expect.assertions(3);
    const res = await request(app).get("/api/commonstudents?teacher=teachermegmail.com")
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('success', false)
    expect(res.body).toHaveProperty('message', "Teacher Email Incorrect Format")
    
  })
});

describe("Register Routing Test", () => {
  beforeAll(() => {
    /* Runs before all tests */
  })
  afterAll(() => {
    /* Runs after all tests */
  })
  beforeEach(() => {
    /* Runs before each test */
  })
  afterEach(() => {
    /* Runs after each test */
  })

  
  // test("Register students test", async (done) => {
  //   let payload = {
  //     "teacher": "teacherhaha@gmail.com",
  //     "students": [
  //         "studenteshan@gmail.com",
  //         "studentmel@gmail.com",
  //         "studentpam@gmail.com"
  //       ]
  //   }
  //   const res = await request(app).post("/api/register").send(payload)
  //   expect(res.status).toBe(204);
  //   done()
  // });

  // test("error1", async () => {
  //   let payload = {
  //     "teacher": "",
  //     "students": [
  //         "studenteshan@gmail.com",
  //         "studentmel@gmail.com",
  //         "studentpam@gmail.com"
  //       ]
  //   }
  //   expect.assertions(3);
  //   const res = await request(app).post("/api/register").send(payload)
  //   expect(res.status).toBe(404)
  //   expect(res.body).toHaveProperty('success', false)
  //   expect(res.body).toHaveProperty('message', "Teacher Email Not Found")
    
  // })

  test("error2", async () => {
    let payload = {
      "teacher": "123abc",
      "students": [
          "studenteshan@gmail.com",
          "studentmel@gmail.com",
          "studentpam@gmail.com"
        ]
    }
    expect.assertions(0);
    const res = await request(app).post("/api/register").send({
      teacher: "123abc",
      students: [
          "studenteshan@gmail.com",
          "studentmel@gmail.com",
          "studentpam@gmail.com"
        ]
    })
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('success', false)
    expect(res.body).toHaveProperty('message', "Teacher Email Incorrect Format")
    
  })
});
