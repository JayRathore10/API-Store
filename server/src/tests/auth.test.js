import request from "supertest";
import User from "../models/user.model.js";
import { expect, jest } from "@jest/globals";


const mockUser = {
  findOne: jest.fn(),
  create: jest.fn(),
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

  test("should return 400 when user already exists" , async()=>{
    mockUser.findOne.mockResolvedValue({
      _id : "123"  , 
      name : "test" , 
      email : "test@gmail.com"
    });

    const res = await request(app).
      post("/api/v1/auth/register").
      send({
        name : "test" , 
        email : "test@gmail.com" , 
        password: "test123"
      });

      expect(res.status).toBe(400);

  })
})