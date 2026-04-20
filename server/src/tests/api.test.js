import request from "supertest";
import { describe, expect, jest } from "@jest/globals";

const mockUser = {
  _id: "user123"
};

const mockAPI = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn()
};

jest.unstable_mockModule("../models/api.model.js", () => ({
  default: mockAPI
}));

jest.unstable_mockModule("../middlewares/auth.middleware.js", () => ({
  isAuthenticated: (req, res, next) => {
    req.user = mockUser;
    next();
  }
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

    const res = await request(app).get("/api/v1/apis");

    expect(res.status).toBe(200);
  });
});

describe("GET /api/v1/apis/:id", () => {
  test("should return 404 when api not found", async () => {
    mockAPI.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(null)
    });

    const res = await request(app).get("/api/v1/apis/124");

    expect(res.status).toBe(404);
  });

  test("should return 200 when api found", async () => {
    mockAPI.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        author: { toString: () => "user123" },
        email: "test@123"
      })
    });

    const res = await request(app).get("/api/v1/apis/1234");

    expect(res.status).toBe(200);
  });
});

describe("POST /api/v1/apis", () => {
  test("should return 201 when api is created", async () => {
    mockAPI.create.mockResolvedValue({
      _id: "1",
      title: "Test API"
    });

    const res = await request(app)
      .post("/api/v1/apis")
      .send({
        title: "Test API",
        description: "desc",
        baseUrl: "url",
        category: "test"
      });

    expect(res.status).toBe(201);
  });
});

describe("PUT /api/v1/apis/:id", () => {
  test("should return 404 when api not found", async () => {
    mockAPI.findById.mockResolvedValue(null);

    const res = await request(app)
      .put("/api/v1/apis/123")
      .send({ title: "Updated" });

    expect(res.status).toBe(404);
  });

  test("should return 403 when not authorized", async () => {
    mockAPI.findById.mockResolvedValue({
      author: { toString: () => "otherUser" }
    });

    const res = await request(app)
      .put("/api/v1/apis/123")
      .send({ title: "Updated" });

    expect(res.status).toBe(403);
  });

  test("should return 200 when api updated", async () => {
    mockAPI.findById.mockResolvedValue({
      author: { toString: () => "user123" }
    });

    mockAPI.findByIdAndUpdate.mockResolvedValue({
      _id: "123",
      title: "Updated"
    });

    const res = await request(app)
      .put("/api/v1/apis/123")
      .send({ title: "Updated" });

    expect(res.status).toBe(200);
  });
});

describe("DELETE /api/v1/apis/:id", () => {
  test("should return 404 when api not found", async () => {
    mockAPI.findById.mockResolvedValue(null);

    const res = await request(app)
      .delete("/api/v1/apis/123");

    expect(res.status).toBe(404);
  });

  test("should return 403 when not authorized", async () => {
    mockAPI.findById.mockResolvedValue({
      author: { toString: () => "otherUser" }
    });

    const res = await request(app)
      .delete("/api/v1/apis/123");

    expect(res.status).toBe(403);
  });

  test("should return 200 when api deleted", async () => {
    const deleteMock = jest.fn();

    mockAPI.findById.mockResolvedValue({
      author: { toString: () => "user123" },
      deleteOne: deleteMock
    });

    const res = await request(app)
      .delete("/api/v1/apis/123");

    expect(res.status).toBe(200);
  });
});