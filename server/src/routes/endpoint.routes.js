import express from "express";
import {
  createEndpoint,
  getEndpointsByApi,
  getEndpointById,
  updateEndpoint,
  deleteEndpoint,
} from "../controllers/endPoint.controller.js";

// import { isAuthenticated } from "../middleware/auth.middleware.js";
import {isAuthenticated} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/api/:apiId", getEndpointsByApi);
router.get("/:id", getEndpointById);

// PROTECTED 
router.post("/", isAuthenticated, createEndpoint);
router.put("/:id", isAuthenticated, updateEndpoint);
router.delete("/:id", isAuthenticated, deleteEndpoint);

export default router;