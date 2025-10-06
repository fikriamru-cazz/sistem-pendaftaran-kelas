import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });
    // Map to include remaining quota
    const coursesWithRemainingQuota = courses.map(course => {
      return { ...course, remainingQuota: course.quota - course._count.registrations }
    })
    res.json(coursesWithRemainingQuota);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });
    if (course) {
      const courseWithRemainingQuota = { ...course, remainingQuota: course.quota - course._count.registrations };
      res.json(courseWithRemainingQuota);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
export const createCourse = async (req, res) => {
  const { name, description, quota } = req.body;

  if (!name || !description || quota === undefined) {
    return res.status(400).json({ message: 'Name, description, and quota are required' });
  }

  try {
    const course = await prisma.course.create({
      data: {
        name,
        description,
        quota: Number(quota),
      },
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
export const updateCourse = async (req, res) => {
  const { name, description, quota } = req.body;

  try {
    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: {
        name,
        description,
        quota: quota === undefined ? undefined : Number(quota),
      },
    });
    res.json(course);
  } catch (error) {
    // Could be a P2025 error if record not found
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
export const deleteCourse = async (req, res) => {
  try {
    await prisma.course.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Course removed' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// @desc    Get registrations for a course
// @route   GET /api/courses/:id/registrations
// @access  Private/Admin
export const getCourseRegistrations = async (req, res) => {
  try {
    const registrations = await prisma.registration.findMany({
      where: { courseId: req.params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};