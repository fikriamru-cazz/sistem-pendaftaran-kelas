import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc    Register for a course
// @route   POST /api/registrations/:courseId/register
// @access  Private
export const registerForCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Find the course and count its current registrations
      const course = await tx.course.findUnique({
        where: { id: courseId },
        include: { _count: { select: { registrations: true } } },
      });

      if (!course) {
        throw new Error('Course not found');
      }

      // 2. Check if quota is full
      if (course._count.registrations >= course.quota) {
        throw new Error('Course is full');
      }

      // 3. Check if user is already registered
      const existingRegistration = await tx.registration.findUnique({
        where: { userId_courseId: { userId, courseId } },
      });

      if (existingRegistration) {
        throw new Error('User already registered for this course');
      }

      // 4. Create the registration
      const registration = await tx.registration.create({
        data: {
          userId,
          courseId,
        },
      });

      return registration;
    });

    res.status(201).json({ message: 'Successfully registered for the course', registration: result });

  } catch (error) {
    // Handle specific errors from the transaction
    if (error.message === 'Course not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Course is full' || error.message === 'User already registered for this course') {
      return res.status(400).json({ message: error.message });
    }
    // Handle potential unique constraint violation if transaction fails
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'User already registered for this course' });
    }
    res.status(500).json({ message: 'Something went wrong during registration', error: error.message });
  }
};


// @desc    Get my registered courses
// @route   GET /api/registrations/my-registrations
// @access  Private
export const getMyRegistrations = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const registrations = await prisma.registration.findMany({
      where: { userId },
      include: {
        course: true // Include the full course details
      },
    });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};