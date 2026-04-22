export const errorMiddleware = (err, req, res, next) => {
  try {
    let error = err;

    error.message = err?.message || "Server Error";

    console.error(error);

    // CastError
    if (err?.name === "CastError") {
      error = new Error("Resource not found");
      error.statusCode = 404;
    }

    // Duplicate key
    if (err?.code === 11000) {
      error = new Error("Duplicate field value entered");
      error.statusCode = 400;
    }

    // ValidationError
    if (err?.name === "ValidationError") {
      const message = Object.values(err.errors || {})
        .map(val => val.message)
        .join(",");

      error = new Error(message);
      error.statusCode = 400;
    }

    res.status(
      error.statusCode || err.statusCode || err.status || 500
    ).json({
      success: false,
      error: error.message || "Server Error"
    });

  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};