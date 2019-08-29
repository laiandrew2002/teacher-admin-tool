const express = require("express");
const request = require("supertest");

const index = require("../index");

const app = express();

index(app);

describe("Home Page Route Test", () => {
  it("should return 200 status code with API Running", async (done) => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({status: "Teacher Administrative Tool API Running"});
    done();
  });
});
