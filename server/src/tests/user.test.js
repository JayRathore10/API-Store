import request from "supertest";
import { describe, expect, jest, beforeEach } from "@jest/globals";

const mockUser = { id: "user123" };

const mockUserModel = {
  findById: jest.fn()
};

jest.unstable_mockModule("../models/user.model.js", () => ({
  default: mockUserModel
}));

jest.unstable_mockModule("../middlewares/auth.middleware.js", () => ({
  isAuthenticated: (req, res, next) => {
    req.user = mockUser;
    next();
  }
}));

const { app } = await import("../app");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/v1/auth/profile", () => {
  test("should return user profile", async () => {
    const mockSelect = jest.fn().mockResolvedValue({
      _id: "user123",
      name: "Jay"
    });

    mockUserModel.findById.mockReturnValue({
      select: mockSelect
    });

    const res = await request(app).get("/api/v1/users/profile");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user._id).toBe("user123");
  });

  test("should return 404 if user not found", async () => {
    const mockSelect = jest.fn().mockResolvedValue(null);

    mockUserModel.findById.mockReturnValue({
      select: mockSelect
    });

    const res = await request(app).get("/api/v1/auth/profile");

    expect(res.status).toBe(404);
  });

  test("should handle error", async () => {
    const mockSelect = jest.fn().mockRejectedValue(new Error("DB error"));

    mockUserModel.findById.mockReturnValue({
      select: mockSelect
    });

    const res = await request(app).get("/api/v1/users/profile");

    expect(res.status).toBe(500);
  });
});