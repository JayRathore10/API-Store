import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPI } from '../configs/env.config.js';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPI || '7d',
    });
};

export default generateToken;
