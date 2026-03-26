import express from "express";
import {
  createAPI,
  getAllAPIs,
  getAPIById,
  updateAPI,
  deleteAPI,
} from "../controllers/api.controller.js";

import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllAPIs);
router.get("/:id", getAPIById);

// PROTECTED ROUTES
router.post("/", isAuthenticated , createAPI);
router.put("/:id", isAuthenticated , updateAPI);
router.delete("/:id", isAuthenticated , deleteAPI);

export default router;