import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import apiRouter from "./routes/api.routes.js";
import endpointRouter from "./routes/endPoint.routes.js";
import { errorMiddleware } from './middlewares/error.middleware.js';

export const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRoutes);
app.use("/api/v1/auth" , authRouter);
app.use("/api/v1/apis", apiRouter);
app.use("/api/v1/endpoints", endpointRouter);

// Root route
app.get("/" , (req  , res)=>{
    res.send("API store backend is running!");
});

// Error Middleware 
// global error handling 
app.use(errorMiddleware);
