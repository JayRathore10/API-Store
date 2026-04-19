import Endpoint from "../models/endPoint.model.js";
import API from "../models/api.model.js";
import { successResponse } from "../utils/response.handler.js";

export const createEndpoint = async (req, res, next) => {
  try {
    const { apiId, method, path, description, requestBody, responseExample } =
      req.body;

    const api = await API.findById(apiId);
    if (!api) {
      const err = new Error("API not found");
      err.status = 404;
      return next(err);
    }

    if (api.author.toString() !== req.user._id.toString()) {
      const err = new Error("Not authorized");
      err.status = 403;
      return next(err);
    }

    const endpoint = await Endpoint.create({
      apiId,
      method,
      path,
      description,
      requestBody,
      responseExample,
    });

    return successResponse(res, {
      status: 201,
      message: "Endpoint created successfully",
      data: endpoint,
    });
  } catch (error) {
    next(error);
  }
};

export const getEndpointsByApi = async (req, res, next) => {
  try {
    const endpoints = await Endpoint.find({ apiId: req.params.apiId });

    return successResponse(res, {
      message: "Endpoints fetched successfully",
      data: endpoints,
    });
  } catch (error) {
    next(error);
  }
};

export const getEndpointById = async (req, res, next) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);

    if (!endpoint) {
      const err = new Error("Endpoint not found");
      err.status = 404;
      return next(err);
    }

    return successResponse(res, {
      message: "Endpoint fetched successfully",
      data: endpoint,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEndpoint = async (req, res, next) => {
  try {
    let endpoint = await Endpoint.findById(req.params.id);

    if (!endpoint) {
      const err = new Error("Endpoint not found");
      err.status = 404;
      return next(err);
    }

    const api = await API.findById(endpoint.apiId);

    if (api.author.toString() !== req.user._id.toString()) {
      const err = new Error("Not authorized");
      err.status = 403;
      return next(err);
    }

    endpoint = await Endpoint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return successResponse(res, {
      message: "Endpoint updated successfully",
      data: endpoint,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEndpoint = async (req, res, next) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);

    if (!endpoint) {
      const err = new Error("Endpoint not found");
      err.status = 404;
      return next(err);
    }

    const api = await API.findById(endpoint.apiId);

    if (api.author.toString() !== req.user._id.toString()) {
      const err = new Error("Not authorized");
      err.status = 403;
      return next(err);
    }

    await endpoint.deleteOne();

    return successResponse(res, {
      message: "Endpoint deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};