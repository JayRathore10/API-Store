import request from "supertest";
import User from "../models/user.model.js";
import { describe, expect, jest } from "@jest/globals";

const mockUser = {
  findOne: jest.fn(),
  create: jest.fn(),
};

jest.unstable_mockModule("../models/user.model.js", () => ({
  default: mockUser,
}));

jest.unstable_mockModule("axios", () => ({
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

jest.unstable_mockModule("../configs/env.config.js", () => ({
  MONGODB_URI: "mock",
  NODE_ENV: "test",
  JWT_SECRET: "mock",
  JWT_EXPI: "1d",
  PORT: 5000,

  GITHUB_CLIENT_ID: "test-client-id",
  GITHUB_CLIENT_SECRET: "test-secret",
  GITHUB_REDIRECT_URI: "http://localhost:3000/auth/github/callback",
  CLIENT_URL: "http://localhost:3000",
}));

jest.unstable_mockModule("../utils/generateToken.js", () => ({
  default: jest.fn(() => "fake-token"),
}));

const bcrypt = (await import("bcrypt")).default;
const { app } = await import("../app.js");
const axios = await import("axios").default;

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

    bcrypt.genSalt.mockResolvedValue("*");
    bcrypt.hash.mockResolvedValue("123**");

    mockUser.create.mockResolvedValue({
      name: "test",
      email: "test@gmail.com",
      password: "123**",
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

describe("POST /api/v1/auth/login", () => {
  test("return 400 when there is any field is missing", async () => {
    mockUser.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        password: "test"
      });

    expect(res.status).toBe(400);
  });

  test("should return 401 when there is an error in finding user in database", async () => {
    mockUser.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@gmail.com",
        password: "test"
      });

    expect(res.status).toBe(401);
  });

  test("should return 401 when the password in database is not matched to request password", async () => {
    mockUser.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: "1",
        email: "test@gmail.com",
        name: "test",
        password: "hashed-password",
      }),
    });

    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@gmail.com",
        password: "test"
      });

    expect(res.status).toBe(401);
  });

  test("should return 200 when user login successfully", async () => {
    mockUser.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: "1",
        email: "test@gmail.com",
        name: "test",
        password: "hashed-password",
      }),
    });

    bcrypt.compare.mockResolvedValue(true);

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@gmail.com",
        password: "test"
      });

    expect(res.status).toBe(200);

    const cookies = res.headers["set-cookie"];

    expect(cookies).toBeDefined();
    expect(cookies[0]).toMatch(/token=/);
    expect(cookies[0]).toMatch(/HttpOnly/);
  });
});

describe("GET /api/v1/auth/logout", () => {
  test("should logout user and clear token cookie", async () => {
    const res = await request(app).get("/api/v1/auth/logout");

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      success: true,
      message: "Logged out successfully",
    });

    const cookies = res.headers["set-cookie"];

    expect(cookies).toBeDefined();
    expect(cookies[0]).toMatch("token=j%3Anull; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax");
    expect(cookies[0]).toMatch(/Expires=/);
  });
});

describe("GET /api/v1/auth/github", () => {
  test("should redirect to github oauth url", async () => {
    const res = await request(app).get("/api/v1/auth/github");

    expect(res.status).toBe(302);

    expect(res.headers.location).toMatch(
      /https:\/\/github\.com\/login\/oauth\/authorize/
    );

    expect(res.headers.location).toContain("client_id=");
    expect(res.headers.location).toContain("redirect_uri=");
    expect(res.headers.location).toContain("scope=user:email");
  });
});

describe("GET /api/v1/auth/github/callback", () => {
  test("should redirect to login if code is missing", async () => {
    const res = await request(app).get("/api/v1/auth/github/callback");

    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("/login?error=no_code");
  });

});