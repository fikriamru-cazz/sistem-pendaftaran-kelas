import { Router } from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseRegistrations, // Import the new function
} from '../controllers/course.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// @route   /api/courses

// Protected routes for all authenticated users
router.route('/').get(protect, getAllCourses);
router.route('/:id').get(protect, getCourseById);

// Admin-only routes
router.route('/').post(protect, isAdmin, createCourse);
router.route('/:id').put(protect, isAdmin, updateCourse);
router.route('/:id').delete(protect, isAdmin, deleteCourse);

// Admin-only route to get registrations for a specific course
router.route('/:id/registrations').get(protect, isAdmin, getCourseRegistrations);

export default router;