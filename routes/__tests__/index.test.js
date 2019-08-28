const express = require("express");
const request = require("supertest");

const index = require("../index");
// const www =require('../../bin/www')
const app = express();

index(app);

describe("index route testing", () => {
  test("Get the homepage should return status 200", async () => {
    const res = await request(app).get("/");
    
    expect(res.status).toEqual(200);
    
    //expect(true).toBe(true)
  });
});
