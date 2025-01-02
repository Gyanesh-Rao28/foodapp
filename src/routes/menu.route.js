// src/routes/menu.routes.js
import express from 'express';
import {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    seedMenu
} from '../controllers/menu.controller.js';
import { auth } from '../middlewares/auth.middleware.js';


const router = express.Router();

// Public route
router.get('/', getAllMenuItems);

// Protected routes
router.route('/').post(auth, createMenuItem)
router.route('/:id').put(auth, updateMenuItem)
router.route('/:id').delete(auth, deleteMenuItem)

export default router;