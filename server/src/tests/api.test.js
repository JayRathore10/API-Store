import request from "supertest";
import API from "../models/api.model.js";
import { describe, expect, jest } from "@jest/globals";

const mockAPI = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn()
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
  })
})