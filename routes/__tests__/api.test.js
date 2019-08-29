
const express = require("express");
const bodyParser = require('body-parser');
const request = require("supertest");
const app = express();
const server = require("../api");
require('dotenv').config();
server(app.use(bodyParser.json()))


describe("GET /api/commonstudents - Routing Test", () => {
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

  it("should return the students registered under teachermel@gmail.com", async (done) => {
    const res = await request(app).get("/api/commonstudents?teacher=teachermel%40gmail.com");
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body).toEqual({
      'students': 
    [
      "studentalek@example.com",
      "studentpam@example.com",
      "studenthaha@gmail.com",
      "studenteshan@example.com"
    ]});
    done();
  });

  it("should return the students registered under teachermel@gmail.com and also teachermolo@gmail.com", async (done) => {
    const res = await request(app).get("/api/commonstudents?teacher=teachermolo%40gmail.com&teacher=teachermel%40gmail.com");
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body).toEqual({
      'students': [
        "studenteshan@example.com"
      ]});
    done();
  });

  it("should return 404 error code as there is not teacher in params", async (done) => {
    expect.assertions(3);
    const res = await request(app).get("/api/commonstudents");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Teacher Email Not Found");
    done();
  })

  it("should return 404 error code with incorrect teacher email format", async (done) => {
    expect.assertions(3);
    const res = await request(app).get("/api/commonstudents?teacher=teachermegmail.com");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Teacher Email Incorrect Format");
    done();
  })
});

describe("POST /api/register Routing Test", () => {

  it("should return status code 204 with teacher and students successfully registered", async (done) => {
    let payload = {
      "teacher": "teacherhaha@gmail.com",
      "students": [
          "studenteshan@gmail.com",
          "studentmel@gmail.com",
          "studentpam@gmail.com"
        ]
    };
    const res = await request(app).post("/api/register").send(payload);
    expect(res.status).toBe(204);
    done();
  });

  it("should return 404 error code with no teacher email", async (done) => {
    let payload = {
      "teacher": "",
      "students": [
          "studenteshan@gmail.com",
          "studentmel@gmail.com",
          "studentpam@gmail.com"
        ]
    };
    expect.assertions(3);
    const res = await request(app).post("/api/register").send(payload);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Teacher Email Not Found");
    done();
  });

  it("should return 404 error code with incorrect format for teacher email", async (done) => {
    let payload = {
      "teacher": "123abc",
      "students": [
          "studenteshan@gmail.com",
          "studentmel@gmail.com",
          "studentpam@gmail.com"
        ]
    };
    expect.assertions(3);
    const res = await request(app).post("/api/register").send(payload);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Teacher Email Incorrect Format");
    done();
  })

  it("should return 404 error code with incorrect format for student email", async (done) => {
    let payload = {
      "teacher": "teachemel@gmail.com",
      "students": [
          "studenteshan1234",
        ]
    };
    expect.assertions(3);
    const res = await request(app).post("/api/register").send(payload);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Student Email Incorrect Format");
    done();
  })
});

describe("POST /api/suspend Routing Test", () => {
  it("should return status code 204 with the student successfully suspended", async (done) => {
    let payload = {
      "student": "studenthon@example.com"
    }
    const res = await request(app).post("/api/suspend").send(payload);
    expect(res.status).toBe(204);
    done();
  });

  it("should return 404 error code as the student email is not registered", async (done) => {
    let payload = {
      "student": "abc@example.com"
    }
    expect.assertions(3);
    const res = await request(app).post("/api/suspend").send(payload);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Student Email Not Registered");
    done();
  });

  it("should return 404 error code as there is no student submitted", async (done) => {
    let payload = {};
    expect.assertions(3);
    const res = await request(app).post("/api/suspend").send(payload);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Student Not Found");
    done();
  });

  it("should return 404 error code with incorrect format for student email", async (done) => {
    let payload = {
      "student": "lol12example.com"
    }
    expect.assertions(3);
    const res = await request(app).post("/api/suspend").send(payload);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Student Email Incorrect Format");
    done();
  });
});

describe("POST /api/retrievefornotifications Routing Test", () => {

  it("should return 200 status code with students(not suspended) registered under the teacher and mentioned in the notifications", async (done) => {
    let payload = {
      "teacher": "teachermel@gmail.com",
      "notification": "hello Students! @studentasdasd@gmail.com and @studentdaniel@gmail.com"
    };
    const res = await request(app).post("/api/retrievefornotifications").send(payload);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body).toEqual({
      'students': [
        "studentalek@example.com",
        "studentpam@example.com",
        "studenthaha@gmail.com",
        "studentasdasd@gmail.com",
        "studentdaniel@gmail.com"
      ]});
    done();
  });

  it("should return 404 error code", async (done) => {
    let payload = {
      "teacher": "teacheryouyou@gmail.com",
      "notification": "hello Students! @studentasdasd@gmail.com and @studentdaniel@gmail.com"
    }
    expect.assertions(3);
    const res = await request(app).post("/api/retrievefornotifications").send(payload);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Teacher Email Not Registered");
    done();
  })

  it("should return 404 error code with no teacher submitted", async (done) => {
    let payload = {
      "notification": "hello Students! @studentasdasd@gmail.com and @studentdaniel@gmail.com"
    }
    expect.assertions(3);
    const res = await request(app).post("/api/retrievefornotifications").send(payload);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Teacher Email Not Found");
    done();
  })

  it("should return 404 error code with incorrect format for teacher email", async (done) => {
    let payload = {
      "teacher": "teachermelgmailcom",
      "notification": "hello Students! @studentasdasd@gmail.com and @studentdaniel@gmail.com"
    }
    expect.assertions(3);
    const res = await request(app).post("/api/retrievefornotifications").send(payload);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Teacher Email Incorrect Format");
    done();
  })

  it("should return 404 error code with no notification submitted", async (done) => {
    let payload = {
      "teacher": "teachermel@gmail.com"
    }
    expect.assertions(3);
    const res = await request(app).post("/api/retrievefornotifications").send(payload);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', "Notification Not Found");
    done();
  });

});