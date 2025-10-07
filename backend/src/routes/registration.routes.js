import { Router } from 'express';
import {
  registerForCourse,
  getMyRegistrations,
} from '../controllers/registration.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// @route   /api/registrations

// Apply protect middleware to all routes in this file
router.use(protect);

router.route('/my-registrations').get(getMyRegistrations);
router.route('/:courseId/register').post(registerForCourse);

export default router;