import { errorMiddleware } from "../middlewares/errorMiddleware";

describe("Error Middleware", () => {

  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnValue(res),
      json: jest.fn()
    };
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

  test("should handle CastError (invalid ObjectId)", async () => {
    const err = {
      name: "CastError",
      message: "Invalid ID"
    };

    await errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Resource not found"
    });
  });

  test("should handle duplicate key error (code 11000)", async () => {
    const err = {
      code: 11000,
      message: "Duplicate key"
    };

    await errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Duplicate field value entered"
    });
  });

  test("should handle ValidationError", async () => {
    const err = {
      name: "ValidationError",
      error: {
        field1: { message: "Field1 is required" },
        field2: { message: "Field2 is invalid" }
      }
    };

    await errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Field1 is required,Field2 is invalid"
    });
  });

  test("should handle unexpected failure inside middleware", async () => {
    const err = null; // this will break spreading {...err}

    await errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Server Error"
    });
  });

});