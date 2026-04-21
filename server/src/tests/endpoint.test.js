import request from "supertest";
import { describe, expect, jest, beforeEach } from "@jest/globals";

const mockUser = { _id: "user123" };

const mockEndpoint = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  create: jest.fn()
};

const mockAPI = {
  findById: jest.fn()
};

const successResponse = (res, { status = 200, message, data }) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

jest.unstable_mockModule("../models/endPoint.model.js", () => ({
  default: mockEndpoint
}));

jest.unstable_mockModule("../models/api.model.js", () => ({
  default: mockAPI
}));

jest.unstable_mockModule("../utils/response.handler.js", () => ({
  successResponse
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

describe("GET /api/v1/endpoints/api/:apiId", () => {
  test("should return endpoints", async () => {
    mockEndpoint.find.mockResolvedValue([{ _id: "e1", apiId: "123" }]);

    const res = await request(app).get("/api/v1/endpoints/api/123");

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  test("should handle error", async () => {
    mockEndpoint.find.mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/api/v1/endpoints/api/123");

    expect(res.status).toBe(500);
  });
});

describe("GET /api/v1/endpoints/:id", () => {
  test("should return endpoint", async () => {
    mockEndpoint.findById.mockResolvedValue({ _id: "e1" });

    const res = await request(app).get("/api/v1/endpoints/e1");

    expect(res.status).toBe(200);
  });

  test("should return 404", async () => {
    mockEndpoint.findById.mockResolvedValue(null);

    const res = await request(app).get("/api/v1/endpoints/e1");

    expect(res.status).toBe(404);
  });
});

describe("POST /api/v1/endpoints", () => {
  test("should create endpoint", async () => {
    mockAPI.findById.mockResolvedValue({ author: "user123" });
    mockEndpoint.create.mockResolvedValue({ _id: "e1" });

    const res = await request(app)
      .post("/api/v1/endpoints")
      .send({ apiId: "123" });

    expect(res.status).toBe(201);
  });

  test("should return 404", async () => {
    mockAPI.findById.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/v1/endpoints")
      .send({ apiId: "123" });

    expect(res.status).toBe(404);
  });

  test("should return 403", async () => {
    mockAPI.findById.mockResolvedValue({ author: "otherUser" });

    const res = await request(app)
      .post("/api/v1/endpoints")
      .send({ apiId: "123" });

    expect(res.status).toBe(403);
  });
});

describe("PUT /api/v1/endpoints/:id", () => {
  test("should update endpoint", async () => {
    mockEndpoint.findById.mockResolvedValue({ _id: "e1", apiId: "123" });
    mockAPI.findById.mockResolvedValue({ author: "user123" });
    mockEndpoint.findByIdAndUpdate.mockResolvedValue({ _id: "e1" });

    const res = await request(app)
      .put("/api/v1/endpoints/e1")
      .send({ path: "/new" });

    expect(res.status).toBe(200);
  });

  test("should return 404", async () => {
    mockEndpoint.findById.mockResolvedValue(null);

    const res = await request(app).put("/api/v1/endpoints/e1");

    expect(res.status).toBe(404);
  });

  test("should return 403", async () => {
    mockEndpoint.findById.mockResolvedValue({ apiId: "123" });
    mockAPI.findById.mockResolvedValue({ author: "otherUser" });

    const res = await request(app).put("/api/v1/endpoints/e1");

    expect(res.status).toBe(403);
  });
});

describe("DELETE /api/v1/endpoints/:id", () => {
  test("should delete endpoint", async () => {
    const mockDelete = jest.fn();

    mockEndpoint.findById.mockResolvedValue({
      apiId: "123",
      deleteOne: mockDelete
    });

    mockAPI.findById.mockResolvedValue({ author: "user123" });

    const res = await request(app).delete("/api/v1/endpoints/e1");

    expect(res.status).toBe(200);
    expect(mockDelete).toHaveBeenCalled();
  });

  test("should return 404", async () => {
    mockEndpoint.findById.mockResolvedValue(null);

    const res = await request(app).delete("/api/v1/endpoints/e1");

    expect(res.status).toBe(404);
  });

  test("should return 403", async () => {
    mockEndpoint.findById.mockResolvedValue({ apiId: "123" });
    mockAPI.findById.mockResolvedValue({ author: "otherUser" });

    const res = await request(app).delete("/api/v1/endpoints/e1");

    expect(res.status).toBe(403);
  });
});