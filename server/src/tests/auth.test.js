import request from "supertest";
import User from "../models/user.model.js";
import { expect, jest } from "@jest/globals";

const mockUser = {
  findOne: jest.fn(),
  create: jest.fn(),
};

const mockBcrypt = {
  genSalt: jest.fn(),
  hash: jest.fn()
};

jest.unstable_mockModule("../models/user.model.js", () => ({
  default: mockUser,
}));

const { app } = await import("../app.js");

describe("POST /api/v1/auth/register", () => {
  test("should return 400 when any field is missing", async () => {
    mockUser.findOne.mockResolvedValue(null);

    const res = await request(app).
      post("/api/v1/auth/register").
      send({
        name: "test",
        email: "test@gmail.com",
      });

    expect(res.status).toBe(400);
  });

  test("should return 400 when user already exists", async () => {
    mockUser.findOne.mockResolvedValue({
      _id: "123",
      name: "test",
      email: "test@gmail.com"
    });

    const res = await request(app).
      post("/api/v1/auth/register").
      send({
        name: "test",
        email: "test@gmail.com",
        password: "test123"
      });

    expect(res.status).toBe(400);
  });

  test("should return 201 when user is created successfully", async () => {
    mockUser.findOne.mockResolvedValue(null);

    mockBcrypt.genSalt.mockResolvedValue("*");
    mockBcrypt.hash.mockResolvedValue("123**");

    mockUser.create.mockResolvedValue({
      name: "test",
      email: "test@gmail.com",
      password: "123**" , 
      generateToken: jest.fn().mockReturnValue("fake-token"),
    });

    const res = await request(app).
      post("/api/v1/auth/register").
      send({
        name: "test",
        email: "test@gmail.com",
        password: "test"
      });

    expect(res.status).toBe(201);
  })
})

describe("POST /api/v1/auth/login" , ()=>{
  test("return 400 when there is any field is missing" , async()=>{
    mockUser.findOne.mockResolvedValue(null);

    const res = await request(app).
      post("/api/v1/auth/login").
      send({
        password : "test"
      });

    expect(res.status).toBe(400);
  });


  test("should return 401 when there is an error in finding user in database" , async()=>{
    mockUser.findOne.mockResolvedValue(null);

    const res = await request(app).
      post("/api/v1/auth/login").
      send({
        email : "test" ,
        email : "test@gmail.com"
      })

    expect(res.status).toBe(400);
  })

})