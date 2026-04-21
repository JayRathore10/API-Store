import request from "supertest";
import Endpoint from "../models/endPoint.model.js";
import { describe, expect, jest } from "@jest/globals";
import { isAuthenticated } from "../middlewares/auth.middleware";

const mockUser = {
  _id: "user123"
};

const mockEndpoint = {
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn()
};

jest.unstable_mockModule("../models/endPoint.model.js", () => ({
  default: mockEndpoint
}));

jest.unstable_mockModule("../middlewares/auth.middleware.js", () => ({
  isAuthenticated: (req, res, next) => {
    req.user = mockUser;
    next();
  }
}))

const { app } = await import("../app");

describe("GET /api/v1/endpoints/api/:apiId", () => {
  test("should return endpoints for given apiId", async () => {
    mockEndpoint.find.mockResolvedValue([
      { _id: "endpoint1", apiId: "123" }
    ]);

    const res = await request(app).get("/api/v1/endpoints/api/123");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0]._id).toBe("endpoint1");
  });
});