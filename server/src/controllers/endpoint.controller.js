import Endpoint from "../models/endPoint.model.js";
import API from "../models/api.model.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const createEndpoint = async (req, res) => {
  try {
    const { apiId, method, path, description, requestBody, responseExample } =
      req.body;

    const api = await API.findById(apiId);
    if (!api) {
      return errorResponse(res, { status: 404, message: "API not found" });
    }

    if (api.author.toString() !== req.user._id.toString()) {
      return errorResponse(res, { status: 403, message: "Not authorized" });
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
    return errorResponse(res, { message: error.message });
  }
};

export const getEndpointsByApi = async (req, res) => {
  try {
    const endpoints = await Endpoint.find({ apiId: req.params.apiId });

    return successResponse(res, {
      message: "Endpoints fetched successfully",
      data: endpoints,
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

export const getEndpointById = async (req, res) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);

    if (!endpoint) {
      return errorResponse(res, {
        status: 404,
        message: "Endpoint not found",
      });
    }

    return successResponse(res, {
      message: "Endpoint fetched successfully",
      data: endpoint,
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

export const updateEndpoint = async (req, res) => {
  try {
    let endpoint = await Endpoint.findById(req.params.id);

    if (!endpoint) {
      return errorResponse(res, {
        status: 404,
        message: "Endpoint not found",
      });
    }

    const api = await API.findById(endpoint.apiId);

    if (api.author.toString() !== req.user._id.toString()) {
      return errorResponse(res, { status: 403, message: "Not authorized" });
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
    return errorResponse(res, { message: error.message });
  }
};

export const deleteEndpoint = async (req, res) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);

    if (!endpoint) {
      return errorResponse(res, {
        status: 404,
        message: "Endpoint not found",
      });
    }

    const api = await API.findById(endpoint.apiId);

    if (api.author.toString() !== req.user._id.toString()) {
      return errorResponse(res, { status: 403, message: "Not authorized" });
    }

    await endpoint.deleteOne();

    return successResponse(res, {
      message: "Endpoint deleted successfully",
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};