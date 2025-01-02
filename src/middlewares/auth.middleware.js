// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No auth token found'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find user with token
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
};