import request from "supertest";
import API from "../models/api.model.js";
import { describe, expect, jest } from "@jest/globals";
import { populate } from "dotenv";

const mockAPI = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn()
};

jest.unstable_mockModule("../models/api.model.js", () => ({
  default: mockAPI
}));

const { app } = await import("../app");

describe("GET /api/v1/apis", () => {
  test("should return 200 when it successfully send all the apis data", async () => {
    mockAPI.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue([
        {
          _id: "1",
          name: "Test API",
          author: {
            name: "John",
            email: "john@example.com"
          }
        }
      ])
    });

    const res = await request(app).
      get("/api/v1/apis");

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });
});

describe("GET /api/v1/apis/:id", () => {
  test("should return 404 when the api with the id is not present in database", async () => {
    mockAPI.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(null)
    });

    const res = await request(app).
      get("/api/v1/apis/124");

    expect(res.status).toBe(404);
  });

  test("should return 200 when the api with id successfully found in database", async () => {
    mockAPI.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        author : "test"  ,  
        email : "test@123"
      })
    });

    const res = await request(app).
      get("/api/v1/apis/1234");

    expect(res.status).toBe(200);
  });
})