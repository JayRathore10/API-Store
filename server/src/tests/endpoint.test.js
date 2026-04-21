import request from "supertest";
import Endpoint from "../models/endPoint.model";
import { describe, expect, jest } from "@jest/globals";
import { isAuthenticated } from "../middlewares/auth.middleware";

const mockUser = {
  _id : "user123"
};

const mockEndpoint = {
  findOne : jest.fn()  , 
  create : jest.fn()
};

jest.unstable_mockModule("../models/endpoint.model.js" , ()=>({
  default : mockEndpoint
}));

jest.unstable_mockModule("../middlewares/auth.middleware.js", ()=>({
  isAuthenticated : (req , res , next)=>{
    req.user = mockUser ; 
    next();
  }
}))

const {app} = await import("../app");

