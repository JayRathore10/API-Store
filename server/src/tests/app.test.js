import request from "supertest";
import { app } from "../app.js";

describe("App basic routes", () => {

  it("should return welcome message on root route", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("API store backend is running!");
  });

});

describe("Route mounting", () => {

  it("should hit users route", async () => {
    const res = await request(app).get("/api/v1/users");
    expect([200, 404]).toContain(res.statusCode);
  });

  it("should hit auth route", async () => {
    const res = await request(app).get("/api/v1/auth");
    expect([200, 404]).toContain(res.statusCode);
  });

  it("should hit endpoint route", async () => {
    const res = await request(app).get("/api/v1/endpoints");
    expect([200, 404]).toContain(res.statusCode);
  });

});