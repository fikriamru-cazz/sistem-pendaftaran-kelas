import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// @route   /api/users

// All routes in this file are admin-only
router.use(protect, isAdmin);

router.route('/').get(getAllUsers);

export default router;