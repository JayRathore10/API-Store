import { jest } from "@jest/globals";
import { errorMiddleware } from "../middlewares/error.middleware.js";

describe("Error Middleware", () => {

  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnValue(null), // fix chaining below
      json: jest.fn()
    };

    // fix chaining manually
    res.status.mockReturnValue(res);

    next = jest.fn();
  });

  test("should return default 500 error", async () => {
    const err = new Error("Something went wrong");

    await errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Something went wrong"
    });
  });

  test("should handle CastError", async () => {
    const err = {
      name: "CastError",
      message: "Invalid ID"
    };

    await errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("should handle duplicate key", async () => {
    const err = {
      code: 11000,
      message: "Duplicate key"
    };

    await errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should handle ValidationError", async () => {
    const err = {
      name: "ValidationError",
      errors: {
        field1: { message: "Field1 is required" },
        field2: { message: "Field2 is invalid" }
      }
    };

    await errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should handle fallback error", async () => {
    const err = null;

    await errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  });

});