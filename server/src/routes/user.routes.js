import express from 'express';
import { 
    register, 
    login, 
    logout, 
    githubLogin, 
    githubCallback, 
    getProfile 
} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout); // Changed to GET as logout usually clears cookie, but POST is also fine

// GitHub OAuth routes
router.get('/github', githubLogin);
router.get('/github/callback', githubCallback);

// Profile route
router.get('/profile', isAuthenticated, getProfile);

export default router;
