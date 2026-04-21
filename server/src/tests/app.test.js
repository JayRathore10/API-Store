import request from "supertest";
import { app } from "../app.js";

describe("App basic routes", () => {

  it("should return welcome message on root route", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("API store backend is running!");
  });

});